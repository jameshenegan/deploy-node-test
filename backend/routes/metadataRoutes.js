const express = require("express");
const router = express.Router();

const { loadCsvFile } = require("./helpers/loadCsvFile");

const {
  getMetadataFieldsWithVarDoi,
} = require("./helpers/getMetadataFieldsWithVarDoi");

const { getArrayOfVarDois } = require("./helpers/getArrayOfVarDois");

const metadata = loadCsvFile("backend/data/metadata-from-python.csv");

const searchableFields = require("../data/searchableFields.json");
const columnsOnMainTable = require("../data/columnsOnMainTable.json");
const categoricalColumns = require("../data/categoricalColumns.json");

const listOfCategoricalColumns = categoricalColumns.map(
  (d) => d["categoricalColumn"]
);

const varDoi = "var_doi";

const rawMetadataForCategoricalColumns = getMetadataFieldsWithVarDoi(
  listOfCategoricalColumns,
  metadata,
  varDoi
);

const searchableMetadata = getMetadataFieldsWithVarDoi(
  searchableFields,
  metadata,
  varDoi
);

const metadataForMainTable = getMetadataFieldsWithVarDoi(
  columnsOnMainTable,
  metadata,
  varDoi
);

const arrayOfVarDois = getArrayOfVarDois(metadata, varDoi);

router.get("/records", (req, res) => {
  res.status(200).json(metadata);
});

router.get("/arrayOfVarDois", (req, res) => {
  res.status(200).json(arrayOfVarDois);
});

router.get("/searchableMetadata", (req, res) => {
  res.status(200).json(searchableMetadata);
});

router.get("/metadataForMainTable", (req, res) => {
  res.status(200).json(metadataForMainTable);
});

router.get("/categoricalColumns", (req, res) => {
  res.status(200).json(categoricalColumns);
});

router.get("/rawMetadataForCategoricalColumns", (req, res) => {
  res.status(200).json(rawMetadataForCategoricalColumns);
});

module.exports = router;
