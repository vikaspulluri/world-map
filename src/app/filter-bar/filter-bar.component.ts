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
    filtersForm: FormGroup;
    regionFilters = config.map.regions;
    orderByFilters = config.filters.orderBy;
    sortByFilters = config.filters.sortByProp;
    selectedRegion;

    constructor(private formBuilder: FormBuilder, private route:ActivatedRoute,private helpersService:HelpersService,private filtersService:FiltersService){
        this.route.queryParamMap.subscribe(
            (queryParams) => {
                this.selectedRegion = queryParams.get('continent');
                if(this.selectedRegion){
                    const activeFilter = this.helpersService.getRegionIdByName(this.selectedRegion);
                    this.filtersService.setActiveFilters(activeFilter);
                }else{
                    this.filtersService.setActiveFilters([]);
                }
                this.filtersService.setOrderByAndSortBy(config.filters.orderBy[0],config.filters.sortByProp[0]);
            },
            (error) => console.log(error)
        )
        
        this.setFilters();
    }
    ngOnInit(){}

    setFilters(){
        //Region filters
        const regionFormControls = this.regionFilters.map(control => new FormControl(false));
        if(this.selectedRegion){
            let activeFilter = this.helpersService.getRegionIdByName(this.selectedRegion);
            regionFormControls[activeFilter.counter-1].setValue(true);
        }

        this.filtersForm = this.formBuilder.group({
            regionFilters: new FormArray(regionFormControls),
            orderByFilters: new FormControl(config.filters.orderBy[0]),
            sortByFilters: new FormControl(config.filters.sortByProp[0])
        });
    }

    onFormSubmit(){
        const selectedRegions = this.filtersForm.value.regionFilters
                                                            .map((val,iter)=> val ? this.regionFilters[iter] : null)
                                                            .filter(val => val != null);
        this.filtersService.setActiveFilters(selectedRegions);
        this.filtersService.setOrderByAndSortBy(this.filtersForm.value.orderByFilters,this.filtersForm.value.sortByFilters);
    }
}