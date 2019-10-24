import {PriceStrategyInterface} from "./price-strategy.interface";

export class InsideEuStrategy implements PriceStrategyInterface {

    getPrice(): number {
        return 50;
    }

}
