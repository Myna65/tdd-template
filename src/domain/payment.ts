import {Customer} from "./customer";

export class Payment {
    constructor(private _customer: Customer, private _amount: number) {}

    get customer(): Customer {
        return this._customer;
    }

    get amount(): number {
        return this._amount;
    }
}
