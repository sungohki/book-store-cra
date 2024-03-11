import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
// import ThemeSwitcher from './components/header/ThemeSwitcher';
import { BookStoreThemeProvider } from './context/themeContext';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Error from './components/common/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/books',
    element: (
      <Layout>
        <Detail />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <BookStoreThemeProvider>
      {/* <ThemeSwitcher /> */}
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
