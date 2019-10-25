import {Customer} from "../domain/customer";
import {Flight} from "../domain/flight";
import {InMemoryPaymentGateway} from "../gateways/in-memory-payment-gateway";
import {BookFlightUseCase} from "./book-flight";

let paymentGateway : InMemoryPaymentGateway;

function expectCustomerToBeCharged(customer: Customer, amount: number) {
    const payment = paymentGateway.findByCustomer(customer);
    expect(payment.amount).toBe(amount);
}

beforeEach(() => {
    paymentGateway = new InMemoryPaymentGateway();
});

function bookFlight(customer: Customer, from: string, to: string) {
    const flight = new Flight(from, to);

    const bookFlightUseCase = new BookFlightUseCase(paymentGateway);
    bookFlightUseCase.execute(customer, flight);
}

function expectCustomerMiles(customer: Customer, miles: number) {
    expect(customer.miles).toEqual(miles);
}

test('From EU to EU', () => {
    const customer = new Customer();

    bookFlight(customer, "Luxembourg", "Barcelona");

    expectCustomerToBeCharged(customer, 50);
});

test('From EU to Outside', () => {
    const customer = new Customer();

    bookFlight(customer, "Luxembourg", "Tokyo");

    expectCustomerToBeCharged(customer, 100);
});

test('From EU to Outside with miles', () => {
    const availableMiles = 1000;
    const flightPrice = 100;

    const customer = new Customer(availableMiles);

    bookFlight(customer, "Luxembourg", "Tokyo");

    expectCustomerToBeCharged(customer, flightPrice - availableMiles * 0.01);
    expectCustomerMiles(customer, 0);
});

test('From EU to Outside with too many miles', () => {
    const availableMiles = 100000;
    const flightPrice = 100;

    const customer = new Customer(availableMiles);

    bookFlight(customer, "Luxembourg", "Tokyo");

    expectCustomerToBeCharged(customer, 0);
    expectCustomerMiles(customer, availableMiles - flightPrice * 100);
});
