import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useForm, SubmitHandler } from "react-hook-form";
import { addStatus, TodoStatusType } from '../features/todo/statusSlice';
import { useDispatch } from 'react-redux'

export const AddStatusForm = () => {
  const { register, handleSubmit, reset } = useForm<TodoStatusType>();
  const dispatch = useDispatch()
  const onSubmit: SubmitHandler<TodoStatusType> = data => {
    dispatch(addStatus(data))
    reset()
  };
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={'.8rem'}>
        <FormLabel>ステータス</FormLabel>
        <Input type={'text'} {...register('status')} />
      </FormControl>
      <Button type={'submit'}>追加</Button>
    </form>
  )
}