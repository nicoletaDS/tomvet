import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import CustomerOders from "./screens/Orders";
import LoginScreen from "../auth/screens/LoginScreen";

const Header = () => {
  const sessionState = useSelector((state: RootState) => state.auth);

  //return <>{sessionState.session ? <CustomerOders /> : <LoginScreen />}</>;
  return <CustomerOders />;
};

export default Header;
