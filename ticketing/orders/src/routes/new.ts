import mongoose from 'mongoose';
import express, {Request, Response} from 'express';
import {BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest} from "@maxytick/common";
import {body} from 'express-validator';
import {Ticket} from "../models/ticket";
import {Order} from "../models/order";

const router = express.Router();

const CART_EXPIRATION_TIME = 15 * 60;

router.post('/api/orders/', requireAuth, [
        body('ticketId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('TicketId must be provided')
    ], validateRequest,
    async (req: Request, res: Response) => {
        const {ticketId} = req.body;
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            throw new NotFoundError();
        }

        if (await ticket.isReserved()) {
            throw new BadRequestError('Ticked is already booked');
        }

        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + CART_EXPIRATION_TIME);

        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticket
        });
        await order.save();

        res.status(201).send(order);
    });

export {router as newOrderRouter}