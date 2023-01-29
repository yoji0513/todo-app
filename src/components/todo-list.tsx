import type { RootState } from '../app/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Box, Button, Card, CardBody, Flex, Heading, Input, Link, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Select, Text, useDisclosure } from '@chakra-ui/react'
import { remove } from '../features/todo/todoSlice'

export const TodoList= () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const todo = useSelector((state: RootState) => state.addTodo)
  const dispatch = useDispatch()

  const todoRemove = (id: number) => {
    dispatch(remove(id))
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
              {todo.todoList.filter(todo => todo.status === 'TODO').map(item =>
                <Box key={item.id}>
                  <Link onClick={onOpen}>
                    <Card>
                      <CardBody>
                        <Text mb={'.8rem'}>{item.title}</Text>
                        <Button fontSize={'.8rem'} onClick={() => todoRemove(item.id)}>remove</Button>
                      </CardBody>
                    </Card>
                  </Link>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalCloseButton />
                      <ModalBody>
                        {item.status}
                        {item.title}
                        {item.description}
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </Box>
              )}
              {todo.todoList.filter(todo => todo.status === 'DOING').map(item =>
                <Box key={item.id}>
                  <Link onClick={onOpen}>
                    <Card>
                      <CardBody>
                        <Text mb={'.8rem'}>{item.title}</Text>
                        <Button fontSize={'.8rem'} onClick={() => todoRemove(item.id)}>remove</Button>
                      </CardBody>
                    </Card>
                  </Link>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>{item.status}</Text>
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </Box>
              )}
            </ListItem>
        </List>
      </Flex>
    </>
  );
}
