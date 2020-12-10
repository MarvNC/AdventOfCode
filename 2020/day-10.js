let input = `149
87
67
45
76
29
107
88
4
11
118
160
20
115
130
91
144
152
33
94
53
148
138
47
104
121
112
116
99
105
34
14
44
137
52
2
65
141
140
86
84
81
124
62
15
68
147
27
106
28
69
163
97
111
162
17
159
122
156
127
46
35
128
123
48
38
129
161
3
24
60
58
155
22
55
75
16
8
78
134
30
61
72
54
41
1
59
101
10
85
139
9
98
21
108
117
131
66
23
77
7
100
51`;

input = input.split('\n');

input = input.map((elem) => parseInt(elem));

let device = Math.max(...input) + 3;

function findChain(input, device) {
  let sorted = [...input];
  sorted.unshift(0);
  sorted.push(device);
  sorted = sorted.sort((a, b) => a - b);
  let differences = sorted.map((elem, index) => elem - sorted[index - 1]);
  differences.shift();
  return differences;
}

function diffStats(input) {
  let stats = {};
  input.forEach((element) => {
    if (stats[element]) stats[element]++;
    else stats[element] = 1;
  });
  return stats;
}

function findArrangements(input, device) {
  let sorted = [...input];
  sorted.unshift(0);
  sorted.push(device);
  sorted = sorted.sort((a, b) => a - b);
  let ways = new Array(device);
  ways.fill(0);
  ways[0]++;
  ways.forEach((elem, index) => {
    for (let i = -3; i < 0; i++) {
      if (sorted.includes(index + i)) {
        ways[index] += ways[index + i];
      }
    }
  });
  return ways[ways.length - 3];
}

let stats = diffStats(findChain(input, device));
console.log(stats[1] * stats[3]);

console.log(findArrangements(input, device));
