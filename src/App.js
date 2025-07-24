import AddUser from './adduser/AddUser';
import './index.css';
import User from './User';
import UpdateTask from './updatetask/UpdateTask'; 
import Login from './Login/Login'; 
import Signup from './Login/Signup'; 

import {createBrowserRouter, RouterProvider} from "react-router-dom"

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<User />,
    },
    {
      path:"/addUser",
      element:<AddUser/>,
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
