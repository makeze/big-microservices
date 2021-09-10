import {OrderCreatedEvent, Publisher, Subjects} from "../../../../common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}