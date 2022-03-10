export const moveChar = (keys) => {
  
  const asArray = Object.entries(keys);

  const filtered = asArray.filter(([key, value]) => value === true);
  let filteredObj = {};
  filtered.forEach((item) => {
    filteredObj[item[0]] = item[1];
  });
  console.log("keys in charMove", filteredObj);
};
