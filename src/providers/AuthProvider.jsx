import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getCookies, setCookies, eraseCookies } from "../helpers/functions.js";
import { URL } from "../helpers/constants.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [tokenInUse, currentUser] = getCookies();
  const [authData, setAuthData] = useState({
    token: tokenInUse,
    user_id: +currentUser,
  });
  const [error, setError] = useState(null);

  const logInAs = async (data) => {
    try {
      const response = await fetch(URL + "/auth/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.ok) {
        setCookies(json);
        setAuthData(json);
        navigate("/");
        return;
      }
      throw new Error(
        json.non_field_errors?.join("\n") ||
          "Authentification request failed: " + response.statusText,
      );
    } catch (err) {
      setError(err);
    }
  };

  const logOut = () => {
    eraseCookies();
    setAuthData({ user_id: 0, token: "" });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...authData, logInAs, logOut }}>
      {error && (
        <h3 className="danger txt-c">
          {error.message}
          <br />
        </h3>
      )}
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = { children: PropTypes.node.isRequired };

export const useAuthentification = () => {
  return useContext(AuthContext);
};
