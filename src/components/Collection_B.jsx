import { useState, lazy, Suspense } from "react";
import PropTypes from "prop-types";

import { Add } from "./actions/Add";
import { Edit } from "./actions/Edit";
import { Delete } from "./actions/Delete";
import { handleC_UDrequest } from "../helpers/functions.js";

export const Collection_B = ({ list, setList }) => {
  const [showForm, setShowForm] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(-1);
  const BookForm = lazy(() => import("./BookForm"));

  const deleteRecord = async (index) => {
    const record = list[index];
    if (!confirm(`Are you sure to delete the “${record.title}”?`)) {
      return;
    }
    const { error, info } = await handleC_UDrequest(
      "book",
      "DELETE",
      record.id,
    );
    if (!error) {
      setList([...list.slice(0, index), ...list.slice(index + 1)]);
    }
    alert(info);
  };

  return (
    <>
      <table className="txt-c">
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
            <th>ISBN</th>
            <th>Author(s) ID</th>
            <th>Details (not editable)</th>
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
            list.map((book, index) => (
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
                    {(book.authors || [])
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
          <BookForm
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

Collection_B.propTypes = {
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
