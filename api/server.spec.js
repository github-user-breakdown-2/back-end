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

    describe('homeRouter', () => {
    
        const newUser = {
            email: 'example@email.com',
            password: 'password'
        }

        let user, res; 

        beforeEach( async () => {
            await db('appUsers').truncate();
            await request(server).post('/api/register').send(newUser);
            user = await request(server).post('/api/login').send(newUser);
            return res = await
                request(server)
                .get('/api/app')
                .set('Authorization', `${user.body.token}`)
        })

        describe('GET /', () => {

            it('should return 200 OK with JSON resp', async () => {
                expect(res.status).toBe(200);
                expect(res.type).toBe('application/json');
            })
    
            it('should return decoded token', () => {
                expect(res.body.decodedToken).toBeDefined();
                expect(res.body.decodedToken.email).toBe(newUser.email);
                expect(res.body.decodedToken.subject).toBe(user.body.id);
            })
    
        });

        describe('appRouter', () => {

            describe('GET /:id', () => {
        
                beforeEach( async () => {
                    return res = await
                        request(server)
                        .get(`/api/app/appuser/${user.body.id}`)
                        .set('Authorization', `${user.body.token}`)

                })
    
                it('should return 200 OK with JSON resp', async () => {
                    expect(res.status).toBe(200);
                    expect(res.type).toBe('application/json');
                })
        
                it('should return logged in user without password for security', () => {
                    expect(res.body.id).toBe(1);
                    expect(res.body.id).toBe(user.body.id);
                    expect(res.body.email).toBe(newUser.email);
                    expect(res.body.password).not.toBeDefined();
                })
        
            });

            describe('PUT /:id', () => {

                const changeUser = {
                    email: 'example1@email.com',
                    password: 'password1'
                }
        
                beforeEach( async () => {
                    return res = await
                        request(server)
                        .put(`/api/app/appuser/${user.body.id}`)
                        .send(changeUser)
                        .set('Authorization', `${user.body.token}`)

                })
    
                it('should return 200 OK with JSON resp', async () => {
                    expect(res.status).toBe(200);
                    expect(res.type).toBe('application/json');
                })
        
                it('should update user and return updated user without password', async () => {
                    expect(res.body.id).toBe(1);
                    expect(res.body.id).toBe(user.body.id);
                    expect(res.body.email).toBe(changeUser.email);
                    expect(res.body.password).not.toBeDefined();

                    const origUser = await db('appUsers').where({email: user.body.email}).first();
                    expect(origUser).not.toBeDefined();

                    const updatedUser = await db('appUsers').where({email: changeUser.email}).first();
                    expect(updatedUser.password).toBe(changeUser.password);
                })
        
            });

            describe('DELETE /:id', () => {
        
                beforeEach( async () => {
                    return res = await
                        request(server)
                        .delete(`/api/app/appuser/${user.body.id}`)
                        .set('Authorization', `${user.body.token}`)
                })
    
                it('should return 200 OK with JSON resp', async () => {
                    expect(res.status).toBe(200);
                    expect(res.type).toBe('application/json');
                })
        
                it('should return json message with count deleted', () => {
                    expect(res.body).toEqual({ message: 'Number of user deleted', count: 1 });
                })

                it('confirms user deleted from db', async () => {
                    const origUser = await db('appUsers').where({email: user.body.email}).first();
                    expect(origUser).not.toBeDefined();    
                    
                    const dbUser = await db('appUsers');
                    expect(dbUser).toEqual([]);    
                })
        
            });
        
        });
    
    });

});