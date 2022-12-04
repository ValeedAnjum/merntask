

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Car = require("../models/car");

router.get('/totalcars', auth, async (req, res) => {
    try {
        const total = await Car.find({}).count();
        return res.json(total);
    } catch (error) {
        console.log(error)
    }
})

router.get('/listofcars/:categoryId/:num', auth, async (req, res) => {
    try {
        const { categoryId } = req.params;
        let { num } = req.params
        num = num > 0 ? num - 1 : num;
        const page = num | 0;
        //will change PerPage this later
        const PerPage = 1;
        const totalNumber = await Car.find({ category_id: categoryId }).count();
        const car = await Car.find({ category_id: categoryId }).skip(page * PerPage)
            .limit(PerPage);
        return res.json({ cars: car, total: totalNumber });
    } catch (error) {
        console.log(error)
    }
})
router.post("/add", [
    auth,
    check("category_id", "Please enter car category_id").not().isEmpty(),
    check("name", "Please enter car name").not().isEmpty(),
    check("color", "Please enter car color").not().isEmpty(),
    check("model", "Please enter car model").not().isEmpty(),
    check("make", "Please enter car make").not().isEmpty(),
    check("reg", "Please enter car registartion number").not().isEmpty(),
], async (req, res) => {
    try {
        // validating inputs 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, color, model, make, reg, category_id } = req.body;

        let car = await Car.findOne({ name })
        // first check same name
        if (car) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Car already exists" }] });
        }
        car = new Car({ category_id, name, color, model, make, reg });
        await car.save();
        return res.json(car);
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("Server Error");
    }
});

router.post("/update/:id", [
    auth,
    check("category_id", "Please enter car category_id").not().isEmpty(),
    check("name", "Please enter car name").not().isEmpty(),
    check("color", "Please enter car color").not().isEmpty(),
    check("model", "Please enter car model").not().isEmpty(),
    check("make", "Please enter car make").not().isEmpty(),
    check("reg", "Please enter car registartion number").not().isEmpty(),
], async (req, res) => {
    try {
        // validating inputs 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, color, model, make, reg, category_id } = req.body;
        const { id } = req.params;
        let car = await Car.findById(id);
        // first check same name
        if (!car) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Car does not exists" }] });
        }
        car.name = name;
        car.color = color;
        car.model = model;
        car.make = make;
        car.reg = reg;
        car.category_id = category_id;
        await car.save();
        return res.json(car);
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("Server Error");
    }
});

router.post("/delete/:id", auth, async (req, res) => {
    try {
        // validating inputs 

        const { id } = req.params;
        let car = await Car.findById(id);
        // first check same name
        if (!car) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Car does not exists" }] });
        }

        await car.delete();
        return res.json({ message: 'car deleted' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("Server Error");
    }
});

module.exports = router;
