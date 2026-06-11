const app = require("./src/app.js");
const dotenv = require("dotenv");

dotenv.config();



app.get("/", (req, res) => {
  res.send("Api is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
