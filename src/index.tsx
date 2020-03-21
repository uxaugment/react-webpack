import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

// types used to reference other types
type FormElem = React.FormEvent<HTMLFormElement>;

// interface used to create new type
interface ITodo {
  text: string;
  complete: boolean;
}

// You can extend interfaces
// interface ITodo2 extends ITodo {
//   tags: string[]
// }

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text: value, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]; //can't do = todos;
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    // [0,1,2,3].splice(2,1), returns [3], array = [0,1,2]
    newTodos.splice(index, 1)
    setTodos(newTodos);
  }

  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>

      <section>
        {todos.map((todo: ITodo, index: number) => {
          return (
            <Fragment key={index}>
              <div style={{textDecoration: todo.complete ? 'line-through': ''}}>{todo.text}</div>
              <button type="button" onClick={() => completeTodo(index)}>
                { !todo.complete ? 'Incomplete' : 'Complete'}
              </button>
              <button type='button' onClick={() => removeTodo(index)}>X</button>
            </Fragment>
          );
        })}
      </section>
    </Fragment>
  );
}

const root = document.getElementById('app-root');
ReactDOM.render(<App />, root);
