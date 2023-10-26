
process.env.NODE_env = 'test'

const request = require('supertest');
const app = require('./app');
let items = require("./fakeDb");

let item;

describe('GET routes for /items', function(){
    test('gets all items in item list', async function(){
        const res = await request(app).get('/items');
        expect(items).toHaveLength(3);
        expect(res.statusCode).toBe(200);
    });
});

describe('GET routes for /item/:/name', function(){
    test('get item info', async function(){
        const res = await request(app).get(`/items/milk`);
        expect(res.body.name).toEqual('milk');
        expect(res.statusCode).toBe(200);
    });
    test('get error on non-existing item', async function(){
        const res = await request(app).get('/items/candy');
        expect(res.statusCode).toBe(404);
    });
});

describe('POST routes for /items', function(){

    beforeAll(function(){
        item = { name: "beef", price: 8.99 };
    });

    afterAll(function(){
        items.pop()
    });

    test('should successfully post and return JSON of new item', async function(){
        const res = await request(app).post('/items').send(item);
        expect(res.statusCode).toBe(201);
        expect(items).toHaveLength(4);
    });
    test('should get error on missing data of new item', async function(){
        const res = await request(app).post('/items').send({});
        expect(res.statusCode).toBe(404);
        expect(items).toHaveLength(4);
    })
});

describe('PATCH routes for /items/:/name', function(){
    test('should successfully post and return JSON of new item', async function(){
        const res = await request(app).patch('/items/milk').send({name: "pork", price: 7.99});
        expect(res.statusCode).toBe(200);
        expect(items).toHaveLength(3);
    });
});

describe('DELETE routes for /items/:/name', function(){
    test('should successfully delete item', async function(){
        const res = await request(app).delete('/items/milk');
        expect(res.statusCode).toBe(200);
        expect(items).toHaveLength(2);
    });
});