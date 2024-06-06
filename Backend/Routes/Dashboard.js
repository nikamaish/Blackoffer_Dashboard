const express = require('express');
const router = express.Router();
const Item = require('../Model/Data'); // Adjust the path if necessary

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find({},{
      intensity: 1,
      likelihood: 1,
      relevance: 1,
      start_year: 1,
      country: 1,
      topic: 1,
      region: 1,
      _id: 0
    });
    console.log(items); // Log fetched items
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
