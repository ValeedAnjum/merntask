
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Category = require("../models/category");
router.get('/list', auth, async (req, res) => {
  try {
    const list = await Category.find({}).select(['name']);
    return res.json(list)
  } catch (error) {
    console.log(error.message)
    return res.status(500).send("Server Error");
  }
})
router.get('/categories/:num', auth, async (req, res) => {
  try {
    let { num } = req.params
    num = num > 0 ? num - 1 : num;
    const page = num | 0;
    //will change PerPage this later
    const PerPage = 2;
    const totalNumber = await Category.find({}).count();
    console.log({ totalNumber })
    const allCategories = await Category
      .find({})
      .skip(page * PerPage)
      .limit(PerPage);
    return res.json({ total: totalNumber, categories: allCategories })

  } catch (error) {
    console.log(error.message)
    return res.status(500).send("Server Error");
  }
})
router.post("/create", [
  auth,
  check("name", "Please enter category name").not().isEmpty(),
], async (req, res) => {
  try {
    // validating inputs 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;

    let category = await Category.findOne({ name })
    // first check same name
    if (category) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Category already exists" }] });
    }
    category = new Category({ name });
    await category.save();
    return res.json(category);
  } catch (error) {
    console.log(error.message)
    return res.status(500).send("Server Error");
  }
});

router.post("/update/:id", [
  auth,
  check("name", "Please enter category name").not().isEmpty(),
], async (req, res) => {
  try {
    // validating inputs 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const { id } = req.params;
    let category = await Category.findById(id);
    // first check same name
    if (!category) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Category does not exists" }] });
    }
    category.name = name;
    await category.save();
    return res.json(category);
  } catch (error) {
    console.log(error.message)
    return res.status(500).send("Server Error");
  }
});

router.post("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let category = await Category.findById(id);
    // first check
    if (!category) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Category does not exists" }] });
    }

    await category.delete();
    return res.json({ message: 'category deleted' });
  } catch (error) {
    console.log(error.message)
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
