import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/user/userSlice";
import { useLogoutMutation } from "../../features/user/apislice";
import { NavLink } from "react-router-dom";

const NavBarLinks = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [logOutMut] = useLogoutMutation();
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    try {
      const res = await logOutMut();
      dispatch(logOut())
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {user ? (
        <div className="flex gap-2">
          <div>welcome {user.user.email}</div>
          <div onClick={logOutHandler}>log out </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <NavLink to="/login">login</NavLink>
        </div>
      )}
    </>
  );
};

export default NavBarLinks;
