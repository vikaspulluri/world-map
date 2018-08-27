import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from '../helpers.service';
import { AppHttpService } from '../app-http.service';
import { Response } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countryName = '';
  country;
  constructor(private route:ActivatedRoute,
    private helpersService:HelpersService,
    private router:Router,
    private filtersService:FiltersService,
    private httpService:AppHttpService,
    private spinnerService:NgxSpinnerService
  ) {
    this.route.queryParamMap.subscribe(
      (queryParams) => {
        this.countryName = queryParams.get('country');
        this.getCountryDetails();
      }
    )
  }

  ngOnInit() {
  }

  getCountryDetails(){
    this.spinnerService.show();
    this.httpService.getCountryDetails(this.countryName)
                    .subscribe(
                      (rawData) => {
                        this.country = this.getRequestedCountry(rawData);;
                        this.spinnerService.hide();
                        console.log(this.country);
                      },
                      (error:Response) => {
                        this.spinnerService.hide();
                        let err = error.json();
                        this.helpersService.showErrorMsg(err.message);
                      }
                    )
  }

  getRequestedCountry(data){
    const matchedCountry = data.filter(function(country){
      let filteredCountryName = country.name.replace(/[^a-zA-Z0-9-_]/g, ' ');
      return filteredCountryName === this.countryName;
    }.bind(this));
    return matchedCountry[0];
  }

  onLanguageFilterClick(language){
    this.filtersService.setActiveFilters([]);
    this.router.navigate(['/countries'],{queryParams:{'language':language.iso639_1,'languageName':language.name}});
  }

  onCurrencyFilterClick(currency){
    this.filtersService.setActiveFilters([]);
    this.router.navigate(['/countries'],{queryParams:{'currency':currency.code,'currencyName':currency.name}});
  }

}
