import React from 'react';
import AddTodo from '../../components/todos/AddTodo';
import TodoList from '../../components/todos/TodoList';

const TodosIndex = () => {
    return (
        <>
         <TodoList/>
         <AddTodo/>
        </>
    );
};

export default TodosIndex;