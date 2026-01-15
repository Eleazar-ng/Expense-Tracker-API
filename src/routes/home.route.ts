
import express from "express";

const route = express.Router();

route.get("/", (req,res) => {
  res.status(200).json({
    message:"Expense-Tracker-API version 1 !********"
    });
});

export { route as Home };