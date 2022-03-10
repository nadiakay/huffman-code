const inputBox = document.getElementById("str-in");
const submitBtn = document.getElementById("submit");

function getString() {
  const str = inputBox.value;
  const freqArr = getFrequency(str);
  console.log(freqArr);
  const tree = makeTree(freqArr);
  console.log(tree);
}

function makeTree(arr) {
  const tree = [];
  arr.forEach(item => tree.push(item));
  let newNode;
  while (tree.length > 1) {
    newNode = [];
    newNode.push(
      tree[tree.length - 1][0].concat(tree[tree.length - 2][0]),
      tree[tree.length - 1][1] + tree[tree.length - 2][1],
      tree[tree.length - 2],
      tree[tree.length - 1]
    );
    tree.pop();
    tree.pop();
    tree.push(newNode);
    tree.sort((a, b) => b[1] - a[1]);
  }
  return tree;
}

function getFrequency(str) {
  const freqs = [...str].reduce(
    (freq, sym) => Object.assign(freq, { [sym]: (freq[sym] || 0) + 1 }),
    {}
  );

  const freqArr = Object.entries(freqs).sort((a, b) => b[1] - a[1]);

  console.log(freqArr);
  return freqArr;
}

submitBtn.addEventListener("click", getString);
