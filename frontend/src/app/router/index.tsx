import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../../ui/layouts/MainLayout';
import HomePage from '../../ui/pages/HomePage';
import UserPage from '../../ui/pages/UserPage';
import PodcastDetailPage from '../../ui/pages/PodcastDetailPage';
import PodcastUploadPage from '../../ui/pages/PodcastUploadPage';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/user',
        element: <UserPage />,
      },
      {
        path: '/podcasts/:id',
        element: <PodcastDetailPage />,
      },
      {
        path: '/upload',
        element: <PodcastUploadPage />,
      }
    ],
  },
  {
    path: '/podcasts',
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
