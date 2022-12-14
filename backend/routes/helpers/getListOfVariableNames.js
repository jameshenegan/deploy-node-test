const getListOfVariableNames = (metadata) => {
  const listOfVariableNames = metadata.map((d) => d["var_name"]);
  return listOfVariableNames;
};

module.exports = { getListOfVariableNames };
