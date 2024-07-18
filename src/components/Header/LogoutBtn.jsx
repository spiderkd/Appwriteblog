import authService from "../../appwrite/auth";
import { logout } from "../../store/authslice";
import { useDispatch } from "react-redux";
const LogoutBtn = ({ className }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className={`duration-200
      ${className}`}
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
