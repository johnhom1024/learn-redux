/**
 * 实现一个简易的redux，加上约束条件
 */

/**
 * 
 * @param {*} state 
 * @param {object} action 这里action一定要带上type，代表改变state的目的或者类型
 */
function plan(state, action) {
  switch (action.type) {
    case 'increase':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'decrease':
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      return state;
  }
}


function createStore (plan, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(fn) {
    listeners.push(fn);
  }

  function changeState(action) {
    debugger;
    state = plan(state, action);

    listeners.forEach(fn => fn());
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    changeState,
    getState,
  }
}

const store = new createStore(plan, {
  count: 1
})

store.subscribe(() => {
  const state = store.getState();
  console.log('----------johnhomLogDebug state', state)
})

store.changeState({ type: 'increase' }) 

store.changeState({ type: 'decrease' })
 
/**
 * 在看到了这里，我们可以把相关的函数名换一下名称
 * plan叫做reducer
 * changeState叫做dispatch
 */