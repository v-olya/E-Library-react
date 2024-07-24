import PropTypes from "prop-types";
import { Header } from "../Header";
import { Login } from "../Login";
import { TableSwitcher } from "../TableSwitcher";

const layouts = { Login: <Login />, HomePage: <TableSwitcher /> };

export const Page = ({ type }) => {
  return (
    <>
      <Header />
      <main>{layouts[type]}</main>
    </>
  );
};

Page.propTypes = {
  type: PropTypes.oneOf(["Login", "HomePage"]),
};
