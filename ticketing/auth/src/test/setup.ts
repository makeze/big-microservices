import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import {app} from '../app';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): Promise<string[]>
        }
    }
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = 'maksudik';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
});

beforeEach(async () => {
   const collections = await mongoose.connection.db.collections();

   for (let collection of collections) {
       await collection.deleteMany({});
   }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async () => {
    const email = 'test@test.com';
    const password = '+--maksudiK123';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: email,
            password: password
        })
        .expect(201);

    return response.get('Set-Cookie');
}