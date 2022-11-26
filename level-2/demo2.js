/**
 * state的拆分和合并
 */

let initState = {
  count: 0
}

function counterReducer(state, action) {
  // 注意：如果state没有初始值，那就给他初始值！！
  if (!state) {
    state = initState;
  }

  switch (action.type) {
    case 'increase':
      return {
        count: state.count + 1
      }
    default:
      return state;
  }
}

const createStore = function (reducer, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(fn => fn())
  }

  function getState() {
    return state;
  }

  dispatch({ type: Symbol() })

  return {
    subscribe,
    dispatch,
    getState,
  }
}

const store = createStore(counterReducer);
console.dir(store.getState());