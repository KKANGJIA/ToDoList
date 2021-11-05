import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true, // task가 완료되었는가?
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: false,
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false,
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false,
  },
];

export const Create = 'CREATE';
export const Toggle = 'TOGGLE';
export const Remover = 'REMOVER';

function todoReducer(state, action) {
  switch(action.type) {
    case Create:
      return state.concat(action.todo);
    case Toggle:
      return state.map(todo => todo.id === action.id ? {...todo, done: !todo.done } : todo );
    case Remover:
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

//state와 dispatch를 context를 통해여 다른 컴포넌트에서 바로 사용할 수 있게해줌으로써
//하나의 context를 만들어서 state와 dispatch를 넣어주는 대신
//두개의 context를 만들어서 따로따로 넣어줌으로써 하나만 필요한 컴포넌트에서 불필요한
//렌더링을 방지하는 효과를 만들 수 있고 사용하는 과정이 편리해지는 장점이 있다.
//context 생성하기 
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
//다음 todo를 추가할 때 부여할 id 값을 생성하기 위한 context
const TodoNextIdContext = createContext();

// 상태를 관리하는 컴포넌트
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5); // 현재 id:4까지 나와있어서 다음은 기본 값을 5로 설정한다
  return (
    //context에서 사용할 값을 지정할때에는 Provider 컴포넌트를 렌더링하고 value를 설정한다
    //그리고 props로 받아온 children 값을 내부에 렌더링한다
    <TodoStateContext.Provider value={state}> 
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider> 
  );
}

// 아래와 같이 컴포넌트에서 각각 생성하는 대신 useContext를 사용하는 커스텀 Hook을 만들어서 내보내준다
export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}

/* context를 다른 컴포넌트에서 사용할 때 두가지 방법 */
// 아래의 두 방법에서 편리함을 위해 차이점이 존재할 뿐 개인의 취향에 따라 사용할 수 있다

// 사용예시: 위처럼 커스텀 훅으로 만든 context를 내보내 바로 컴포넌트에서 사용하기 
// import React from 'react';
// import { useTodoState, useTodoDispatch } from '../TodoContext';

// function Sample() {
//   const state = useTodoState();
//   const dispatch = useTodoDispatch();
//   return <div>Sample</div>;
// }


// 사용 예시: 생성한 context를 내보내서 컴포넌트에서 직접 할당 후에 사용하기
// 이렇게 하면 다른 컴포넌트에서 state 나 dispatch를 사용하고 싶을 때 다음과 같이 할 수 있습니다.
// import React, { useContext } from 'react';
// import { TodoStateContext, TodoDispatchContext } from '../TodoContext';

// function Sample() {
//   const state = useContext(TodoStateContext);
//   const dispatch = useContext(TodoDispatchContext);
//   return <div>Sample</div>;
// }