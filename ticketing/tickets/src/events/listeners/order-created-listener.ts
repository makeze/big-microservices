import {Listener, OrderCreatedEvent, Subjects} from "@maxytick/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "./queue-group-name";
import {Ticket} from "../../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    queueGroupName: string = queueGroupName;
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message): Promise<void> {
        // find the ticket for the order
        const ticket = await Ticket.findById(data.ticket.id);

        // if no ticket throw error
        if(!ticket) {
            throw new Error("Ticket not found!");
        }

        // mark the ticket as reserved
        ticket.set({orderId: data.id});

        // save the ticket
        await ticket.save();

        // ack the message
        msg.ack();
    }
    
}