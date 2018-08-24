import { Injectable } from '@angular/core';
import { config } from './app.config';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private toastr: ToastrService) {}

  getRegionNameById(id):object{
    let regionName = config.map.regions.find(function(item){
      return item.code === id;
    })
    return regionName;
  }

  getRegionIdByName(name:string){
    let regionId = config.map.regions.find(function(item){
      return item.name.toLowerCase() === name.toLowerCase()
    })
    return regionId;
  }

  groupRawDataIntoSingleArr(rawData){
    let filteredData = [];
    for(let items of rawData){
      let filteredItems = items.map((item)=>{
        let tmpObj:{[k:string]:any} = {};
      tmpObj.name = item.name;
      tmpObj.flag = item.flag;
      tmpObj.capital = item.capital;
      tmpObj.population = item.population;
      tmpObj.languages = item.languages;
      tmpObj.currencies = item.currencies;
      return tmpObj;
      });
      filteredData = filteredData.concat(filteredItems);
    }

    return filteredData;
  }

  showSuccessMsg(msg){
    this.toastr.success(msg);
  }

  showErrorMsg(msg){
    this.toastr.error(msg);
  }
}
