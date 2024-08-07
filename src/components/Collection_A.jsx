import { useState, lazy, Suspense } from "react";
import { useFetchToGETdata } from "../hooks/useFetchToGETdata";
import PropTypes from "prop-types";

import { Add } from "./actions/Add";
import { Edit } from "./actions/Edit";
import { Delete } from "./actions/Delete";
import { handleC_UDrequest } from "../helpers/functions.js";
import { URL } from "../helpers/constants.js";

export const Collection_A = ({ list, setList }) => {
  const [showForm, setShowForm] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(-1);
  const AuthorForm = lazy(() => import("./AuthorForm"));

  const deleteRecord = async (index) => {
    const record = list[index];
    if (
      !confirm(
        `Are you sure to delete the “${record.first_name} ${record.last_name}” record? ${booksOf[record.id] ? "\n\nWe have books by that author!" : ""}`,
      )
    ) {
      return;
    }
    const { error, info } = await handleC_UDrequest(
      "author",
      "DELETE",
      record.id,
    );
    if (!error) {
      setList([...list.slice(0, index), ...list.slice(index + 1)]);
    }
    alert(info);
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
            <th>Details (not editable)</th>
            <th width="40">db id</th>
            <th width="100">
              <Add
                onClick={() => {
                  setIndexToEdit(-1);
                  setShowForm(true);
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {!!list?.length &&
            list.map((author, index) => (
              <tr key={author.id}>
                <td>{author.first_name}</td>
                <td>{author.last_name}</td>
                <td>{new Date(author.birth_date).toLocaleDateString()}</td>
                <td>
                  <details disabled={!booksOf[author.id]}>
                    <summary>Books</summary>
                    {booksOf[author.id]
                      ? booksOf[author.id]
                          .map((x) => `${x.title} (${x.published})`)
                          .join(",\n")
                      : ""}
                  </details>
                </td>
                <td>{author.id}</td>
                <td className="no-wrap">
                  <Edit
                    onClick={() => {
                      setIndexToEdit(index);
                      setShowForm(true);
                    }}
                  />
                  <Delete onClick={() => deleteRecord(index)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showForm && (
        <Suspense fallback="">
          <AuthorForm
            index={indexToEdit}
            hideModal={() => setShowForm(false)}
            list={list}
            setList={setList}
          />
        </Suspense>
      )}
    </>
  );
};

Collection_A.propTypes = {
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
