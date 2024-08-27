import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setCredentials } from "./features/user/userSlice.js";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const registerHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/users/register",
        { ...formData },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(setCredentials(res.data));
    } catch (e) {}
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/users/logout",
        { ...formData },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(logOut());
    } catch (e) {}
  };
  const protect = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users/protectData", {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const updateForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [audio, setAudio] = useState(null);
  // useEffect(() => {
  //   const init = async () => {
  //     try{

  //       const res = await axios.get(
  //         "http://localhost:3000/static/לסדר/a.mp3",
  //         { withCredentials: true }
  //       );
        
  //       setAudio(res.data)
  //       console.log(res.data)
  //     }catch(e){
  //       console.log(e)
  //     }
  //   };
  //   init()
  // }, []);
  return (
    <>
      <form onChange={updateForm} onSubmit={registerHandle}>
        <div>
          <label htmlFor="email">email</label>
          <input type="" name="email" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="" name="password" />
        </div>
        <button type="submit">sub</button>
      </form>
      <button onClick={logout}>logout</button>
      <button onClick={protect}>protect</button>
      <button onClick={() => console.log(user)}>user</button>
      {/* {...user} */}
       {/* <audio src='http://localhost:3000/static/לסדר/a.mp3' controls/>  */}
    </>
  );
}

export default App;
