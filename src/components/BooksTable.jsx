import { useState } from "react";
import PropTypes from "prop-types";

import { Add } from "./actions/Add";
import { Edit } from "./actions/Edit";
import { Delete } from "./actions/Delete";
import { BookForm } from "./BookForm";
import { handleCUDsubmit } from "../helpers/functions.js";

export const BooksTable = ({ list, setList }) => {
  const [showForm, setShowForm] = useState(false);
  const [idToEdit, setIdToEdit] = useState(0);

  const deleteRecord = (id) => {
    handleCUDsubmit("book", "DELETE", id, list, setList);
  };

  return (
    <>
      <table className="txt-c">
        <thead>
          <tr>
            <th width="120">Title</th>
            <th>Published</th>
            <th>ISBN</th>
            <th>Author(s) ID</th>
            <th width="200">Details (not editable)</th>
            <th width="100">
              <Add
                onClick={() => {
                  setIdToEdit(0);
                  setShowForm(true);
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {!!list?.length &&
            list.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{new Date(book.publication_date).toLocaleDateString()}</td>
                <td>{book.isbn}</td>
                <td>
                  {(book.authors || [])
                    .map((a) => a.id)
                    .filter((x) => x)
                    .join(",")}
                </td>
                <td>
                  <details>
                    <summary>Author(s)</summary>
                    {"\n" +
                      (book.authors || [])
                        .map(
                          (author) =>
                            `${author.first_name} ${author.last_name} (${author.birth_date})`,
                        )
                        .join("\n")}
                  </details>
                </td>
                <td className="no-wrap">
                  <Edit
                    onClick={() => {
                      setIdToEdit(book.id);
                      setShowForm(true);
                    }}
                  />
                  <Delete onClick={() => deleteRecord(book.id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showForm && (
        <BookForm
          id={idToEdit}
          hideModal={() => setShowForm(false)}
          list={list}
          setList={setList}
        />
      )}
    </>
  );
};

BooksTable.propTypes = {
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
