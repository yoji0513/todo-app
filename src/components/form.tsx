import { Box, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { useForm, SubmitHandler } from "react-hook-form";
import { add } from '../features/todo/todoSlice';
import { useState } from 'react';
import { RootState } from '../app/store';

export type TodoListProps = {
  id: number
  title: string
  description: string
  status: string  
}

export const Form= () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm<TodoListProps>();
  const status = useSelector((state: RootState) => state.addStatus)
  const [id, setId] = useState<number>(0)

  const addId = () => {
    setId(id + 1)
  }

  const onSubmit: SubmitHandler<TodoListProps> = data => {
    const addTodo = {
      id: id,
      status: data.status,
      title: data.title,
      description: data.description,
    }
    dispatch(add(addTodo))
    reset()
  };

  const filterStatusList = Array.from(status.statusList.reduce((prev, curr) => prev.set(curr.status, curr), new Map()).values())
  
  return (
    <Box maxW={'30rem'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={'.8rem'}>
          <FormLabel>ステータス</FormLabel>
          <Select placeholder={'ステータスを選んでください。'} {...register('status')}>
            {status.statusList.map((value, index) => {
              return <option key={index} value={value.status}>{value.status}</option>
            })}
          </Select>
        </FormControl>
        <FormControl mb={'.8rem'}>
          <FormLabel>TODO名</FormLabel>
          <Input type={'text'} {...register('title')} placeholder={'TODO名を入力してください。'} />
        </FormControl>
        <FormControl mb={'.8rem'}>
          <FormLabel>内容</FormLabel>
          <Input type={'text'} {...register('description')} placeholder={'TODOの内容入力してください。'} />
        </FormControl>
        <Button
          type={'submit'}
          colorScheme={'teal'}
          mt={'.8rem'}
          onClick={addId}
        >
          追加
        </Button>
      </form>
    </Box>
  );
}
