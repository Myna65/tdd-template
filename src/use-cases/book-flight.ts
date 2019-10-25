import {Customer} from "../domain/customer";
import {Flight} from "../domain/flight";
import {PaymentGatewayInterface} from "../domain/payment-gateway.interface";

export class BookFlightUseCase {
    constructor(private paymentGateway: PaymentGatewayInterface) {}

    execute(customer: Customer, flight: Flight) {

        const strategy = flight.getStrategy();
        const listedPrice = strategy.getPrice();
        const milesToUse = Math.min(listedPrice * 100, customer.miles);
        const finalPrice = listedPrice - milesToUse * 0.01;

        customer.useMiles(milesToUse);

        this.paymentGateway.charge(customer, finalPrice);
    }
}
