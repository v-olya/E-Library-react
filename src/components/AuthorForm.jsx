import { useState } from "react";
import PropTypes from "prop-types";
import { dateRegEx, nameRegEx } from "../helpers/constants.js";
import { handleC_UDsubmit } from "../helpers/functions.js";

const AuthorForm = ({ id, list, refetcher, hideModal }) => {
  const method = id ? "PUT" : "POST";
  const record = id ? list.find((x) => x.id == id) : {};
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const m = await handleC_UDsubmit(
      form.id,
      method,
      form.elements["ID"].value,
      list,
      refetcher,
      new FormData(form),
    );
    if (m) {
      setMessage(m);
    }
  };

  return (
    <div className="modal-background">
      <form id="author" name="author" className="modal" onSubmit={handleSubmit}>
        <h3 className="txt-c">
          {!id ? "Add an author" : `Editing item no. ${id}`}
        </h3>
        <h4 className="danger txt-c">{submitting && message}&nbsp;</h4>
        <b className="close" onClick={hideModal}>
          &#10006;
        </b>
        <div className="field">
          <label htmlFor="first_name" className="required">
            First name:
          </label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            required
            autoComplete="given-name"
            pattern={nameRegEx}
            placeholder=" "
            defaultValue={record.first_name}
            onChange={() => setSubmitting(false)}
          />
        </div>
        <div className="field">
          <label htmlFor="last_name" className="required">
            Last name:
          </label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            required
            autoComplete="family-name"
            pattern={nameRegEx}
            placeholder=" "
            defaultValue={record.last_name}
            onChange={() => setSubmitting(false)}
          />
        </div>
        <div className="field">
          <label htmlFor="birth_date" className="required">
            Birth Date:
          </label>
          <input
            id="birth_date"
            type="text"
            name="birth_date"
            required
            pattern={dateRegEx}
            placeholder="YYYY-MM-DD"
            defaultValue={record.birth_date}
            onChange={() => setSubmitting(false)}
          />
          <input type="hidden" name="ID" readOnly value={record.id} />
        </div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthorForm;

AuthorForm.propTypes = {
  id: PropTypes.number.isRequired,
  hideModal: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      birth_date_date: PropTypes.string,
    }),
  ).isRequired,
  refetcher: PropTypes.func.isRequired,
};
