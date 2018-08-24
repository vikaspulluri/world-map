import { Component } from '@angular/core';
import { FormValidators } from './filter-bar/form.validators';
import { FiltersService } from './filters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormValidators, FiltersService]
})
export class AppComponent {
  title = 'app';
}
