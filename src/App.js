import AddUser from './adduser/AddUser';
import './index.css';
import User from './User';
import {createBrowserRouter, RouterProvider} from "react-router-dom"

function App() {
  const route = createBrowserRouter([
    {
    path:"/",
    element:<User />
    },
    {
        path:"/addUser",
        element:<AddUser/>,
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
