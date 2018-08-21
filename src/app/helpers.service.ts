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

  showSuccessMsg(msg){
    this.toastr.success(msg);
  }
}
