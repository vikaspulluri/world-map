import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
@Injectable()
export class FiltersService{
    activeRegionFilters;
    sortByFilter;
    orderByFilter;
    private filtersChanged = new Subject<boolean>();
    private orderByChanged = new Subject<boolean>();
    filtersChanged$ = this.filtersChanged.asObservable();
    orderByChanged$ = this.orderByChanged.asObservable();
    setActiveFilters(regions,orderBy='asc',sortBy='name'){
        let currentRegionFilters = this.getActiveRegionFilters();
        if(JSON.stringify(currentRegionFilters) !== JSON.stringify(regions)){
            this.activeRegionFilters = Array.isArray(regions) ? regions : [regions];
            this.filtersChanged.next(true);
        }
    }

    setOrderByAndSortBy(orderBy='asc', sortBy='name'){
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