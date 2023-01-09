import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "customFilter" })
export class FilterPipe implements PipeTransform {

    transform(items: any[], keys: string, search: string): any | any[] {
        if(!items) {
            return [];
        }
        if(!search) {
            return items;
        }

        const regExp = new RegExp(search, 'gi');

        return items.filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && regExp.test(item[key])));
    }
}