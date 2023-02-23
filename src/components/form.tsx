import { Box, Button, FormControl, FormLabel, Input, Select, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { useForm, SubmitHandler } from "react-hook-form";
import { add } from '../features/todo/todoSlice';
import { useEffect, useState } from 'react';
import { RootState } from '../app/store';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns';
import { ja } from "date-fns/locale";

const schema = yup.object().shape({
    status: yup.string().required('ステータスを選択してください'),
    title: yup.string().required('タイトルを選択してください'),
    description: yup.string(),
    date: yup.date()
});

export type TodoListProps = {
  id: number
  title: string
  description: string
  status: string
  date: Date
  judgeTerm: boolean
}

export const Form= () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TodoListProps>({
    resolver: yupResolver(schema)
  });
  const status = useSelector((state: RootState) => state.addStatus)
  const [id, setId] = useState<number>(0)
  const [today, setToday] = useState<string>('')
  useEffect(() => {
    const today = new Date();
    const formatToday = format(today, 'yyyy-MM-dd', {
      locale: ja,
    })
    setToday(formatToday)
  }, [])

  const addId = () => {
    setId(id + 1)
  }

  const onSubmit: SubmitHandler<TodoListProps> = data => {
    const formatDate = format(data.date, 'yyyy-MM-dd', {
      locale: ja,
    })
    const judgeTerm = today > formatDate
    const addTodo = {
      id: id,
      status: data.status,
      title: data.title,
      description: data.description,
      date: formatDate,
      judgeTerm: judgeTerm
    }
    dispatch(add(addTodo))
    reset()
  };
  
  return (
    <Box maxW={'30rem'} mb={'2rem'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={'.8rem'}>
          <FormLabel>ステータス</FormLabel>
          <Select placeholder={'ステータスを選んでください。'} {...register('status')}>
            {status.statusList.map((value, index) => {
              return <option key={index} value={value.status}>{value.status}</option>
            })}
          </Select>
          {errors.status && <Text>ステータスを選んでください</Text>}
        </FormControl>
        <FormControl mb={'.8rem'}>
          <FormLabel>TODO名</FormLabel>
          <Input type={'text'} {...register('title')} placeholder={'TODO名を入力してください。'} />
          {errors.title && <Text>Todo名を入力してください</Text>}
        </FormControl>
        <FormControl mb={'.8rem'}>
          <FormLabel>内容</FormLabel>
          <Input type={'text'} {...register('description')} placeholder={'TODOの内容入力してください。'} />
        </FormControl>
        <FormControl mb={'.8rem'}>
          <FormLabel>期日</FormLabel>
          <Input type={'date'} {...register('date')} />
        </FormControl>
        <Button
          type={'submit'}
          colorScheme={'teal'}
          onClick={addId}
        >
          追加
        </Button>
      </form>
    </Box>
  );
}
