import { createBrowserRouter } from 'react-router-dom';
import Login from './routes/Login';
import ErrorPage from './routes/ErrorPage';
import Projects from './routes/Projects';
import SignUp from './routes/Signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Projects />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);
