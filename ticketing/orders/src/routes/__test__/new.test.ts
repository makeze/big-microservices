import mongoose from 'mongoose';
import request from 'supertest';
import {app} from '../../app';
import {Ticket} from "../../models/ticket";
import {OrderStatus} from "@maxytick/common";
import {Order} from "../../models/order";
import {natsWrapper} from "../../nats-wrapper";

it('returns an error if the ticket does not exist', async () => {
    const ticketId = mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId})
        .expect(404);
});

it('returns an error if the ticket is reserved', async () => {
    const ticket = Ticket.build({
       title: 'lp',
       price: 20
    });
    await ticket.save();
    const order = Order.build({
       ticket,
       userId: '123',
       status: OrderStatus.Created,
       expiresAt: new Date()
    });
    await order.save();
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id})
        .expect(400);
});

it('reserves a ticket', async () => {
    const ticket = Ticket.build({
       price: 55,
       title: 'lp'
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id})
        .expect(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it.todo('emits an order created event');