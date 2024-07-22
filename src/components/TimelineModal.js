import React from "react";

export default function TimelineModal({
  setTimelineName,
  setCoordinates,
  setShortDesc,
  timelinePhotoUpload,
  handleSubmit,
  loading,
  loadingGIF,
}) {
  return (
    <div className="modal" tabIndex="-1" id="modalForTimeline">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Timeline
                </label>
                <input
                  name="timelineName"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setTimelineName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Link for coordinates
                </label>
                <input
                  name="coordinates"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setCoordinates(e.target.value)}
                />
              </div>
              <div className="form-floating">
                <textarea
                  name="shortDesc"
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  onChange={(e) => setShortDesc(e.target.value)}
                ></textarea>
                <label htmlFor="floatingTextarea2">Short Description</label>
              </div>
              <div class="mb-3">
                <label for="formFileMultiple" class="form-label">
                  Upload Image{" "}
                  {loading && (
                    <div>
                      <img style={{ width: "25px" }} src={loadingGIF} alt="" />
                    </div>
                  )}
                </label>
                <input
                  onChange={timelinePhotoUpload}
                  class="form-control"
                  type="file"
                  id="formFileMultiple"
                  multiple
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={() => handleSubmit(true)}
              type="button"
              className="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
