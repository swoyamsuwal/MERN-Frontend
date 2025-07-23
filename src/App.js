import AddUser from './adduser/AddUser';
import './index.css';
import User from './User';
import UpdateTask from './updatetask/UpdateTask'; 

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
    }
  ])
  return (
    <div className="App">
      {/* <User /> */}
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}
 
export default App;
