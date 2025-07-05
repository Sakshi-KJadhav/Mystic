const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(
  cors({
    origin: "https://yourmystic.vercel.app", // your actual frontend domain
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const outfits = JSON.parse(fs.readFileSync("./outfits.json", "utf8"));

function getBodyShape({ bust, waist, shoulders, hips }) {
  const hipWaistRatio = hips / waist;
  const bustHipsDiff = Math.abs(bust - hips);
  const shoulderHipsDiff = Math.abs(shoulders - hips);

  if (hipWaistRatio > 1.25 && hips > bust && hips > shoulders) return "Pear";
  if (bustHipsDiff < 5 && shoulderHipsDiff < 5 && hipWaistRatio < 1.25) return "Hourglass";
  if (bust > hips && bust > waist && bust > shoulders) return "Apple";
  return "Rectangle";
}

app.post("/api/recommendations", (req, res) => {
  const { bust, waist, shoulders, hips } = req.body;

  const shape = getBodyShape({ bust, waist, shoulders, hips });
  const recommendations = outfits[shape];

  if (!recommendations) {
    return res.status(400).json({ error: "Could not determine body shape" });
  }

  // Convert recommendations object to array for frontend
  const recommendationsArray = Object.entries(recommendations).map(([category, outfits]) => ({
    category,
    outfits
  }));

  res.json({ shape, recommendations: recommendationsArray });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
