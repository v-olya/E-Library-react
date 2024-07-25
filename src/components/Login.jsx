import { useAuthentification } from "../providers/AuthProvider";
import { passwordRegEx } from "../helpers/constants.js";

export const Login = () => {
  let [credentials, formValidity] = [{ username: "", password: "" }, false];

  const user = useAuthentification();

  const handleSubmit = (e) => {
    e.preventDefault();
    user.logInAs(credentials);
  };

  const handleInput = (e) => {
    const input = e.target;
    if (!input.validity.valid) {
      return;
    }
    credentials = { ...credentials, [input.name]: input.value };
    formValidity = ![...document.querySelectorAll("input")]
      .map((i) => i.validity.valid)
      .includes(false);
  };

  const chars = 4;

  return (
    <form id="login" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="username" className="required">
          Username:
        </label>
        <input
          id="username"
          type="text"
          name="username"
          required
          aria-describedby="user-name"
          minLength={chars}
          maxLength={chars * 4}
          title="Must begin with a letter, may contain numbers"
          pattern="^[A-Za-z][A-Za-z0-9]+$"
          placeholder=" "
          onChange={handleInput}
        />
      </div>
      <div className="field">
        <label htmlFor="password" className="required">
          Password:
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          aria-describedby="user-password"
          minLength={chars * 2}
          maxLength={chars * 4}
          title="At least one uppercase or lowercase letter, one number and one special character"
          pattern={passwordRegEx}
          placeholder=" "
          onChange={handleInput}
        />
      </div>
      <button type="submit" disabled={formValidity}>
        Submit
      </button>
    </form>
  );
};
