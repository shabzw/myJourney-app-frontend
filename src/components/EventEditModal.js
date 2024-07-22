import React from "react";

export default function EventEditModal({
  setEventNameE,
  setPeriodE,
  setPara1E,
  setPara2E,
  // setPhotosE,
  eventNameE,
  para1E,
  para2E,
  periodE,
  loadingGIF,
  handleSubmit,
  loading,
  eventEditPhotoUpload,
  photosE,
  removePhoto,
}) {
  return (
    <div className="modal" tabindex="-1" id="modalForEditEvents">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add an event</h5>
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
                <label for="exampleInputEmail1" className="form-label">
                  Event
                </label>
                <input
                  name="timelineName"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={eventNameE}
                  onChange={(e) => setEventNameE(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Period
                </label>
                <input
                  name="period"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={periodE}
                  onChange={(e) => setPeriodE(e.target.value)}
                />
              </div>
              <div className="form-floating mb-3">
                <textarea
                  name="para1"
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  value={para1E}
                  onChange={(e) => setPara1E(e.target.value)}
                ></textarea>
                <label for="floatingTextarea2">Paragraph 1</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  name="para2"
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  value={para2E}
                  onChange={(e) => setPara2E(e.target.value)}
                ></textarea>
                <label for="floatingTextarea2">Paragraph 2</label>
              </div>

              <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">
                  Upload Images{" "}
                  {loading && (
                    <div>
                      <img style={{ width: "25px" }} src={loadingGIF} alt="" />
                    </div>
                  )}
                </label>
                <input
                  onChange={eventEditPhotoUpload}
                  name="images"
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  multiple
                />
                <div className="d-flex flex-wrap mt-3" style={{ gap: "10px" }}>
                  {photosE.map((photo, index) => (
                    <div
                      key={index}
                      className="position-relative flex"
                      style={{
                        width: "150px",
                        height: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={photo}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        onClick={(ev) => removePhoto(ev, photo)}
                        className="btn btn-sm btn-dark position-absolute"
                        style={{
                          top: "5px", // Gap from the top
                          right: "5px", // Gap from the right
                          opacity: "0.7",
                        }}
                      >
                        <div>Delete</div>
                      </button>
                    </div>
                  ))}
                </div>
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
              onClick={() => handleSubmit(false)}
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
