const express = require('express');
const router = express.Router();
const {
  createLostProduct,
  getAllLostProducts,
  getLostProductById,
  markAsFound,
  updateLostProduct,
  deleteLostProduct
} = require('../controllers/lostproductcontroller');

const authMiddleware = require('../middlewares/authmiddleware');
const upload = require('../middlewares/fileupload');

// Public Routes
router.get('/', getAllLostProducts);
router.get('/:id', getLostProductById);

// Protected Routes
router.post('/', authMiddleware, upload.single('image'), createLostProduct);
router.put('/:id', authMiddleware, upload.single('image'), updateLostProduct);
router.delete('/:id', authMiddleware, deleteLostProduct);
router.patch('/:id/found', authMiddleware, markAsFound); // mark as found
// You can also use PUT for /found if needed
// router.put('/:id/found', authMiddleware, markAsFound);

module.exports = router;