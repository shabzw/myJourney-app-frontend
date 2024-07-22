import React, { useEffect, useState } from "react";

const OwnerViewModal = ({ event, handleReject, handleApprove }) => {

  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [intro, setIntro] = useState("");
  const [keyComponents, setKeyComponents] = useState();
  const [headings, setHeadings] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (event) {
      setPlace(event.place || "");
      setDate(event.date || "");
      setSource(event.source || "");
      setIntro(event.intro || "");
      setKeyComponents(event.keyComponents || "");
      setHeadings(event.headings || []);
      setParagraphs(event.paragraphs || []);
      setImages(event.images || []);
    }
  }, [event]);

  return (
    <div className="modal" tabIndex="-1" id="modalForOwnerView">
      <div className="modal-dialog modal-lg">
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
              <div className="container mt-2">
                <h1>Add more info to explore</h1>
                <form>
                  <div className="mb-3">
                    <label
                      htmlfor="name"
                      className="form-label"
                      style={{ marginTop: "15px" }}
                    >
                      Date Of Occurance
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="date"
                      name="date"
                      value={date}
                      //   onChange={(e) => setDate(e.target.value)}
                      disabled={true}
                      aria-describedby="emailHelp"
                    />

                    <label
                      htmlfor="email"
                      className="form-label"
                      style={{ marginTop: "15px" }}
                    >
                      Place of Occurance
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="place"
                      name="place"
                      value={place}
                      disabled={true}
                      //   onChange={(e) => setPlace(e.target.value)}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlfor="source" className="form-label">
                      Source or external links
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="source"
                      name="source"
                      value={source}
                      disabled={true}
                      //   onChange={(e) => setSource(e.target.value)}
                      required
                      minLength={5}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlfor="intro" className="form-label">
                      Introduction
                    </label>
                    <textarea
                      className="form-control"
                      id="intro"
                      name="intro"
                      value={intro}
                      //   onChange={(e) => setIntro(e.target.value)}
                      required
                      disabled={true}
                      minLength={5}
                    />
                  </div>
                  <div>
                    <label htmlfor="keyComponents" className="form-label">
                      Key Components (Ex: Usage of Sewing machine, Horse
                      Carriage usage, so on...)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="keyComponents"
                      name="keyComponents"
                      value={keyComponents}
                      //   onChange={(e) => setKeyComponents(e.target.value)}
                      required
                      disabled={true}
                      minLength={5}
                    />
                  </div>

                  <div>
                    <div
                      className="mt-4 border border-gray-600 p-3"
                      style={{ backgroundColor: "rgb(235, 235, 235)" }}
                    >
                      <h4>More Information</h4>
                      {headings?.map((heading, index) => (
                        <div key={index} className="border-bottom mb-3 p-2">
                          <p>
                            <strong>Heading:</strong> {heading}
                          </p>
                          {images[index] && (
                            <div className="text-center mb-3">
                              <img
                                className="img-fluid"
                                style={{ maxWidth: "100%", height: "auto" }}
                                src={images[index]}
                                alt={`Image ${index}`}
                              />
                            </div>
                          )}
                          <p className="mt-3">
                            <strong>Paragraph: </strong> {paragraphs[index]}
                            {/* {truncateText(event?.paragraphs[index])} */}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
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
              onClick={(e) => handleApprove(e, event)}
              type="button"
              className="btn btn-primary"
            >
              Approve
            </button>
            <button
              onClick={(e) => handleReject(e, event._id)}
              type="button"
              className="btn btn-danger"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerViewModal;
