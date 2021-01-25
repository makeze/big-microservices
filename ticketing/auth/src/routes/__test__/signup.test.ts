import request from 'supertest';
import {app} from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtt@test.com',
            password: '+--Password257'
        })
        .expect(201);
});

it('returns a 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@com',
            password: '+--Password257'
        })
        .expect(400);
});

it('returns a 400 with invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'weakpass'
        })
        .expect(400);
});

it('returns a 400 with missing data', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('returns 400 if email exists', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtt@test.com',
            password: '+--Password257'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtt@test.com',
            password: '+--Password257'
        })
        .expect(400);
});