import type { RootState } from '../app/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Box, Button, Card, CardBody, Flex, Heading, Link, List, ListItem, Text, useDisclosure } from '@chakra-ui/react'
import { remove } from '../features/todo/todoSlice'
import { TodoItem } from './todo-item'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export const TodoList= () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const todo = useSelector((state: RootState) => state.addTodo)
  const status = useSelector((state: RootState) => state.addStatus)
  const dispatch = useDispatch()
  const [selectedItem, setSelectedItem] = useState<number>(1)
  const [today, setToday] = useState<string>('')
  const listItemWidth = Math.floor(100 / status.statusList.length)
  useEffect(() => {
    const today = new Date();
    const formatToday = format(today, 'yyyy-MM-dd', {
      locale: ja,
    })
    setToday(formatToday)
  }, [])

  const onOpenSelectedModal = (id: number) => {
    setSelectedItem(id)
    onOpen()
  }

  const onCloseSelectedModal = () => {
    setSelectedItem(0)
    onClose()
  }

  const todoRemove = (title: string) => {
    dispatch(remove(title))
  }
  
  return (
    <>
      <Heading as={'h2'} size={'md'} mt={'2.4rem'}>TODO一覧</Heading>
      <Flex gap={'2'} mt={'1rem'}>
        <>
        {status.statusList.map((statusItem, index) => {
          return(
            <Box key={index} width={`${listItemWidth}%`}>
              <Heading as={'h3'} size={'sm'}>{statusItem.status}</Heading>
            </Box>
          )
        })}
        </>
      </Flex>
      <Flex gap={'2'} mt={'1rem'}>
          <List w={'50%'}>
              {todo.todoList.map((item, index) =>
                <ListItem key={index} mb={'.8rem'}>
                    <Link onClick={() => onOpenSelectedModal(item.id)}>
                      <Card bg={item.judgeTerm ? 'teal.300' : 'white'}>
                        <CardBody>
                          <Text mb={'.8rem'}>{item.title}</Text>
                          <Button fontSize={'.8rem'} onClick={() => todoRemove(item.title)}>remove</Button>
                        </CardBody>
                      </Card>
                    </Link>
                  </ListItem>
                )}
          </List>
          <>
          {todo.todoList.filter(todo => todo.id === selectedItem).map((todoItem, index) => {
            return(
              <TodoItem
                key={index}
                id={todoItem.id}
                selectedItem={selectedItem}
                isOpen={isOpen}
                onCloseSelectedModal={onCloseSelectedModal}
                status={todoItem.status}
                title={todoItem.title}
                description={todoItem.description}
                date={todoItem.date}
                today={today}
              />
            )
          })}
          </>
        </Flex>
    </>
  );
}
