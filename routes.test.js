
process.env.NODE_env = 'test'

const request = require('supertest')
const app = require('./app')
let items = require("./fakeDb")

let item = { name: "beef", price: 8.99 }

beforeAll(async function(){
    items = [
        {name: "milk", price: 2.99},
        {name: "eggs", price: 4.99},
        {name: "bread", price: 1.50}
    ];
});

beforeEach(async function(){
    items.push(item);
});

afterEach(async function(){
    items = [];
});

describe('GET routes for /items', function(){
    test('Gets all items in item list', async function(){
        const res = await request(app).get('/items');
        expect(items).toHaveLength(4);
        expect(res.statusCode).toBe(200);
    });
})

describe('GET routes for /item/:/name', function(){
    test('get item info', async function(){
        const res = await request(app).get(`/items/${item.name}`);
        console.log(res.req)
        expect(res.body.req).toEqual(item)
        expect(res.statusCode).toBe(200);
    })
    test('get error on non-existing item', async function(){
        const res = await request(app).get('/items/candy');
        expect(res.statusCode).toBe(403);
    })
})