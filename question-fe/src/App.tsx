import '@/assets/styles/index.scss';
// import { QuestionList } from './components/QuestionList';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers';

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
