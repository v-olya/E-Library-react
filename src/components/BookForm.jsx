import { useState } from "react";
import PropTypes from "prop-types";
import { dateRegEx, titleRegEx } from "../helpers/constants.js";
import { handleC_UDrequest } from "../helpers/functions.js";

const BookForm = ({ index, list, setList, hideModal }) => {
  const method = index >= 0 ? "PUT" : "POST";
  const record = index >= 0 ? list[index] : {};
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirm("Please make sure that the authors' ids exist in the DB")) {
      return;
    }
    setSubmitting(true);
    const form = e.target;
    const requestBody = {};
    for (const [key, val] of new FormData(form).entries()) {
      requestBody[key] =
        key == "author_ids" ? val.split(",").map((x) => +x) : val;
    }
    const m = await handleC_UDrequest(
      form.id,
      method,
      form.elements["ID"].value,
      list,
      setList,
      requestBody,
    );
    if (m) {
      setMessage(m);
    }
  };

  const author_ids = record.authors
    ? record.authors
        .map((a) => a.id)
        .filter((x) => x)
        .join(",")
    : "";

  return (
    <div className="modal-background">
      <form id="book" name="book" className="modal" onSubmit={handleSubmit}>
        <h3 className="txt-c">
          {index >= 0 ? `Editing the book with DB id=${record.id}` : "Add a new book"}
        </h3>
        <h4 className="danger txt-c">{submitting && message}&nbsp;</h4>
        <b className="close" onClick={hideModal}>
          &#10006;
        </b>
        <div className="field">
          <label htmlFor="title" className="required">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            required
            minLength="2"
            pattern={titleRegEx}
            placeholder=" "
            defaultValue={record.title}
            onChange={() => setSubmitting(false)}
          />
        </div>
        <div className="field">
          <label htmlFor="isbn" className="required">
            ISBN:
          </label>
          <input
            id="isbn"
            type="text"
            name="isbn"
            required
            pattern="^\d{1,13}$"
            placeholder="Up to 13 digits"
            defaultValue={record.isbn}
            onChange={() => setSubmitting(false)}
          />
        </div>
        <div className="field">
          <label htmlFor="publication_date" className="required">
            Publication Date:
          </label>
          <input
            id="publication_date"
            type="text"
            name="publication_date"
            required
            pattern={dateRegEx}
            placeholder="YYYY-MM-DD"
            defaultValue={record.publication_date}
            onChange={() => setSubmitting(false)}
          />
        </div>
        <div className="field">
          <label htmlFor="authors" className="required">
            Authors&#39; IDs:
          </label>
          <input
            id="author_ids"
            type="text"
            name="author_ids"
            required
            pattern="^[1-9](\d*)(,[1-9](\d*))*$"
            placeholder="1 or 1,2,3"
            defaultValue={author_ids}
            onChange={() => {
              setSubmitting(false);
            }}
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

export default BookForm;

BookForm.propTypes = {
  index: PropTypes.number.isRequired,
  hideModal: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      isbn: PropTypes.string,
      publication_date: PropTypes.string,
      authors: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number.isRequired }),
      ),
    }),
  ).isRequired,
  setList: PropTypes.func.isRequired,
};
