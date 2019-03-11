const request = require('supertest');

const server = require('../server');
const db = require('../../data/dbConfig');

describe('registerRouter', () => {

    describe('POST /', () => {

        beforeEach(async () => {
            await db('appUsers').truncate();
        })


        it('should return 201 OK with corect JSON resp', async () => {
            const newUser1 = {
                email: 'example@email.com',
                password: 'password'
            }
            const res = await request(server).post('/api/register').send(newUser1);
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
        })

        it('should return inserted user with hashed password', async () => {
            const newUser1 = {
                email: 'example@email.com',
                password: 'password'
            }
            const res = await request(server).post('/api/register').send(newUser1);
            expect(res.body.email).toBe(newUser1.email);
            expect(res.body.password).not.toBe(newUser1.password);
        })

    });

});