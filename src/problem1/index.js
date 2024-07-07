var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }

  const sum = arr.reduce((acc, cur) => acc + cur, 0);

  return sum;
};

var sum_to_n_c = function (n) {
  let s = 0;
  s = (n * (n + 1)) / 2;
  return s;
};

const sum1 = sum_to_n_a(5);
const sum2 = sum_to_n_b(5);
const sum3 = sum_to_n_c(5);

console.log(sum1);
console.log(sum2);
console.log(sum3);
