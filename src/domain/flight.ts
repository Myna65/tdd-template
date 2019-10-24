import {PriceStrategyInterface} from "./price-strategy/price-strategy.interface";
import {InsideEuStrategy} from "./price-strategy/inside-eu-strategy";
import {LeavingEuStrategy} from "./price-strategy/leaving-eu-strategy";

export class Flight {

    constructor(private _start: string, private _end: string) {    }

    get start(): string {
        return this._start;
    }

    get end(): string {
        return this._end;
    }

    getStrategy() : PriceStrategyInterface {
        if(this._end === "Barcelona") {
            return new InsideEuStrategy();
        } else {
            return new LeavingEuStrategy();
        }
    }
}
