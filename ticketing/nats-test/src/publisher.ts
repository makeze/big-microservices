import * as nats from 'node-nats-streaming';
import {TicketCreatedPublisher} from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
   console.log('Publisher connected to NATS');

   const publisher = new TicketCreatedPublisher(stan);
    publisher.publish({
        id: '123',
        title: 'music',
        price: 39.99
    })
   /*const data = JSON.stringify({
       id: 1,
       title: 'title',
       price: 5
   });

   stan.publish('ticket:created', data, () => {
       console.log('Event published');
   })*/
});