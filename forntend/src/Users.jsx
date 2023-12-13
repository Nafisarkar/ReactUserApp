import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers ] = useState([]); 
  useEffect(() => {
    axios.get("http://localhost:5000")
    .then(res => setUsers(res.data))
    .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/deleteUser/"+id)
    .then(res => {console.log(res)
      window.location.reload();
    })
    .catch(err => console.log(err));
  }
  

  return (
    <div className="d-flex vh-100  bg-primary justify-content-center align-items-center ">
      <div className="w-50 bg-white rounded p-3">
        <p className="h1 text-center">Users</p>
        <Link to="/create" className="btn btn-primary mb-3">Add+</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((users) => {

              // eslint-disable-next-line react/jsx-key
              return <tr>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.age}</td>
                <td className="d-grid gap-2 d-md-flex">
                  <Link to={`/update/${users._id}`} className="btn btn-success">Update</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(users._id)}>Delete</button>
                </td>
              </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
