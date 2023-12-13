
import {useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/getUser/"+id)
    .then(res => {
      setName(res.data.name);
      setEmail(res.data.email);
      setAge(res.data.age);
    })
    .catch(err => console.log(err));
  },[]);
  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/updateUser/"+id, { name, email, age })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }


  return (
    <div className="d-flex vh-100  bg-primary justify-content-center align-items-center ">
    <div className="w-50 bg-white rounded p-3">
      <p className="h1 text-center">Update User</p>
      <form className="form" onSubmit={Update}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update
        </button>

      </form>
    </div>
  </div>
  )
  }
  
  export default UpdateUser;