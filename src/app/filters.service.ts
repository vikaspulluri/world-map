import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
@Injectable()
export class FiltersService{
    activeRegionFilters;
    private filtersChanged = new Subject<boolean>();
    filtersChanged$ = this.filtersChanged.asObservable();
    setActiveRegionFilters(continent){
        this.activeRegionFilters = Array.isArray(continent) ? continent : [continent];
        this.filtersChanged.next(true);
    }

    getActiveRegionFilters(){
        return this.activeRegionFilters;
    }
}