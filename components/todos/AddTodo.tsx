import { Button, Flex, Grid, Input } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import todosStore from './store/todosStore';

const AddTodo = () => {
    return (
        <div>
            <Flex pt={2}>
            <Input placeholder='New Todo'
            position={'static'}
            mx={2}
            value={todosStore.todo.text} 
            onChange={(evt) => (todosStore.todo.text = evt.target.value)}
            />
            <Button 
            position={'static'}
            onClick={() => {
                if(todosStore.todo.text === ""){
                    return alert("Todo List Tidak Boleh Di Isi Kosong!");
                }
                return todosStore.addTodo();
            }}
                >Add Todo</Button>
            </Flex>
        </div>
    );
};

export default observer(AddTodo);