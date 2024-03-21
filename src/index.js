import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Chat from './components/Chat';
import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/contacts",
        element: <Home />
      },
      {
        path: "/chat/:id",
        element: <Chat />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </RecoilRoot>
  </React.StrictMode>
);
