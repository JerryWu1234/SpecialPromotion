

function initSync(data) {
  const groups = spliceArray(data)
  groups.forEach((item, index) => {
    delayfunc(item, index)
  })
}
function spliceArray(data) {
  let [result, list] = [null, []]
  for (let i = 0; i < data.length; i++) {
    if (i % 20 === 0) {
      result !== null && list.push(result)
      result = []
    }
    result.push([data[i]])
  }
  return list
}
function createDom(item) {
  let node = document.createElement('LI')
  let textnode = document.createTextNode(`<li>${item}</li>`)
  node.appendChild(textnode)
  return node
}
function delayfunc(item, index) {
  for (let i = 0; i < item.length; i++) {
    setTimeout(function() {
      root.appendChild(createDom(item))
    }, 1)
  }
}