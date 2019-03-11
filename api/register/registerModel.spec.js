const db = require('../../data/dbConfig');

const registerModel = require('./registerModel');

describe('register model', () => {

    beforeEach(async () => {
        await db('appUsers').truncate();
    })

    afterEach(async () => {
        await db('appUsers').truncate();
    })

    describe('add()', () => {

        it('should add new user to db', async () => {
            const newUser1 = {
                email: 'example@email.com',
                password: 'password'
            }

            const user1 = await registerModel.add(newUser1);
            expect(user1.email).toBe(newUser1.email);
            expect(user1.id).toBe(1)

            const newUser2 = {
                email: 'example2@email.com',
                password: 'password2'
            }

            const user2 = await registerModel.add(newUser2);
            expect(user2.email).toBe(newUser2.email);
            expect(user2.id).toBe(2)
        });

    });

    describe('getUserByEmail()', () => {

        it('should find if email already exists in db', async () => {
            const newUser1 = {
                email: 'example@email.com',
                password: 'password'
            }

            await registerModel.add(newUser1);

            const newUser2 = {
                email: 'example@email.com',
                password: 'password2'
            }

            const users = await registerModel.getUserByEmail(newUser2.email);
            expect(users).toBeDefined;
            expect(users).toHaveLength;
            expect(users[0].email).toBe(newUser2.email);
            expect(users[0].email).toBe(newUser1.email);
        });

    });

});