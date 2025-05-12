const LostProduct = require('../models/lostproductmodel');

exports.createLostProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      dateLost,
      contactInfo,
      type,
    } = req.body;

    const lostProduct = new LostProduct({
      title,
      description,
      category,
      location,
      dateLost,
      contactInfo,
      type,
      user: req.userId,
      image: req.file ? req.file.filename : '',
    });

    await lostProduct.save();
    res.status(201).json({ message: 'Product created successfully', data: lostProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

exports.getAllLostProducts = async (req, res) => {
  try {
    const products = await LostProduct.find().populate('user', 'name email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

exports.getLostProductById = async (req, res) => {
  try {
    const product = await LostProduct.findById(req.params.id).populate('user', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

exports.markAsFound = async (req, res) => {
  try {
    const product = await LostProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.isFound = true;
    await product.save();

    res.status(200).json({ message: 'Product marked as found', data: product });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

exports.updateLostProduct = async (req, res) => {
    try {
      const product = await LostProduct.findById(req.params.id);
  
      if (!product) return res.status(404).json({ message: 'Product not found' });
      if (product.user.toString() !== req.userId)
        return res.status(403).json({ message: 'Not authorized to update this product' });
  
      const {
        title,
        description,
        category,
        location,
        dateLost,
        contactInfo,
        type,
      } = req.body;
  
      product.title = title || product.title;
      product.description = description || product.description;
      product.category = category || product.category;
      product.location = location || product.location;
      product.dateLost = dateLost || product.dateLost;
      product.contactInfo = contactInfo || product.contactInfo;
      product.type = type || product.type;
  
      if (req.file) {
        product.image = req.file.filename;
      }
  
      const updatedProduct = await product.save();
      res.status(200).json({ message: 'Product updated', data: updatedProduct });
    } catch (err) {
      res.status(500).json({ message: 'Error updating product', error: err.message });
    }
  };
  
  exports.deleteLostProduct = async (req, res) => {
    try {
      const product = await LostProduct.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      if (product.user.toString() !== req.userId)
        return res.status(403).json({ message: 'Not authorized to delete this product' });
  
      await product.deleteOne();
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
  };