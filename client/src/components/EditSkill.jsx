import React from "react";
import { Fragment, useState } from "react";

// skill is a prop
const EditSkill = ({ skillId }) => {
  console.log(skillId);
  const [rating, setRating] = useState();

  // edit skill

  const updateRating = async (e) => {
    e.preventDefault();
    try {
      const body = { rating: rating };
      console.log(body);
      fetch(`${process.env.REACT_APP_BASE_URL}/stdskills/${skillId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/student/enter";
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-outline-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${skillId}`}
      >
        Edit
      </button>

      <div
        class="modal fade"
        id={`id${skillId}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title text-dark" id="exampleModalLabel">
                Edit Skill
              </h2>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                onClick={(e) => updateRating(e)}
              >
                Edit
              </button>

              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditSkill;
