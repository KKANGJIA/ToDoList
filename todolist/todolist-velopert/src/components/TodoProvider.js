import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false
  }
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

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// 우리가 만든 useTodoState, useTodoDispatch, useTodoNextId Hook 을 사용하려면, 
// 해당 컴포넌트가 TodoProvider 컴포넌트 내부에 렌더링되어 있어야 합니다 
// (예: App 컴포넌트에서 모든 내용을 TodoProvider 로 감싸기). 
// 만약 TodoProvider 로 감싸져있지 않다면 에러를 발생시키도록 커스텀 Hook을 작성합니다

// 꼭 이렇게 해줄 필요는 없지만, 
// Context 사용을 위한 커스텀 Hook 을 만들 때 이렇게 에러 처리를 해준다면, 
// 나중에 실수를 하게 됐을 때 문제점을 빨리 발견 할 수 있습니다.
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}