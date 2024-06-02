const db = require("../database");

// Controller to handle fetching all reviews from the database
exports.all = async (req, res) => {
  try {
    const reviews = await db.review.findAll({
      include: [{ model: db.product, as: 'product', attributes: ['name'] }]
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle creating a new review in the database
exports.create = async (req, res) => {
  try {
    const review = await db.review.create({
      text: req.body.text,
      username: req.body.username,
      rating: req.body.rating,
      product_name: req.body.product_name // Ensure product_name is passed correctly
    });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review
exports.update = async (req, res) => {
  try {
    const review = await db.review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.text = req.body.text;
    review.rating = req.body.rating;
    review.product_name = req.body.product_name; // Ensure product_name is updated

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a review
exports.delete = async (req, res) => {
  try {
    const review = await db.review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.destroy();
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
