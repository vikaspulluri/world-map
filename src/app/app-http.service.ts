import { Injectable } from "@angular/core";
import { config } from './app.config';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AppHttpService{
    constructor(private http:Http){}

    getCountriesByRegions(continents){
        let hostUrl = config.http.hostUrl;
        let observableBatch = [];
        for(let continent of continents){
            observableBatch.push(
                this.http
                    .get(`${hostUrl}/region/${continent.name}`)
                    .pipe(map(
                        (res:Response)=>res.json())
                    )
                    .pipe(catchError(
                        (error:Response) => {
                            console.log(error);
                            return Observable.throw(error);
                        })
                    )
                );
        }
        return Observable.forkJoin(observableBatch);
    }
}