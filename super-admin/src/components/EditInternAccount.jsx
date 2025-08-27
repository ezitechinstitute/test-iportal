import axios from "axios";
import React, { useEffect, useState } from "react";

export const EditInternAccount = ({ data }) => {
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    if (data) {
      setEditableData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({ ...prevData, [name]: value }));
  };

  const UpdateData = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://testserver.ezitech.org/update-int-account/${data.id}`, {
        editableData,
      })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="basic-modal">
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="defaultAccount"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel1">
                  Edit Intern
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* <div className="row"> */}
                <form onSubmit={UpdateData}>
                  <label htmlFor="">Email:</label>
                  <input
                    type="text"
                    name="email"
                    id=""
                    value={editableData.email}
                    className="form-control"
                    onChange={handleChange}
                  />
                  <br />
                  <label htmlFor="">Technology:</label>
                  <input
                    type="text"
                    name="technology"
                    id=""
                    value={editableData.technology}
                    className="form-control"
                    onChange={handleChange}
                  />
                  <br />
                  <label htmlFor="">Status:</label>
                  <select
                    name="status"
                    id=""
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option disabled selected value={editableData.status}>
                      {editableData.status}
                    </option>

                    <option value="Active">Active</option>
                    <option value="Freeze">Freeze</option>
                  </select>

                  <hr />
                  <div className="text-center">
                    <button className="btn btn-success" type="submit">
                      Update
                    </button>
                  </div>
                </form>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
