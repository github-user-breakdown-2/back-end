const request = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');

describe('server.js', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('registerRouter', () => {

        describe('POST /', () => {
    
            const newUser = {
                email: 'example@email.com',
                password: 'password'
            }
    
            let res; 
    
            beforeEach( async () => {
                await db('appUsers').truncate();
                return res = await request(server).post('/api/register').send(newUser);
            })
    
            it('should return 201 OK with JSON resp', () => {
                expect(res.status).toBe(201);
                expect(res.type).toBe('application/json');
            })
    
            it('should return inserted user with hashed password', () => {
                expect(res.body.id).toBe(1);
                expect(res.body.email).toBe(newUser.email);
                expect(res.body.password).not.toBe(newUser.password);
            })
    
        });
    
    });

    describe('loginRouter', () => {

        describe('POST /', () => {
    
            const newUser = {
                email: 'example@email.com',
                password: 'password'
            }
    
            let res; 
    
            beforeEach( async () => {
                await db('appUsers').truncate();
                await request(server).post('/api/register').send(newUser);
                return res = await request(server).post('/api/login').send(newUser);
            })

    
            it('should return 201 OK with JSON resp', async () => {
                expect(res.statusCode).toBe(201);
                expect(res.type).toBe('application/json');
            })
    
            it('should return object with is, email, and token', () => {
                expect(res.body.id).toBe(1);
                expect(res.body.email).toBe(newUser.email);
                expect(res.body.token).toBeDefined();
            })
    
        });
    
    });

    describe('HomeRouter', () => {

        describe('GET /', () => {
    
            const newUser = {
                email: 'example@email.com',
                password: 'password'
            }
    
            let res; 
    
            beforeEach( async () => {
                await db('appUsers').truncate();
                await request(server).post('/api/register').send(newUser);
                const user = await request(server).post('/api/login').send(newUser);
                return res = await
                    request(server)
                    .get('/api/app')
                    .set('Authorization', `${user.body.token}`)
            })

            it('should return 200 OK with JSON resp', async () => {
                expect(res.status).toBe(200);
                expect(res.type).toBe('application/json');
            })
    
            it('should return decoded token', () => {
                expect(res.body.decodedToken).toBeDefined();
                expect(res.body.decodedToken.email).toBe(newUser.email);
                expect(res.body.decodedToken.subject).toBe(1);
            })
    
        });
    
    });

});