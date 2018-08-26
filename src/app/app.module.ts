import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { NgxSpinnerModule, NgxSpinnerComponent } from 'ngx-spinner';
import { FiltersService } from './filters.service';
import { MapToIterable } from './map-to-iterable.pipe';

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
    MatchHeightDirective,
    NgxSpinnerComponent,
    MapToIterable
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [AppHttpService, NgxSpinnerModule, FiltersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
