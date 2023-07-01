import { useState } from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Input, Select, FormControl, FormLabel } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { change } from '../features/todo/todoSlice'
import { useForm, SubmitHandler } from "react-hook-form";
import { RootState } from '../app/store';

type TodoItemProps = {
  isOpen: boolean
  onCloseSelectedModal: () => void
  id: number
  status: string
  title: string
  description: string
  date: string
  today: string
  selectedItem: number | undefined
}

export type SubmitTodoItemProps = {
  id: number
  title: string
  description: string
  status: string
  date: string
  judgeTerm: boolean
}

export const TodoItem= ({ isOpen, onCloseSelectedModal, id, status, title, description, date, today, selectedItem}: TodoItemProps) => {
  const [selectedStatus, setSelectedStatus] = useState(status)
  const dispatch = useDispatch();
  const statusList = useSelector((state: RootState) => state.addStatus)
  const { register, handleSubmit } = useForm<SubmitTodoItemProps>();
  const onChangeSubmit: SubmitHandler<SubmitTodoItemProps> = data => {
    const judgeTerm = today > data.date
    if(id === selectedItem){
      const changeTodo = {
        id: id,
        status: data.status,
        title: data.title,
        description: data.description,
        date: data.date,
        judgeTerm: judgeTerm
      }
      dispatch(change(changeTodo))
    }
    onCloseSelectedModal()
  };

  const statusHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseSelectedModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton zIndex={99}/>
          <ModalBody p={'.8rem'}>
            <form onSubmit={handleSubmit(onChangeSubmit)}>
              <FormControl mb={'.8rem'}>
                <FormLabel>ステータス</FormLabel>
                <Select value={selectedStatus} {...register('status')} onChange={statusHandleChange}>
                  {statusList.statusList.map((item, index) => {
                    return <option key={index} value={item.status}>{item.status}</option>
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
              <FormControl mb={'.8rem'}>
                <FormLabel>期限</FormLabel>
                <Input type={'date'} defaultValue={date} {...register('date')} />
              </FormControl>
              <Button type={'submit'}>変更する</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
