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
  /**
   * 修改style
   * @param {*} node
   * @param {*} name
   * @param {*} value
   */
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'border', '1px solid red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "String") {
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div, {color: 'red'})
        for (const key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },
  /**
   * 修改class
   */
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  /**
   * 添加事件监听
   * @param {*} node
   * @param {*} eventName
   * @param {*} fn
   */
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  /**
   * 移出事件监听
   * @param {*} node
   * @param {*} eventName
   * @param {*} fn
   */
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  /**
   * 获取标签
   * @param {*} selector
   * @param {*} scope
   */
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  /**
   * 获取父元素
   * @param {*} node
   */
  parent(node) {
    return node.parentNode;
  },
  /**
   * 获取子元素
   * @param {*} node
   */
  children(node) {
    return node.children;
  },
  /**
   * 获取兄弟元素
   * @param {*} node
   */
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  /**
   * 获取弟弟元素
   * @param {*} node
   */
  next(node) {
    let x = node.nextSibling;
    while (x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  /**
   * 获取哥哥元素
   * @param {*} node
   */
  previous(node) {
    let x = node.previousSibling;
    while (x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  /**
   * 遍历所有节点
   * @param {*} node
   * @param {*} fn
   */
  each(nodes, fn) {},
  index(node) {},
};
