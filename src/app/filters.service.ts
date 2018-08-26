import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { config } from "./app.config";
@Injectable()
export class FiltersService{
    activeRegionFilters;
    sortByFilter;
    orderByFilter;
    private filtersChanged;
    private orderByChanged;
    public filtersChanged$;
    public orderByChanged$;

    constructor(){
        this.filtersChanged = new Subject<boolean>();
        this.orderByChanged = new Subject<boolean>();
        this.filtersChanged$ = this.filtersChanged.asObservable();
        this.orderByChanged$ = this.orderByChanged.asObservable();
    }

    setActiveFilters(regions){
        let currentRegionFilters = this.getActiveRegionFilters();
        if(JSON.stringify(currentRegionFilters) !== JSON.stringify(regions)){
            this.activeRegionFilters = Array.isArray(regions) ? regions : [regions];
            this.filtersChanged.next(true);
        }
    }

    setOrderByAndSortBy(orderBy=config.filters.orderBy[0], sortBy=config.filters.sortByProp[0]){
        this.sortByFilter = sortBy;
        this.orderByFilter = orderBy;
        this.orderByChanged.next(true);
    }

    getActiveRegionFilters(){
        return this.activeRegionFilters;
    }

    getSortByFilter(){
        return this.sortByFilter;
    }

    getOrderByFilter(){
        return this.orderByFilter;
    }
}