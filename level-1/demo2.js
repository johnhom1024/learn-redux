/**
 * 实现一个简易的redux，带上订阅发布机制
 */

let state = {
  count: 1
}

let listeners = [];

// 订阅消息
function subscribe(fn) {
  listeners.push(fn);
}

function changeCount(count) {
  state.count = count;
  listeners.forEach(fn => fn())
}

function log() {
  console.log('----------johnhomLogDebug state.count', state.count);
}

function log1() {
  console.log(`${state.count}people`);
}

subscribe(log);
subscribe(log1);

changeCount(2);

// 现在有两个新的问题摆在我们面前

// 这个状态管理器只能管理 count，不通用
