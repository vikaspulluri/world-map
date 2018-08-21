import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppHttpService } from '../app-http.service';
import { HelpersService } from '../helpers.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit, AfterViewInit {

  constructor(private route:ActivatedRoute, private httpService:AppHttpService, private helpersService:HelpersService) { }
  continent:string = '';
  countries;

  ngOnInit() {
    this.route.queryParamMap.subscribe(
      (queryParams) => {
        this.continent = queryParams.get('continent');
        this.getCountriesInARegion();
      },
      (error) => console.log(error)
    )
  }

  ngAfterViewInit(){
    
  }


  getCountriesInARegion(){
    this.httpService
        .getCountriesByRegion(this.continent)
        .subscribe(
          (rawData)=>{
            this.countries = this.filterRawData(rawData);
            console.log(this.countries);
          },
          (error) => console.log(error)
        )
  }

  filterRawData(rawData:{[k:string]:any}[]){
    let filteredData = rawData.map(function(item){
      let tmpObj:{[k:string]:any} = {};
      tmpObj.name = item.name;
      tmpObj.flag = item.flag;
      tmpObj.capital = item.capital;
      tmpObj.population = item.population;
      tmpObj.languages = item.languages;
      tmpObj.currencies = item.currencies;
      return tmpObj;
    })
    return filteredData;
  }



}
