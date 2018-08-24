import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { config } from '../app.config';
import { FiltersService } from '../filters.service';
import { ActivatedRoute } from '@angular/router';
import { HelpersService } from '../helpers.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
    regionFiltersForm: FormGroup;
    regionFilters = config.map.regions;
    selectedRegion;

    constructor(private formBuilder: FormBuilder, private route:ActivatedRoute,private helpersService:HelpersService,private filtersService:FiltersService){
        this.route.queryParamMap.subscribe(
            (queryParams) => {
                this.selectedRegion = queryParams.get('continent');
                const activeFilter = this.helpersService.getRegionIdByName(this.selectedRegion);
                this.filtersService.setActiveRegionFilters(activeFilter);
            },
            (error) => console.log(error)
        )
        
        this.setFilters();
    }
    ngOnInit(){
        
    }

    setFilters(){
        //Region filters
        const formControls = this.regionFilters.map(control => new FormControl(false));
        let activeFilter = this.helpersService.getRegionIdByName(this.selectedRegion);
        formControls[activeFilter.counter-1].setValue(true);

        this.regionFiltersForm = this.formBuilder.group({
            regionFilters: new FormArray(formControls)
        });
    }

    onFormSubmit(){
        const selectedFilters = this.regionFiltersForm.value.regionFilters
                                                            .map((val,iter)=> val ? this.regionFilters[iter] : null)
                                                            .filter(val => val != null);
        this.filtersService.setActiveRegionFilters(selectedFilters);
        console.log(selectedFilters);
    }
}