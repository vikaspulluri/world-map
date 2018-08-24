import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppHttpService } from '../app-http.service';
import { HelpersService } from '../helpers.service';
import { Response } from '@angular/http';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private route:ActivatedRoute, private httpService:AppHttpService, private helpersService:HelpersService,private filtersService:FiltersService) { 
    this.filtersService.filtersChanged$.subscribe(
      (changed) => {
        this.activeRegions = this.filtersService.getActiveRegionFilters();
        
        this.getCountriesInARegion();
      }
    );
    this.filtersService.orderByChanged$.subscribe(
      (changed) => {
        let sortBy = this.filtersService.getSortByFilter();
        let orderBy = this.filtersService.getOrderByFilter();
        this.countries = this.helpersService.groupData(this.countries,sortBy,orderBy);
        console.log(this.countries);
      }
    )
  }
  continent:string = '';
  activeRegions;
  countries = [];

  ngOnInit() { }



  getCountriesInARegion(){
    this.httpService
        .getCountriesByRegions(this.activeRegions)
        .subscribe(
          (rawData)=>{
            this.countries = this.helpersService.groupRawDataIntoSingleArr(rawData);
            // this.countries = this.filterRawData(rawData);
            // console.log(this.countries);
          },
          (error:Response) => {
            let err = error.json();
            this.helpersService.showErrorMsg(err.message);
          }
        )
  }

}
