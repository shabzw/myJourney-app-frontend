import React from 'react'

export default function MoreInfoModal({auth, setHeadingTemp1, uploadPhoto, setParaTemp1, handleUpdate, imageTemp1, loading, loadingGIF, headingTemp1, paraTemp1}) {
  return (
    <div className="modal" tabindex="-1" id="modalForExploreForm">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Data.</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div>
                  <input
                    type="text"
                    className="form-control mb-3"
                    name="heading"
                    placeholder="Heading"
                    value={headingTemp1}
                    onChange={(e) => setHeadingTemp1(e.target.value)}
                  />

                  <div className="mb-3">
                    <label for="formFileMultiple" className="form-label">
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
                    <div className="mb-3">
                      {imageTemp1 && (
                        <img
                          style={{ width: "300px", height: "auto" }}
                          src={imageTemp1}
                          alt={"Image"}
                        />
                      )}
                    </div>
                    <input
                      name="image"
                      className="form-control mb-3"
                      type="file"
                      id="formFileMultiple"
                      // value={imageTemp1}
                      single
                      onChange={uploadPhoto}
                    />
                  </div>

                  <textarea
                    name="paragraph"
                    className="form-control mb-3"
                    placeholder="Paragraph"
                    value={paraTemp1}
                    onChange={(e) => setParaTemp1(e.target.value)}
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
              disabled={!auth}
                onClick={handleUpdate}
                type="button"
                className="btn btn-primary"
              >
                Update changes
              </button>
              <button
              disabled={auth}
                // onClick={handleInfoRequest}
                type="button"
                className="btn btn-primary"
              >
                Request changes
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
