import request from 'supertest';
import {app} from '../../app';

it('returns a 201 on successful sign in', async () => {
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
});

it('should fail if a password is wrong', async () => {
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
            password: 'wrongpassword'
        })
        .expect(400);
});

it('should fail if an email does not exist', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'doesntexist@test.com',
            password: '+--Password257'
        })
        .expect(400);
});