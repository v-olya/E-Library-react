import { useState, lazy } from "react";
import { useFetchToGETdata } from "../hooks/useFetchToGETdata";
import PropTypes from "prop-types";

import { Add } from "./actions/Add";
import { Edit } from "./actions/Edit";
import { Delete } from "./actions/Delete";
import { handleC_UDsubmit } from "../helpers/functions.js";
import { URL } from "../helpers/constants.js";

export const AuthorsTable = ({ list, setList }) => {
  const [showForm, setShowForm] = useState(false);
  const [idToEdit, setIdToEdit] = useState(0);
  const AuthorForm = lazy(() => import("./AuthorForm"));

  const deleteRecord = async (id) => {
    const record = list.find((x) => x.id == id);
    if (!record) {
      return;
    }
    if (
      !confirm(
        `Are you sure to delete the “${record.first_name} ${record.last_name}” record?`,
      )
    ) {
      return;
    }
    alert(await handleC_UDsubmit("author", "DELETE", id, list, setList));
  };
  // Books are needed to provide details on author:  booksOf[author_id]
  let booksOf = {};
  const data = useFetchToGETdata(`${URL}/api/books/`, true).data;

  if (data.length) {
    data.forEach((book) => {
      book.authors.forEach((author) => {
        booksOf[author.id] = booksOf[author.id] ?? [];
        booksOf[author.id].push({
          published: book.publication_date,
          title: book.title,
        });
      });
    });
  }

  return (
    <>
      <table className="txt-c">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Date of birth</th>
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
            list.map((author) => (
              <tr key={author.id}>
                <td>{author.first_name}</td>
                <td>{author.last_name}</td>
                <td>{new Date(author.birth_date).toLocaleDateString()}</td>
                <td>
                  <details>
                    <summary>Books</summary>
                    {booksOf[author.id]
                      ? "\n" +
                        booksOf[author.id]
                          .map((x) => `${x.title} (${x.published})`)
                          .join(",\n")
                      : ""}
                  </details>
                </td>
                <td className="no-wrap">
                  <Edit
                    onClick={() => {
                      setIdToEdit(author.id);
                      setShowForm(true);
                    }}
                  />
                  <Delete onClick={() => deleteRecord(author.id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showForm && (
        <AuthorForm
          id={idToEdit}
          hideModal={() => setShowForm(false)}
          list={list}
          setList={setList}
        />
      )}
    </>
  );
};

AuthorsTable.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      birth_date: PropTypes.string,
    }),
  ).isRequired,
  setList: PropTypes.func.isRequired,
};
