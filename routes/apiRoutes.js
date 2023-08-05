const router = require("express").Router();
const fetch = require("node-fetch");
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);

async function makeGetRequest(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Request error: " + response.status + " " + response.statusText);
    }
    return response.json();
  } catch (err) {
    console.error("Error fetching attractions:", err.message);
    throw err;
  }
}


// fetch tourist attractions from the API based on city name
router.get("/search", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const city = req.query.city;
    const apiUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${apiKey}`;
    const response = await makeGetRequest(apiUrl);
    const attractionsData = response.length > 0 ? response : [];
    res.render("index", { attractions: attractionsData });
  } catch (err) {
    console.error("Error fetching attractions:", err.message);
    res.status(500).send("Error fetching attractions.");
  }
});

module.exports = router;
