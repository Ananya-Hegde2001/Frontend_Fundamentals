function maxProfit(prices) {
  let min = prices[0], profit = 0;

  for (let price of prices) {
    min = Math.min(min, price);
    profit = Math.max(profit, price - min);
  }
  return profit;
}

console.log(maxProfit([7,1,5,3,6,4]));
