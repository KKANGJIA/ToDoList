import { createGlobalStyle } from 'styled-components';
import TodoCreate from './components/TodoCreate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';
import { TodoProvider } from './TodoContext';

const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
  }
`;

//프로젝트 모든 곳에서 Todo 관련 context들을 사용할 수 있도록, 
//App에서 TodoProvider를 불러와서 모든 것을 TodoProvider로 감싸준다 
//안감싸면 다른 컴포넌트에서 state를 사용할 수가 없고 콘솔에 찍어도 undefined가 출력되었다
function App() {
  return (
    <TodoProvider>
      <GlobalStyle/>
      <TodoTemplate>
        <TodoHead /> 
        <TodoList />
        <TodoCreate />
      </TodoTemplate> 
    </TodoProvider>
  );
}

export default App;
 