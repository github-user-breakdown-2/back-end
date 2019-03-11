const request = require('supertest');

const server = require('./server');

describe('server.js', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {

        it('should return 200 OK with correct JSON message', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual({ message: "Server working" });
        })

    });


});