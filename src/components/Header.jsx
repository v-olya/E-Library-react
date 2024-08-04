import { useAuthentification } from "../providers/AuthProvider";
import PropTypes from "prop-types";
import { UserAvatar } from "./UserAvatar";

export const Header = ({ with_h1 = true }) => {
  const user = useAuthentification();

  return (
    <>
      {!user?.token ? null : (
        <ul role="navigation" className="flex space-between align-c">
          <li className="flex align-c">
            <UserAvatar /> <b>User ID &nbsp;&#10150;&nbsp; {user.user_id}</b>
          </li>
          <li>
            <button id="logout" onClick={() => user.logOut()}>
              Log out
            </button>
          </li>
        </ul>
      )}
      {with_h1 && <h1 className="txt-c">Welcome to our digital library</h1>}
    </>
  );
};

Header.propTypes = {
  with_h1: PropTypes.bool,
};
