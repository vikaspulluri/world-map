import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppHttpService } from '../app-http.service';
import { HelpersService } from '../helpers.service';
import { Response } from '@angular/http';
import { FiltersService } from '../filters.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { query } from '@angular/core/src/render3/query';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit, OnDestroy {

  constructor(private route:ActivatedRoute,
              private httpService:AppHttpService,
              private helpersService:HelpersService,
              private filtersService:FiltersService,
              private spinnerService:NgxSpinnerService
            ) { 
    /* We can share the data between filtersService and this component normally. But we need to know
      if the filters has been updated and re-organize the data. Whenever filters gets updated, we are
      publishing a flag via Subject and in this component we are subscribing to that flag.
    */
    /**
     * Subscribing to filtersChanged$ subject. If the regions filters changed, need to make a http request
     * to get filtered countried
     */
    this.filtersService.filtersChanged$.subscribe(
      (changed) => {
        this.activeRegions = this.filtersService.getActiveRegionFilters();
        if(this.activeRegions && this.activeRegions.length){
          this.getCountriesInARegion();
        }else{
          this.countries = [];
        }
        
      }
    );
    /**
     * Subscribing to orderByChanged subject. If the orderBy or sortBy filters changed, no need to make
     * http request. We need to reorganize the data
     */
    this.filtersService.orderByChanged$.subscribe(
      (changed) => {
        let sortBy = this.filtersService.getSortByFilter();
        let orderBy = this.filtersService.getOrderByFilter();
        this.countries = this.helpersService.groupData(this.countries,sortBy,orderBy);
      }
    )

    /**
     * Language and Currency filters
     */
    this.route.queryParamMap.subscribe(
      (queryParams) => {
        if(queryParams.get('language')){
          this.languageFilters.isLanguageFilterApplied = true;
          this.languageFilters.languageSelected = queryParams.get('language');
          this.getCountriesByLanguage();
        }
        if(queryParams.get('currency')){
          this.currencyFilters.isCurrencyFilterApplied = true;
          this.currencyFilters.currencySelected = queryParams.get('currency');
          this.getCountriesByCurrency();
        }
      }
    )
  }
  continent:string = '';
  activeRegions;
  countries = [];
  languageFilters = {isLanguageFilterApplied: false, languageSelected:''};
  currencyFilters = {isCurrencyFilterApplied: false, currencySelected:''};

  ngOnInit() { }



  getCountriesInARegion(){
    this.showSpinner();
    this.httpService
        .getCountriesByRegions(this.activeRegions)
        .subscribe(
          (rawData) => {
            let countriesData = this.helpersService.groupRawDataIntoSingleArr(rawData);
            countriesData = this.helpersService.mapNecessacyData(countriesData);
            let sortBy = this.filtersService.getSortByFilter();
            let orderBy = this.filtersService.getOrderByFilter();
            this.countries = this.helpersService.groupData(countriesData,sortBy,orderBy);
            this.hideSpinner();
            this.showLoadedMsg(this.countries.length);
          },
          (error:Response) => {
            let err = error.json();
            this.helpersService.showErrorMsg(err.message);
          }
        )
  }

  getCountriesByLanguage(){
    this.showSpinner();
    this.httpService.getCountriesByLanguage(this.languageFilters.languageSelected)
                    .subscribe(
                      (rawData) => {
                        this.countries = this.helpersService.mapNecessacyData(rawData);
                        this.hideSpinner();
                        this.showLoadedMsg(this.countries.length);
                      },
                      (error:Response) => {
                        let err = error.json();
                        this.helpersService.showErrorMsg(err.message);
                      }
                    )
                    
  }

  getCountriesByCurrency(){
    this.showSpinner();
    this.httpService.getCountriesByCurrency(this.currencyFilters.currencySelected)
                    .subscribe(
                      (rawData) => {
                        this.countries = this.helpersService.mapNecessacyData(rawData);
                        console.log(rawData);
                        this.hideSpinner();
                        this.showLoadedMsg(this.countries.length);
                      },
                      (error:Response) => {
                        let err = error.json();
                        this.helpersService.showErrorMsg(err.message);
                      }
                    )
                    
  }

  showSpinner(){
    return this.spinnerService.show();
  }

  hideSpinner(){
    return this.spinnerService.hide();
  }

  showLoadedMsg(countriesCount:number){
    this.helpersService.showSuccessMsg(`${countriesCount} countries found!!!`);
  }

  ngOnDestroy(){
    this.filtersService.filtersChanged.unsubscribe();
    this.filtersService.orderByChanged.unsubscribe();
  }

}
