import React from 'react'

export default function EventModal({setEventName, setPeriod, setPara1, setPara2, loadingGIF, handleSubmit, loading, eventPhotoUpload}) {
  return (
    <div className="modal" tabindex="-1" id="modalForEvents">
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
                    onChange={(e) => setEventName(e.target.value)}
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
                    onChange={(e) => setPeriod(e.target.value)}
                  />
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    name="para1"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    onChange={(e) => setPara1(e.target.value)}
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
                    onChange={(e) => setPara2(e.target.value)}
                  ></textarea>
                  <label for="floatingTextarea2">Paragraph 2</label>
                </div>
                <div className="mb-3">
                  <label for="formFileMultiple" className="form-label">
                    Upload Images{" "}
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
                    onChange={eventPhotoUpload}
                    name="images"
                    className="form-control"
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
                onClick={()=>handleSubmit(true)}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
