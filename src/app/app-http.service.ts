import { Injectable } from "@angular/core";
import { config } from './app.config';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AppHttpService{
    constructor(private http:Http){}

    getCountriesByRegion(continent:string){
        return this.http
                    .get(`${config.http.hostUrl}/region/${continent}`)
                    .pipe(map((res:Response) => res.json()))
                    .pipe(catchError(
                        (error:Response) => {
                            console.log(error);
                            return Observable.throw(error);
                        })
                    );
    }
}