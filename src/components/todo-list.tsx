import type { RootState } from '../app/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Box, Button, Card, CardBody, Flex, Heading, Link, List, ListItem, Text, useDisclosure } from '@chakra-ui/react'
import { remove } from '../features/todo/todoSlice'
import { TodoItem } from './todo-item'

export const TodoList= () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const todo = useSelector((state: RootState) => state.addTodo)
  const dispatch = useDispatch()

  const todoRemove = (title: string) => {
    dispatch(remove(title))
  }
  
  return (
    <>
      <Heading as={'h2'} size={'md'} mt={'2.4rem'}>TODO一覧</Heading>
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
            <ListItem mb={'.8rem'}>
              {todo.todoList.map((item, index) =>
                <Box key={index}>
                  <Link onClick={onOpen}>
                    <Card>
                      <CardBody>
                        <Text mb={'.8rem'}>{item.title}</Text>
                        <Button fontSize={'.8rem'} onClick={() => todoRemove(item.title)}>remove</Button>
                      </CardBody>
                    </Card>
                  </Link>
                  <TodoItem
                    id={item.id}
                    isOpen={isOpen}
                    onClose={onClose}
                    status={item.status}
                    title={item.title}
                    description={item.description}
                  />
                </Box>
              )}
            </ListItem>
        </List>
      </Flex>
    </>
  );
}
