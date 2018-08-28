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
      filteredData = filteredData.concat(items);
    }
    return filteredData;
  }

  mapNecessacyData(data){
    let mappedData = data.map((item)=>{
      let tmpObj:{[k:string]:any} = {};
      tmpObj.name = item.name;
      tmpObj.flag = item.flag;
      tmpObj.capital = item.capital;
      tmpObj.population = <number>item.population.toLocaleString('en-US');
      tmpObj.languages = item.languages;
      tmpObj.currencies = item.currencies;
      tmpObj.region = item.region;
      return tmpObj;
    });
    return mappedData;
  }

  groupData(data,sortByProp,orderBy){
    if(orderBy === 'asc'){
      return data.sort(this.sortBy(sortByProp));
    }else{
      return data.sort(this.sortBy(`-${sortByProp}`));
    }
  }

  sortBy(prop){
    var sortOrder = 1;
    if(prop[0] === "-") {
        sortOrder = -1;
        prop = prop.substr(1);
    }
    return function (a,b) {
        var result = (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
        return result * sortOrder;
    } 
  }


  showSuccessMsg(msg){
    this.toastr.success(msg);
  }

  showErrorMsg(msg){
    this.toastr.error(msg);
  }
}
