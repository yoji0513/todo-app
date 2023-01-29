import { Box, Flex, FormLabel, Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

type TodoListProps = {
  id: number
  todoName: string
  isDone: boolean
}

export const TodoContent= () => {
  const [todoList, setTodoList] = useState<TodoListProps[]>([]);
  const [inputTodo, setInputTodo] = useState<string>('');
  const [id, setId] = useState<number>(0)

  const todoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(event.target.value)
  }

  const TodoId = () => {
    setId(id + 1)
    console.log(id)
  }

  const submit = () => {
    if(!inputTodo) return
    const newTodo: TodoListProps = {
      id: todoList.length,
      todoName: inputTodo,
      isDone: false
    }
    setTodoList([...todoList, newTodo])
    setInputTodo('')
  }
  
  return (
    <>
      <form onClick={submit}>
        <Box>
          <FormLabel>TODO名</FormLabel>
          <Input type={'text'} className={'input'} onChange={todoInput} value={inputTodo} placeholder={'TODOを入力してください。'} />
        </Box>
        <Input type={'button'} className={'button'} value={'追加'} onClick={TodoId}/>
      </form>
      <Heading as={'h2'} size={'md'} mt={'1rem'}>TODO一覧</Heading>
      <Flex gap={'2'} mt={'1rem'}>
        <Box w={'50%'}>
          <Heading as={'h3'} size={'sm'}>TODO</Heading>
        </Box>
        <Box w={'50%'}>
          <Heading as={'h3'} size={'sm'}>DONE</Heading>
        </Box>
      </Flex>
    </>
  );
}
