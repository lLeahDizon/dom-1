window.dom = {
  /**
   * 创建一个新的节点
   * @param {*} string 新的节点html内容
   */
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  /**
   * 新增一个弟弟节点
   * @param {*} node
   * @param {*} node2
   */
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  /**
   * 新增一个哥哥节点
   * @param {*} node
   * @param {*} node2
   */
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  /**
   * 新增一个子节点
   * @param {*} parent
   * @param {*} node
   */
  append(parent, node) {
    parent.appendChild(node);
  },
  /**
   * 新增一个父节点
   * @param {*} node
   * @param {*} parent
   */
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  /**
   * 删除节点
   * @param {*} node
   */
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  /**
   * 删除后代
   * @param {*} node
   */
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  /**
   * 读写属性
   * @param {*} node
   * @param {*} name
   * @param {*} value
   */
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  /**
   * 读写文本内容
   * @param {*} node
   * @param {*} string
   */
  text(node, string) {
    //适配不同浏览器
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string; // ie
      } else {
        node.textContent = string; // firefox/chrome
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  /**
   * 读写HTML内容
   * @param {*} node
   * @param {*} string
   */
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
};
