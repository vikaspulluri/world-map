import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const appRoutes:Routes = [
    {path: '', component: HomeComponent},
    {path: 'countries', component: CountriesComponent},
    {path: 'country', component: CountryComponent},
    {path: 'not-found', component: ErrorPageComponent},
    {path: '**', redirectTo: '/not-foune'}
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