import { Button, Checkbox, Flex, Heading, Input } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import todosStore from './store/todosStore'; 
import { ITodoModel } from '../../imodels/ITodoModel';
function TodoListItems(){
    return (
        <>
            {todosStore.todosList.map((todo: ITodoModel)=> (
                <Flex pt={2} key={todo.id} >
                    <Checkbox position={'static'} />
                    <Input position={'static'} mx={2} value={todo.text} onChange={(evt) => DOMRectReadOnly}/>
                    <Button position={'static'} onClick={() => todosStore.deleteTodo(todo.id) } >Delete</Button>
                </Flex>
            ))}
        </>
    );
};

const TodoListObserver = observer(TodoListItems);

function TodoList(){
    return (
        <>
        <Heading>Todo List</Heading>
        <TodoListObserver/>
        </>
    );
}

export default TodoList;