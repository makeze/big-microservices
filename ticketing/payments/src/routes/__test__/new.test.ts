import {Order} from "../../models/order";
import mongoose from "mongoose";
import {OrderStatus} from "@maxytick/common";
import {app} from "../../app";
import request from "supertest";


const setup = async () => {
    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        price: 49.99
    });
}

it ('should successfully pay the order', async () => {
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: '123',
            orderId: mongoose.Types.ObjectId().toHexString()
        })
        .expect(404);
});

it ('fail when an order does not exist', async () => {
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: '123',
            orderId: mongoose.Types.ObjectId().toHexString()
        })
        .expect(404);
});

it ('should return unauthorized if the wrong user is trying to pay the order', async () => {
    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        price: 49.99
    });
    await order.save();
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: '123',
            orderId: order.id
        })
        .expect(401);
});

it ('should return bad request if the order is already cancelled', async () => {
    const userId = mongoose.Types.ObjectId().toHexString();
    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: userId,
        status: OrderStatus.Cancelled,
        price: 49.99
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            token: '123',
            orderId: order.id
        })
        .expect(400);
});