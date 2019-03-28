/**
 * A helper function to format a number with commas
 * @param x number to be converted
 */
export const numberWithCommas = x => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

/**
 * Dictionary that stores handled currencies in ISO format and their long forms
 */
export const currencies = {
  CAD: "Canadian Dollar",
  IDR: "Indonesian Rupiah",
  GBP: "British Pound",
  CHF: "Swiss Franc",
  SGD: "Singaporean Dollar",
  INR: "Indian Rupee",
  MYR: "Malayasian Ringgit",
  JPY: "Japanese Yen",
  KRW: "South Korean Won"
};
