import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

export const appRoutes:Routes = [
    {path: '', component: WelcomeScreenComponent},
    {path: 'continents', component:HomeComponent},
    {path: 'countries', component: CountriesComponent},
    {path: 'country', component: CountryComponent},
    {path: 'not-found', component: ErrorPageComponent},
    {path: '**', redirectTo: '/not-found'}
] 

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}