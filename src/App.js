import './index.css';
import Task from './TaskTracker/Index';
import AddTask from './TaskTracker/Add';
import UpdateTask from './TaskTracker/Edit'; 
import Login from './Authentication/Login'; 
import Signup from './Authentication/Signup'; 

import {createBrowserRouter, RouterProvider} from "react-router-dom"

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/task",
      element:<Task/>
    },
    {
      path:"/addUser",
      element:<AddTask/>,
    },
    {
      path: "/update/:id",          
      element: <UpdateTask />,
    },
    {
      path: "/login",          
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}
 
export default App;
