import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Input, Select, FormControl, FormLabel } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { change } from '../features/todo/todoSlice'
import { useForm, SubmitHandler } from "react-hook-form";
import { TodoListProps } from './form';

type TodoItemProps = {
  isOpen: boolean
  onClose: () => void
  id: number
  status: string
  title: string
  description: string
}

export const TodoItem= ({ isOpen, onClose, id, status, title, description}: TodoItemProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<TodoListProps>();
  const onChangeSubmit: SubmitHandler<TodoListProps> = data => {
    const changeTodo = {
      id: id,
      status: data.status,
      title: data.title,
      description: data.description,
    }
    dispatch(change(changeTodo))
  };
  const optionList = ['TODO', 'DOING', 'DONE']

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onChangeSubmit)}>
              <FormControl mb={'.8rem'}>
                <FormLabel>ステータス</FormLabel>
                <Select placeholder={'ステータスを選んでください。'} defaultValue={status} {...register('status')} >
                  {optionList.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>
                  })}
                </Select>
              </FormControl>
              <FormControl mb={'.8rem'}>
                <FormLabel>TODO名</FormLabel>
                <Input defaultValue={title} {...register('title')} />
              </FormControl>
              <FormControl mb={'.8rem'}>
                <FormLabel>内容</FormLabel>
                <Input defaultValue={description} {...register('description')} />
              </FormControl>
              <Button type={'submit'} onClick={onClose}>変更する</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
