import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connectToDatabase } from '../lib/db.js';
import User from '../models/User.js'; 
import Product from '../models/Product.js';
dotenv.config();

const router = express.Router();


const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


const requireAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

router.post('/register', async (req, res) => {
  const { username, email, password, role = 'user' } = req.body;
  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_KEY,
      { expiresIn: '3h' }
    );

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


router.get('/home', verifyToken, async (req, res) => {
  try {
    await connectToDatabase();

    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});


router.get('/admin-only', verifyToken, requireAdmin, async (req, res) => {
  res.status(200).json({ message: "Welcome Admin!" });
});

router.post('/products', verifyToken, requireAdmin, async (req, res) => {
  try {
    await connectToDatabase();
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/dashproducts', verifyToken, async (req, res) => {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





router.patch('/image', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { productId, image } = req.body;

    if (!productId || !image) {
      return res.status(400).json({ error: "Product ID and image URL required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { image },
      { new: true, select: 'image' }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Image update error:", err);
    return res.status(500).json({ error: "Failed to update product image" });
  }
});

export default router;
