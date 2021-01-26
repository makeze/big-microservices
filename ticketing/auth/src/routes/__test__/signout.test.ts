import request from 'supertest';
import {app} from '../../app';
import cookieSession from "cookie-session";

it('returns 400 if email exists', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '+--Password257'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '+--Password257'
        })
        .expect(400);
});

it('clears a cookie on signout', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '+--Password257'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '+--Password257'
        })
        .expect(201);

    const response = await request(app)
        .get('/api/users/signout')
        .expect(200);
    expect(response.get('Set-Cookie')[0]).toEqual(
        'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
});