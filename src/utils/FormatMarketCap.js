export const formatMarketCap = (value) => {
  if (value >= 1_000_000_000) {
    return "रू " + (value / 1_000_000_000).toFixed(2) + "B"; // Billion
  } else if (value >= 1_000_000) {
    return "रू " + (value / 1_000_000).toFixed(2) + "M"; // Million
  } else if (value >= 1_000) {
    return "रू " + (value / 1_000).toFixed(2) + "K"; // Thousand
  } else {
    return "रू " + value.toLocaleString("ne-NP"); // Normal
  }
};
