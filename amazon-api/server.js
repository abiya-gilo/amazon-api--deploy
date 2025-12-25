import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_KEY);

// ✅ Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Amazon API is running" });
});

// ✅ Stripe Payment Intent
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  if (!total || total <= 0) {
    return res.status(400).json({ message: "Total must be greater than 0" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      message: "Stripe error",
      error: error.message,
    });
  }
});

// ✅ Start server
app.listen(5001, () => console.log("✅ Amazon API running on port 5001"));
