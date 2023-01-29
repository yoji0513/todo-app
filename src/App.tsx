import { Box, Heading } from '@chakra-ui/react';
import { Form } from './components/form';
import { TodoList } from './components/todo-list';

const App = () => {
  return (
    <Box m={'1.6rem'}>
      <Heading as={'h1'} mb={'.8rem'}>TODO</Heading>
      <Form />
      <TodoList />
    </Box>
  );
}

export default App;
