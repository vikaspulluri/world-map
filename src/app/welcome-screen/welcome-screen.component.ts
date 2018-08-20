import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit, AfterViewInit {
  @ViewChild('welcomeScreen') welcomeScreen:ElementRef;
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    setTimeout(function(){
      this.welcomeScreen.nativeElement.classList.remove('content-hidden');
    }.bind(this),900)
  }

  onEnter(){
    this.welcomeScreen.nativeElement.classList.add('content-hidden');
    this.welcomeScreen.nativeElement.style.display = "none";
  }


}
