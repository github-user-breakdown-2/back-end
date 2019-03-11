const db = require('../../data/dbConfig');

const loginModel = require('./loginModel');

describe('login model', () => {

    beforeEach(async () => {
        await db('appUsers').truncate();
        const user = {
            email: 'example@email.com',
            password: 'password'
        }
        await db('appUsers').insert(user);
    })

    afterEach(async () => {
        await db('appUsers').truncate();
    })

    describe('getUserByEmail()', () => {

        it('should find user that is in db', async () => {
            const user = {
                email: 'example@email.com',
                password: 'password'
            }

            const res = await loginModel.getUserByEmail(user.email);
            expect(res.id).toBe(1);
            expect(res.email).toBe(user.email);
            expect(res.password).toBe(user.password);

        });

        it('should not find user if user not in db', async () => {
            const user = {
                email: 'example2@email.com',
                password: 'password'
            }

            const res = await loginModel.getUserByEmail(user.email);
            expect(res).toBeNull;

        });

    });

});