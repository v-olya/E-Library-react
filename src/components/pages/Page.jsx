import PropTypes from "prop-types";
import { Header } from "../Header";
import { Login } from "../Login";
import { Home } from "../Home";

const layouts = { Login: <Login />, Home: <Home /> };

export const Page = ({ type }) => {
  return (
    <>
      <Header />
      <main>{layouts[type]}</main>
    </>
  );
};

Page.propTypes = {
  type: PropTypes.string.isRequired,
};
