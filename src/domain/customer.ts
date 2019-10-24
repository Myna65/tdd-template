import {Flight} from "./flight";

export class Customer {
    constructor(private _miles : number = 0) {}

    get miles() {
        return this._miles;
    }

    useMiles(miles: number) {
        this._miles -= miles;
    }
}
