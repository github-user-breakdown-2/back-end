const db = require('../../../data/dbConfig');

const appUserModel = require('./appUserModel');

describe('app user model', () => {

    const user = {
        email: 'example@email.com',
        password: 'password'
    }

    let id;

    beforeEach(async () => {
        await db('appUsers').truncate();
        [id] = await db('appUsers').insert(user);
        return id;
    })

    describe('getUserByID()', () => {

        it('should find user in db by specified ID given in req.params', async () => {
            const res = await appUserModel.getUserByID(id);
            expect(res.id).toBe(1);
            expect(res.email).toBe(user.email);
            expect(res.password).toBeNull;

        });

    });

    describe('delete()', () => {

        it('should delete the user by sepcified id', async () => {
            let users = await db('appUsers');
            expect(users).toHaveLength(1);
            let user = await db('appUsers').where({ id }).first();
            expect(user).toBeDefined();

            const deleteUserRes = await appUserModel.delete(id);
            
            users = await db('appUsers');
            expect(users).not.toHaveLength;
            user = await db('appUsers').where({ id }).first();
            expect(user).toBeUndefined();

            expect(deleteUserRes).toBe(1);

        });

    });

    describe('update()', () => {

        it('should update the user by sepcified id', async () => {
            let userInit = await db('appUsers').where({ id }).first();
            expect(userInit.id).toBe(1);
            expect(userInit.email).toBe(user.email);
            expect(userInit.password).toBe(user.password);

            const changes = {
                email: 'example1@email.com',
                password: 'password1'
            }

            await appUserModel.update(id, changes);
            
            const userFinal = await db('appUsers').where({ id }).first();
            expect(userFinal.id).toBe(1);
            expect(userFinal.email).toBe(changes.email);
            expect(userFinal.password).toBe(changes.password);
        });

    });

});