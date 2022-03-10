const inputBox = document.getElementById("str-in");
const submitBtn = document.getElementById("submit");
const output = document.getElementById("out");

function getString() {
  output.innerHTML = "";
  const str = inputBox.value;
  const freqArr = getFrequency(str);
  const tree = makeTree(freqArr);
  let h3 = document.createElement("h1");
  h3.innerHTML = "Binary Tree:";
  output.appendChild(h3);
  output.appendChild(domTree(tree[0], str.length));

  const vals = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.innerHTML = "Dictionary:";
  vals.appendChild(h2);

  dict = visitNode(tree[0], "");
  dict.forEach(item => {
    const p = document.createElement("p");
    p.innerHTML = `${item[0]}: ${item[1]}`;
    vals.appendChild(p);
  });
  output.appendChild(vals);
}

// make function to traverse tree and build binary dictionary

function visitNode(node, prefix) {
  dict = [];
  if (node.node1) {
    dict = [...dict, ...visitNode(node.node1, prefix.concat("0"))];
    dict = [...dict, ...visitNode(node.node2, prefix.concat("1"))];
    return dict;
  } else {
    return [...dict, [node.symbol, prefix]];
  }
}

// clean this up
function domTree(tree, len) {
  const list = document.createElement("ul");
  const symbol = document.createElement("li");
  const freq = document.createElement("li");

  list.style.padding = "10px";
  list.style.border = "solid 1px";
  list.style.margin = "5px";
  list.style.width = "fit-content";

  symbol.innerHTML = `symbol: ${tree.symbol}`;
  console.log(len);
  freq.innerHTML = `probability: ${(tree.freq / len).toFixed(3)}`; // do better
  list.appendChild(symbol);
  list.appendChild(freq);
  if (tree.node1) {
    const nodes = document.createElement("ul");
    const node1 = document.createElement("li");
    const node2 = document.createElement("li");

    nodes.style.borderLeft = "dotted 1px";

    node1.appendChild(domTree(tree.node1, len));
    node2.appendChild(domTree(tree.node2, len));
    nodes.appendChild(node1);
    nodes.appendChild(node2);
    list.appendChild(nodes);
  }
  return list;
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

  let freqArr = [];
  Object.entries(freqs).map(item => {
    freqArr.push({ symbol: item[0], freq: item[1] });
  });
  freqArr.sort((a, b) => b.freq - a.freq);

  return freqArr;
}

submitBtn.addEventListener("click", getString);
