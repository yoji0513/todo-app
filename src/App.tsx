import { Box, Heading } from '@chakra-ui/react';
import './App.css';
import { TodoContent } from './components/todoContent';

const App = () => {
  return (
    <Box m={'1.6rem'}>
      <Heading as={'h1'} mb={'.8rem'}>TODO</Heading>
      <TodoContent />
    </Box>
  );
}

export default App;
