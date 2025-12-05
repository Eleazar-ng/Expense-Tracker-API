
import express from "express";
import "dotenv/config"

const server = express();
const PORT = process.env.PORT || 8084;

// Start server
server.listen(PORT, (err)=> {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`\nExpense-Tracker API server running on http://localhost:${PORT}`);
})