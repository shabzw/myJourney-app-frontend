import React from "react";

export default function TimelineEditModal({
  setTimelineNameE,
  setCoordinatesE,
  setShortDescE,
  // setPhotoThumbnailsE,
  // uploadPhoto,
  handleSubmit,
  loading,
  loadingGIF,
  timelineNameE,
  shortDescE,
  photoThumbnailsE,
  coordinatesE,
  timelineEditPhotoUpload,
  removePhoto,
}) {
  return (
    <div className="modal" tabIndex="-1" id="modalForTimelineEdit">
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
                  value={timelineNameE}
                  onChange={(e) => setTimelineNameE(e.target.value)}
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
                  value={coordinatesE}
                  onChange={(e) => setCoordinatesE(e.target.value)}
                />
              </div>
              <div className="form-floating">
                <textarea
                  name="shortDesc"
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  value={shortDescE}
                  onChange={(e) => setShortDescE(e.target.value)}
                ></textarea>
                <label htmlFor="floatingTextarea2">Short Description</label>
              </div>

              <div style={{ marginTop: "10px" }}>
                <label htmlFor="inputPhoto" className="form-label">
                  Add Photo
                </label>

                <div class="mb-3">
                  <label for="formFileMultiple" class="form-label">
                    Upload Image{" "}
                    {loading && (
                      <div>
                        <img
                          style={{ width: "25px" }}
                          src={loadingGIF}
                          alt=""
                        />
                      </div>
                    )}
                  </label>
                  <input
                    onChange={timelineEditPhotoUpload}
                    class="form-control"
                    type="file"
                    id="formFileMultiple"
                    multiple
                  />
                  <div
                    className="d-flex flex-wrap mt-3"
                    style={{ gap: "10px" }}
                  >
                    {photoThumbnailsE.map((photo, index) => (
                      <div
                        key={index}
                        className="position-relative flex"
                        style={{
                          // display: "flex",
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
