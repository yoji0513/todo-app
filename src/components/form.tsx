import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { add } from '../features/todo/todoSlice'

type TodoListProps = {
  id: number
  title: string
  description: string
  status: string
}

export const Form= () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const todoId = () => {
    setId(id + 1)
  }

  const submit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    if(!description) return
    const newTodo: TodoListProps = {
      id: id,
      title: title,
      description: description,
      status: status
    }
    setTitle('')
    setDescription('')
    setStatus('')
    dispatch(add(newTodo))
  }
  
  return (
    <>
      <Button onClick={onOpen}>TODOを追加する</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ModalHeader pl={0}>TODOを追加</ModalHeader>
              <FormControl mb={'.8rem'}>
                <FormLabel>ステータス</FormLabel>
                <Select placeholder={'ステータスを選んでください。'} value={status} onChange={e => setStatus(e.target.value)}>
                  <option value='TODO'>TODO</option>
                  <option value='DOING'>DOING</option>
                  <option value='DONE'>DONE</option>
                </Select>
              </FormControl>
              <FormControl mb={'.8rem'}>
                <FormLabel>TODO名</FormLabel>
                <Input type={'text'} value={title} onChange={e => setTitle(e.target.value)} placeholder={'TODO名を入力してください。'} />
              </FormControl>
              <FormControl mb={'.8rem'}>
                <FormLabel>内容</FormLabel>
                <Input type={'text'} value={description} onChange={e => setDescription(e.target.value)} placeholder={'TODOの内容入力してください。'} />
              </FormControl>
              <Button
                colorScheme={'teal'}
                mt={'.8rem'}
                onClick={(e) => {
                  todoId()
                  submit(e)
                  onClose()
                }}
              >
                追加
              </Button>
          </ModalBody>
        </ModalContent>
      </Modal>      
    </>
  );
}
