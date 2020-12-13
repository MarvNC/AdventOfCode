let input = `1008169
29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,37,x,x,x,x,x,653,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,17,x,x,x,x,x,23,x,x,x,x,x,x,x,823,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19`;

input = input.split('\n');

let startTime = parseInt(input[0]);

input[1] = input[1].split(',');

function earliestDeparture(departTime, buses) {
  let time = Number.MAX_SAFE_INTEGER;
  let busID;
  buses.forEach((bus) => {
    if (bus == 'x') return;
    let nearest = nearestTime(departTime, parseInt(bus));
    if (nearest < time) {
      busID = bus;
      time = nearest;
    }
  });
  return { busID, time, timeDiff: time - departTime };
}

function nearestTime(time, busID) {
  return Math.ceil(time / busID) * busID;
}

// working for all test cases but not actual input
function consecutive(schedule, startFrom) {
  let pass = false;
  let first = parseInt(schedule[0]);
  let i = nearestTime(startFrom, first);
  do {
    i += first;
    pass = schedule.every((bus, index) => {
      if (bus == 'x') return true;
      return nearestTime(i, parseInt(bus)) - i == index;
    });
  } while (!pass);
  return i;
}

// part1
let earliest = earliestDeparture(startTime, input[1]);
console.log(earliest.busID * earliest.timeDiff);

let consec = consecutive(input[1], 100000000000000);
console.log(consec);