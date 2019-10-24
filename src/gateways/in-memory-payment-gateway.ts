import {PaymentGatewayInterface} from "../domain/payment-gateway.interface";
import {Customer} from "../domain/customer";
import {Payment} from "../domain/payment";


export class InMemoryPaymentGateway implements PaymentGatewayInterface {

    payments: Payment[] = [];

    findByCustomer(customer: Customer) : Payment {
        return this.payments.find(payment => payment.customer === customer);
    }

    charge(customer: Customer, amount: number): void {

        this.payments.push(new Payment(customer, amount))

    }
}
