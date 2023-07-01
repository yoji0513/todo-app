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
  const [selectedItem, setSelectedItem] = useState<number | undefined>(undefined)
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
    setSelectedItem(undefined)
    onClose()
  }

  const todoRemove = (id: number) => {
    dispatch(remove(id))
  }
  
  return (
    <>
      <Heading as={'h2'} size={'md'} mt={'2.4rem'}>TODO一覧</Heading>
        <Flex gap={'2'} mt={'1rem'}>
          <>
            {status.statusList.map((status, index) => {
              return(
                <Box key={index} w={`${listItemWidth}%`}>
                  <Heading as={'h3'} size={'sm'}>{status.status}</Heading>
                  <>
                    {todo.todoList.filter((todo) => todo.status === status.status).map((todoListByStatus) => {
                      return(
                        <List w={`${listItemWidth}%`}>
                          <ListItem mb={'.8rem'}>
                            <Link onClick={() => onOpenSelectedModal(todoListByStatus.id)}>
                              <Card bg={todoListByStatus.judgeTerm ? 'teal.300' : 'white'}>
                                <CardBody>
                                  <Text mb={'.8rem'}>{todoListByStatus.title}</Text>
                                  <Button
                                    fontSize={'.8rem'}
                                    onClick={() => todoRemove(todoListByStatus.id)}
                                  >
                                    削除
                                  </Button>
                                </CardBody>
                              </Card>
                            </Link>
                          </ListItem>
                        </List>
                      )
                    })}
                  </>
                </Box>
              )
            })}
          </>
        </Flex>
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
    </>
  );
}
