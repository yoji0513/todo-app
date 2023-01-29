import { Box, Button, Checkbox, Flex, FormLabel, Heading, Input, List, ListItem } from '@chakra-ui/react';
import React, { useState } from 'react';

type TodoListProps = {
  id: number
  todoName: string
  isDone: boolean
}

export const TodoContent= () => {
  const [todoList, setTodoList] = useState<TodoListProps[]>([]);
  const [inputTodo, setInputTodo] = useState<string>('');

  const todoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(event.target.value)
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

  const remove = (id: number) => {
    setTodoList(todoList.filter(todo => todo.id !== id))
  }

  const checkedSubmit = (id: number, shouldDone: boolean) => {
    const newTodoList = todoList.map(todo => todo.id === id ? {...todo, isDone: shouldDone} : todo)
    setTodoList(newTodoList)
  }
  
  return (
    <>
      <form onClick={submit}>
        <Box>
          <FormLabel>TODO名</FormLabel>
          <Input type={'text'} className={'input'} onChange={todoInput} value={inputTodo} placeholder={'TODOを入力してください。'} />
        </Box>
        <Input type={'button'} className={'button'} value={'追加'} />
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
      <Flex gap={'2'} mt={'1rem'}>
        <List w={'50%'}>
          {todoList.filter((todo) => !todo.isDone).map((item) => (
            <ListItem key={item.id} mb={'.8rem'}>
              <Box as={'span'} display={'flex'} alignItems={'center'} gap={'1rem'}>
                <Checkbox onChange={() => checkedSubmit(item.id, true)}/>
                {item.todoName}
                <Button fontSize={'.8rem'} onClick={() => remove(item.id)}>remove</Button>
              </Box>
            </ListItem>
          ))}
        </List>
        <List w={'50%'}>
          {todoList.filter((todo) => todo.isDone).map((item) => (
            <ListItem key={item.id} mb={'.8rem'}>
              <Box as={'span'} display={'flex'} alignItems={'center'} gap={'1rem'}>
                <Checkbox defaultChecked onChange={() => checkedSubmit(item.id, false)}/>
                {item.todoName}
                <Button fontSize={'.8rem'} onClick={() => remove(item.id)}>remove</Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Flex>
    </>
  );
}
