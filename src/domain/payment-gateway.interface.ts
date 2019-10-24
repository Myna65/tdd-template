import {Customer} from "./customer";

export interface PaymentGatewayInterface {

    charge(customer: Customer, amount: number): void;
}
