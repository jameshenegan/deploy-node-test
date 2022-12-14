const express = require("express");
const router = express.Router();

const { loadCsvFile } = require("./helpers/loadCsvFile");
const { getColumnsFromData } = require("./helpers/getColumnsFromData");
const { getColumnFromData } = require("./helpers/getColumnFromData");

// Load the CSV file of data into memory
const data = loadCsvFile("backend/data/example-generated-data.csv");
const metadata = loadCsvFile("backend/data/metadata-from-python.csv");

// Test the endpoint
router.post("/getSelectedVariables", (req, res) => {
  const listOfVarDoisTokep = req.body;
  const filteredMetadata = metadata.filter((d) =>
    listOfVarDoisTokep.includes(d["var_doi"])
  );
  const varNames = filteredMetadata.map((d) => d["var_name"]);

  const selectedColumns = getColumnsFromData(varNames, data);
  res.status(200).json(selectedColumns);
});

// Test the endpoint
router.get("/:varName", (req, res) => {
  const varName = req.params.varName;
  const column = getColumnFromData(varName, data);
  res.status(200).json(column);
});

module.exports = router;
