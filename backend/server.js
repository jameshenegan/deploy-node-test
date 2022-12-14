const express = require("express");

const app = express();
const port = 9000;

app.use(express.json());

app.use("/api/data", require("./routes/dataRoutes"));
app.use("/api/metadata", require("./routes/metadataRoutes"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
