import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpService } from '../app-http.service';
import { HelpersService } from '../helpers.service';
import { Response } from '@angular/http';
import { FiltersService } from '../filters.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit, OnDestroy {

  continent:string = '';
  activeRegions;
  countries = [];
  languageFilters = {isLanguageFilterApplied: false, languageSelected:'',languageName:''};
  currencyFilters = {isCurrencyFilterApplied: false, currencySelected:'',currencyName:''};
  pageTitle = '';
  searchedName = '';
  filtersChanged:Subscription;
  orderByChanged:Subscription;

  constructor(private route:ActivatedRoute,
              private httpService:AppHttpService,
              private helpersService:HelpersService,
              private filtersService:FiltersService,
              private spinnerService:NgxSpinnerService,
              private router:Router
            ) { 

    /**
     * Language and Currency filters
     */
    this.route.queryParamMap.subscribe(
      (queryParams) => {
        if(queryParams.get('language')){
          this.languageFilters.isLanguageFilterApplied = true;
          this.languageFilters.languageSelected = queryParams.get('language');
          this.languageFilters.languageName = queryParams.get('languageName');
          this.getCountriesByLanguage();
        }
        if(queryParams.get('currency')){
          this.currencyFilters.isCurrencyFilterApplied = true;
          this.currencyFilters.currencySelected = queryParams.get('currency');
          this.currencyFilters.currencyName = queryParams.get('currencyName');
          this.getCountriesByCurrency();
        }
      }
    )

    /* We can share the data between filtersService and this component normally. But we need to know
      if the filters has been updated and re-organize the data. Whenever filters gets updated, we are
      publishing a flag via Subject and in this component we are subscribing to that flag.
    */
    /**
     * Subscribing to filtersChanged$ subject. If the regions filters changed, need to make a http request
     * to get filtered countried
     */
    this.filtersChanged = this.filtersService.filtersChanged$.subscribe(
      (changed) => {
        this.activeRegions = this.filtersService.getActiveRegionFilters();
        if(this.activeRegions && this.activeRegions.length){
          this.getCountriesInARegion();
        }else{
          this.countries = [];
          this.pageTitle = '';
        }
        
      }
    );
    /**
     * Subscribing to orderByChanged Subject. If the orderBy or sortBy filters changed, no need to make
     * http request. We need to reorganize the data
     */
    this.orderByChanged = this.filtersService.orderByChanged$.subscribe(
      (changed) => {
        let sortBy = this.filtersService.getSortByFilter();
        let orderBy = this.filtersService.getOrderByFilter();
        this.countries = this.helpersService.groupData(this.countries,sortBy,orderBy);
      }
    )

    
  }
  

  ngOnInit() { }

  setPageTitle(type){
    if(type === 'regionFilter'){
      this.pageTitle = `${ this.countries.length } countries found`;
    }else if(type === 'langFilter'){
      this.pageTitle = `${this.countries.length} countries speak ${this.languageFilters.languageName}`;
    }else if(type === 'currencyFilter'){
      this.pageTitle = `${this.countries.length} countries use ${this.currencyFilters.currencyName}`;
    }
  }

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
            this.setPageTitle('regionFilter');
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
                        this.setPageTitle('langFilter');
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
                        this.setPageTitle('currencyFilter');
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

  onLanguageFilterClick(language){
    this.filtersService.setActiveFilters([]);
    this.router.navigate(['/countries'],{queryParams:{'language':language.iso639_1,'languageName':language.name}});
  }

  onCurrencyFilterClick(currency){
    this.filtersService.setActiveFilters([]);
    this.router.navigate(['/countries'],{queryParams:{'currency':currency.code,'currencyName':currency.name}});
  }

  ngOnDestroy(){
    if(!!this.filtersChanged) this.filtersChanged.unsubscribe();
    if(!!this.orderByChanged) this.orderByChanged.unsubscribe();
  }

}
