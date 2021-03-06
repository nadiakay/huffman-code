const textBox = document.getElementById('str-in')
const submit = document.getElementById('submit')

const codeDiv = document.getElementById('code')
const treeDiv = document.getElementById('tree')
const dictDiv = document.getElementById('dict')

function doString() {
  codeDiv.innerHTML = ''
  treeDiv.innerHTML = ''
  dictDiv.innerHTML = ''

  const str = textBox.value
  const freqArr = getFrequency(str)
  const tree = makeTree(freqArr)
  treeDiv.appendChild(domTree(tree[0], str.length))

  dict = visitNode(tree[0], '')

  console.log('dict: ', dict)

  dict.forEach((item) => {
    const p = document.createElement('p')
    p.innerHTML = `${item[0]}: ${item[1]}`
    dictDiv.appendChild(p)
  })

  codeDiv.innerHTML = encode(str, dict)
}

function encode(str, dict) {
  let enc = ''
  arr = [...str]
  console.log(dict)
  arr.forEach((sym) => {
    enc = enc + dict.filter((item) => sym === item[0])[0][1]
  })
  console.log(enc)
  return enc
}

function domTree(tree, len) {
  const list = document.createElement('ul')
  const sym = document.createElement('li')
  const freq = document.createElement('li')

  list.className = 'node-body'

  sym.innerHTML = `symbol: ${tree.symbol}`
  freq.innerHTML = `probability: ${(tree.freq / len).toFixed(3)}`
  list.appendChild(sym)
  list.appendChild(freq)
  if (tree.node1) {
    const nodes = document.createElement('ul')
    const node1 = document.createElement('li')
    const node2 = document.createElement('li')

    nodes.style.borderLeft = 'dotted 1px'

    node1.appendChild(domTree(tree.node1, len))
    node2.appendChild(domTree(tree.node2, len))
    nodes.appendChild(node1)
    nodes.appendChild(node2)
    list.appendChild(nodes)
  }
  return list
}

function visitNode(node, prefix) {
  dict = []
  if (node.node1) {
    dict = [...dict, ...visitNode(node.node1, prefix.concat('0'))]
    dict = [...dict, ...visitNode(node.node2, prefix.concat('1'))]
    return dict
  } else {
    return [...dict, [node.symbol, prefix]]
  }
}

function makeTree(arr) {
  console.log('makeTree arr in: ', arr)
  const tree = []
  arr.forEach((item) => tree.push(item))
  let newNode
  while (tree.length > 1) {
    newNode = {
      symbol: tree[tree.length - 1].symbol.concat(tree[tree.length - 2].symbol),
      freq: tree[tree.length - 1].freq + tree[tree.length - 2].freq,
      node1: tree[tree.length - 2],
      node2: tree[tree.length - 1],
    }
    tree.pop()
    tree.pop()
    tree.push(newNode)
    tree.sort((a, b) => b.freq - a.freq)
  }
  console.log('... tree out: ', tree)
  return tree
}

function getFrequency(str) {
  console.log('getFrequency: str in: ', str)
  const freqs = [...str].reduce(
    (freq, sym) => Object.assign(freq, { [sym]: (freq[sym] || 0) + 1 }),
    {}
  )

  let freqArr = []
  Object.entries(freqs).map((item) => {
    freqArr.push({ symbol: item[0], freq: item[1] })
  })
  freqArr.sort((a, b) => b.freq - a.freq)

  console.log('...freqArr out: ', freqArr)
  return freqArr
}

submit.addEventListener('click', doString)
