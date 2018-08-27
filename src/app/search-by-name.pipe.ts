import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchByName',
    pure: false
})
export class SearchByName implements PipeTransform{
    transform(data:any, searchString:string, searchProp:string):any{
        if(data.length === 0){
            return data;
        }
        const resultArray = [];
        for(let item of data){
            if(item[searchProp].toLowerCase().startsWith(searchString.toLowerCase())){
                resultArray.push(item);
            }
        }
        return resultArray;
    }
}