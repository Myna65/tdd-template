import {PriceStrategyInterface} from "./price-strategy.interface";

export class LeavingEuStrategy implements PriceStrategyInterface {

    getPrice(): number {
        return 100;
    }

}
