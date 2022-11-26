/**
 * 实现一个redux，并且封装订阅发布机制和改动的
 */
function createStore(initState) {
  let state = initState;
  listeners = [];

  const subscribe = (fn) => {
    listeners.push(fn);
  }

  const changeState = (newState) => {
    state = newState;
    listeners.forEach(fn => fn())
  }

  const getState = () => {
    return state;
  }

  return {
    subscribe,
    changeState,
    getState,
  }
}


// 用来管理多个对象

const store = new createStore({
  info: {
    name: 'johnhom',
    age: 28
  },
  work: {
    company: 'frontend engineer',
  }
})

store.subscribe(() => {
  const state = store.getState();
  console.log(`我的名字叫${state.info.name}，今年${state.info.age}`);
})

store.subscribe(() => {
  const state = store.getState();

  console.log(`工作是${state.work.company}`);
})

store.changeState({
  ...store.getState(),
  info: {
    name: 'johnhom',
    age: 29
  }
});

store.changeState({
  ...store.getState(),
  work: {
    company: 'none'
  }
})