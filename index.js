const app = require("./src/app.js");
const db = require("./src/db/db.js");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;



app.get("/", (req, res) => {
  res.send("Api is running");
});

db().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => console.log(err));
