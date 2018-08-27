import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from '../app.config';
import { HelpersService } from '../helpers.service';
import { NgxSpinnerService } from 'ngx-spinner';

/*We need a global variable 'google' so that after the loader.js script executed in the index.html,
this value gets initilized */
declare let google:any;

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.css']
})
export class ContinentsComponent implements OnInit {
  public countryId;

  constructor(private helpersService:HelpersService, private router:Router, private spinnerService:NgxSpinnerService) {
    // Loading google geochart
    google.charts.load('current', {
      'packages': ['geochart'],
      'mapsApiKey': config.map.apiKey
    });
  }

  ngOnInit() {
    this.spinnerService.show();
    //executing a callback function once the chart has been loaded
    google.charts.setOnLoadCallback(()=>this.drawRegionsMap());
  }
  
  drawRegionsMap(){
    let self = this;
    let regionsData = [['country','Name','S.No']];

    let regions = config.map.regions.map(function(item){
      let tmpArr = [];
      for(let key in item){
        tmpArr.push(item[key]);
      }
      return tmpArr;
    });

    for(let i=0;i<regions.length;i++){
      regionsData.push(regions[i]);
    } //regionsData is a format of data that google expects from us as input

    const data = new google.visualization.arrayToDataTable(regionsData);
    const geoChart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    //handler function for click event in chart region
    function clickHandler() {
      let clickedItem = geoChart.getSelection()[0];
      if (clickedItem) {
        let selectedRegionCode = data.getValue(clickedItem.row, 0);
        let selectedRegionObj:{[k:string]:any} = self.helpersService.getRegionNameById(selectedRegionCode);
        self.router.navigate(['/countries'],{queryParams: {'continent':selectedRegionObj.name}});
      }
    }

    google.visualization.events.addListener(geoChart, 'select', clickHandler);
    this.spinnerService.hide();
    geoChart.draw(data, config.map.options);

  }
  
}
