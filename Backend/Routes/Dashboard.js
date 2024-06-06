const express = require('express');
const router = express.Router();
const Item = require('../Model/Data'); // Adjust the path if necessary

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    console.log(items); // Log fetched items
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
