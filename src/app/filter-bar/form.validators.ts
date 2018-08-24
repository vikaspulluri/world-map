import { FormGroup, FormControl } from '@angular/forms';

export class FormValidators{
    atLeastOneRequired(formGroup: FormGroup){
        let noOfActiveFilters = [];
        for(let key in formGroup.controls){
            if(formGroup.controls.hasOwnProperty(key)){
                let control:FormControl = <FormControl>formGroup.controls[key];
                if(control.value){
                    noOfActiveFilters.push(noOfActiveFilters.length+1);
                }
            }
        }
        if(noOfActiveFilters.length > 1){
            return null;
        }
        return {
            valid: false,
            atleastOneRequired: true
        }
    }
}