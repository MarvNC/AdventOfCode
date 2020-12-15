let input = `16,12,1,0,15,7,11`;

input = input.split(',').map((elem) => parseInt(elem));

// key: num, value: array of the number's indexes
let map = new Map();

input.forEach((val, index) => {
  if (map.has(val)) map.get(val).push(index);
  else map.set(val, [index]);
});

function calculateAt(num, input) {
  let i = input.length;
  let lastNum = input[input.length - 1];

  while (i < num) {
    let diff = findDiff(map.get(lastNum));
    if (map.has(diff)) {
      map.get(diff).push(i);
    } else map.set(diff, [i]);
    lastNum = diff;
    i++;
  }
  return lastNum;
}

function findDiff(arr) {
  if (arr.length >= 2) {
    return arr[arr.length - 1] - arr[arr.length - 2];
  } else return 0;
}

// let p1 = calculateAt(2020, input);
// console.log(p1);

let p2 = calculateAt(30000000, input);
console.log(p2);
