import { useState } from "react";
import PropTypes from "prop-types";
import { dateRegEx, titleRegEx } from "../helpers/constants.js";
import { handleAddEditSubmit } from "../helpers/functions.js";

export const BookForm = ({ id, list, setList, hideModal }) => {
  const method = id ? "PUT" : "POST";
  const record = id ? list.find((x) => x.id == id) : {};
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(handleAddEditSubmit(e, method, list, setList, hideModal));
    setDisabled(true);
  }


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
          {!id ? "Add a new book" : `Editing item no. ${id}`}
        </h3>
        <h4 className="danger txt-c">
          {message}
        </h4>
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
            onChange={()=>setDisabled(false)}
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
            onChange={()=>setDisabled(false)}
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
            onChange={()=>setDisabled(false)}
          />
        </div>
        <div className="field">
          <label htmlFor="authors" className="required">
            Authors&#39; IDs:
          </label>
          <input
            id="authors"
            type="text"
            name="authors"
            required
            pattern="^[1-9](\d*)(,[1-9](\d*))*$"
            placeholder="1 or 1,2,3"
            defaultValue={author_ids}
            onChange={()=>setDisabled(false)}
          />
          <input type="hidden" name="ID" readOnly value={record.id} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

BookForm.propTypes = {
  id: PropTypes.number.isRequired,
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
