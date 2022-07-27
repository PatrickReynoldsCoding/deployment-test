import Todolist from "./Todolist";
import React, { useState, useRef, useEffect } from "react";
// import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, routes, Route } from "react-router-dom";

// apis
import { getData } from "./functions/getData";
import { addTodo } from "./functions/addTodo";
import { updateChecked } from "./functions/updatechecked";
import { deleteTodos } from "./functions/deleteTodos";

function App() {
  const [todos, setTodos] = useState([]); //object destructoring
  const todoNameRef = useRef();

  // when it first loads it gets the db todos
  useEffect(() => {
    getData() // api function
      .then((res) => setTodos(res))
      .catch((err) => console.log(err));
  }, [todos]); // this is the dependancy array. it means the function will run everytime the todos array is changed

  // add useEffect here to save todos to DB when there is any change.

  const handleAddTodo = async (e) => {
    //adds todo from input
    const message = todoNameRef.current.value;
    if (message === "") return;
    const newTodo = { message: message, complete: false };
    setTodos((todos) => {
      return [...todos, newTodo];
    });
    //add newTodo to DB
    addTodo(newTodo);

    todoNameRef.current.value = null; //wipes textbox
    // saveTodosToDB
    console.log(todos);
  };

  //update the complete props in the todo via checkbox and upload to db
  const toggleComplete = (id) => {
    // patch
    updateChecked(id);
  };

  // }

  return (
    <>
      <Todolist todos={todos} toggleComplete={toggleComplete} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button>Clear Complete</button>
      <button onClick={deleteTodos}>Delete all!!!</button>
      <div>{todos.length} left to do </div>
    </>
  );
}

export default App;
