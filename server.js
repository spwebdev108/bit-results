const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
const PORT = 5000;

// MongoDB Atlas connection string
const uri = process.env.ATLASDB_URI;
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

// Search endpoint
app.get("/search", async (req, res) => {
  const searchQuery = req.query.q || "";
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("res");

    // Perform a text search
    const results = await collection
      .find({ $text: { $search: searchQuery } })
      .toArray();

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error performing search");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
