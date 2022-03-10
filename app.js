const inputBox = document.getElementById("str-in");
const submitBtn = document.getElementById("submit");
const output = document.getElementById("out");

function getString() {
  const str = inputBox.value;
  const freqArr = getFrequency(str);
  console.log(freqArr);
  const tree = makeTree(freqArr);
  console.log(tree);
  output.innerHTML = tree;
}

function makeTree(arr) {
  const tree = [];
  arr.forEach(item => tree.push(item));
  let newNode;
  while (tree.length > 1) {
    newNode = {
      symbol: tree[tree.length - 1].symbol.concat(tree[tree.length - 2].symbol),
      freq: tree[tree.length - 1].freq + tree[tree.length - 2].freq,
      node1: tree[tree.length - 2],
      node2: tree[tree.length - 1]
    };
    tree.pop();
    tree.pop();
    tree.push(newNode);
    tree.sort((a, b) => b.freq - a.freq);
  }
  return tree;
}

function getFrequency(str) {
  const freqs = [...str].reduce(
    (freq, sym) => Object.assign(freq, { [sym]: (freq[sym] || 0) + 1 }),
    {}
  );

  //const freqArr = Object.entries(freqs).sort((a, b) => b[1] - a[1]);

  let freqArr = [];
  Object.entries(freqs).map(item => {
    freqArr.push({ symbol: item[0], freq: item[1] });
  });
  freqArr.sort((a, b) => b.freq - a.freq);

  return freqArr;
}

submitBtn.addEventListener("click", getString);
