import { useAuthentification } from "../providers/AuthProvider";
import { UserAvatar } from "./UserAvatar";

export const Header = () => {
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
      <h1 className="txt-c">Welcome to our digital library</h1>
    </>
  );
};
