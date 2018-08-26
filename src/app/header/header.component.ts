import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
  }
  onGoBackClick($event:MouseEvent){
    $event.preventDefault();
    this.location.back();
  }

}
