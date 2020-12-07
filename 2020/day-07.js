let input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

input = input.split('\n');

let allBags = new Map();
input.forEach((line) => {
  let bag = bagParse(line);
  allBags.set(bag.bag, bag.contains);
});

// part 1
console.log(Array.from(allBags.keys()).filter((bag) => contains(bag, 'shiny gold')).length);

// part 2
console.log(count(allBags.get('shiny gold')));

let a = [];
console.log(allBags['shiny gold']);

function count(inputbags) {
  return [...inputbags].reduce((prev, bag) => {
    return prev + bag[1] * (1 + count(allBags.get(bag[0])));
  }, 0);
}

function contains(inputbag, color) {
  if (inputbag == color) return;
  if (!allBags.get(inputbag)) return;
  for (bag of allBags.get(inputbag).keys()) {
    if (bag == color) return true;
    let contain = allBags.get(bag);
    if (contain) {
      for (bag2 of contain.keys()) {
        if (bag2 == color || contains(bag2, color)) return true;
      }
    }
  }
  return false;
}

function bagParse(line) {
  line = line.split(' bags contain ');
  let bag = line[0];
  let contains = new Map();
  if (!line[1].match(/no other bags/)) {
    let colors = line[1];
    colors = colors.replace('.', '');
    colors = colors.split(/, /);
    colors.forEach((element) => {
      element = element.replace(/ bags?/, '');
      let num = parseInt(element.charAt(0));
      let color = element.substr(2);
      contains.set(color, num);
    });
  }
  return { contains, bag };
}
