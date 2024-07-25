import PropTypes from "prop-types";
import { Header } from "../Header";
import { Login } from "../Login";
import { CollectionSwitcher } from "../CollectionSwitcher";

const layouts = { Login: <Login />, HomePage: <CollectionSwitcher /> };

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
