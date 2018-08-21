import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';
import { HomeComponent } from './home/home.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ContinentsComponent } from './continents/continents.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { ToggleWelcomeScreenDirective } from './welcome-screen/toggle-welcome-screen.directive';
import { AppHttpService } from './app-http.service';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { MatchHeightDirective } from './match-height.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CountriesComponent,
    CountryComponent,
    HomeComponent,
    FilterBarComponent,
    ErrorPageComponent,
    ContinentsComponent,
    WelcomeScreenComponent,
    ToggleWelcomeScreenDirective,
    MatchHeightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AppHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
