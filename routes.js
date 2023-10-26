const express = require('express');
const router = express.Router();
const items = require('./fakeDb');

router.get('', (req, res, next) => {
    try{
        res.json({ items: items });
    } catch(e) {
        return next(e);
    };
});

router.post('', (req, res, next) => {
    try{
        if (!req.body.name && !req.body.price){
            throw {message: "item name and price required", status: 404};
        } else {
        items.push(req.body);
        res.status(201).json({"added": req.body});
        }
    } catch (e){
        return next(e);
    };
});

router.get('/:name', (req, res, next) => {
    try{
        if (!items.find(item => item.name === req.params.name)){
            throw {message: "item does not exist", status: 404};
        } else {
            item = items.find(item => item.name === req.params.name);
            res.json(item);
        }
    } catch (e){
        return next(e);
    };
});

router.patch('/:name', (req, res) => {
    try{
        let item = items.find(item => item.name === req.params.name);
        item.name = req.body.name;
        item.price = req.body.price;

        res.json({"updated": {
        "name": item.name,
        "price": item.price
    }});
    } catch (e){
        return next(e);
    };
});

router.delete('/:name', (req, res) => {
    try{
        const item = items.find(item => item.name === req.params.name);
        items.splice(items.findIndex((item) => item.name === req.params.name), 1)
        res.json({"message":"Deleted"});
    } catch (e){
        return next(e);
    };
});

module.exports = router;