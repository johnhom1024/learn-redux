/**
 * 合并和拆分state
 */

let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '前端九部',
    description: '我们都是前端爱好者！'
  }
}

function CounterReducer(state, action) {
  switch (action.type) {
    case 'increase':
      return {
        ...state,
        count: state.count + 1
      }
      break;
    case 'decrease':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}

function InfoReducer(state, action) {
  switch (action.type) {
    case 'set_name':
      return {
        ...state,
        name: action.name
      }
    case 'set_description':
      return {
        ...state,
        description: action.description,
      }
    default:
      return state
  }
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  // 返回合并后的新reducer函数
  return function combination(state = {}, action) {
    // 生成新的state
    const nextState = {}

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action)

      nextState[key] = nextStateForKey
    }

    return nextState;
  }
}

const reducer = combineReducers({
  counter: CounterReducer,
  info: InfoReducer,
})


function createStore (reducer, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(fn) {
    listeners.push(fn);
  }

  function dispatch(action) {
    state = reducer(state, action);

    listeners.forEach(fn => fn());
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
  }
}

let store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
})

store.dispatch({
  type: 'increase'
})

store.dispatch({
  type: 'set_name',
  name: '前端九部2号'
})
