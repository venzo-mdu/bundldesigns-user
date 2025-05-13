export function amountDecimal(amount) {
  return formatSAR(amount);
}

function formatSAR(amount) {
  const formatted = new Intl.NumberFormat().format(amount);
  return formatted;
}
