import { useAuthentification } from "../providers/AuthProvider";
import { Avatar } from "./Avatar";

export const Header = () => {
  const user = useAuthentification();

  return (
    <>
      {!user?.token ? null : (
        <ul role="navigation" className="flex space-between align-c">
          <li className="flex align-c">
            <Avatar /> <b>User ID&nbsp; {user.user_id}</b>
          </li>
          <li>
            <button id="logout" onClick={() => user.logOut()}>
              Log out
            </button>
          </li>
        </ul>
      )}
      <h1 className="txt-c">Welcome to our digital library</h1>
    </>
  );
};
