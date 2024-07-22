import React, { useContext, useEffect, useState } from "react";
import dataContext from "../context/data/dataContext";

const UserRequestModal = ({
  event,
  STATUS_ENUM,
  setEvents,
  showAlert,
  loadingGIF,
}) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [intro, setIntro] = useState("");
  const [keyComponents, setKeyComponents] = useState();
  const [headings, setHeadings] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(dataContext);
  const { uploadTempPhoto } = context;

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

  const handleReRequest = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/tempevents/rerequest/`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: STATUS_ENUM.PENDING,
        tempEventId: event._id,
        place,
        date,
        intro,
        source,
        keyComponents,
        headings: headings[0],
        paragraphs: paragraphs[0],
        images: images[0],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        setEvents(data);
        showAlert("Request Approved Successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  };

  const infoPhoto = async (ev, index) => {
    setLoading(true);
    const data = await uploadTempPhoto(ev);

    if (data) {
      setImages((photos) => {
        const updatedPhotos = [...photos]; // Create a copy of the photos array
        updatedPhotos[index] = data; // Update the specific index
        return updatedPhotos; // Return the new array
      });
    } else {
      console.error("Failed to upload photo");
    }

    setLoading(false);
  };

  const handleHeadingChange = (e, index) => {
    const newHeadings = [...headings];
    newHeadings[index] = e.target.value;
    setHeadings(newHeadings);
  };

  const handleParagraphChange = (e, index) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = e.target.value;
    setParagraphs(newParagraphs);
  };

  return (
    <div className="modal" tabIndex="-1" id="modalForUserRequest">
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
                      onChange={(e) => setDate(e.target.value)}
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
                      onChange={(e) => setPlace(e.target.value)}
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
                      onChange={(e) => setSource(e.target.value)}
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
                      onChange={(e) => setIntro(e.target.value)}
                      required
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
                      onChange={(e) => setKeyComponents(e.target.value)}
                      required
                      minLength={5}
                    />
                  </div>

                  <div>
                    <div
                      className="mt-4 border border-gray-600 p-3"
                      style={{ backgroundColor: "rgb(235, 235, 235)" }}
                    >
                      <h4>More Information</h4>
                      {event?.headings?.map((heading, index) => (
                        <div key={index} className="border-bottom mb-3 p-2">
                          <input
                            type="text"
                            className="form-control mb-3"
                            name="heading"
                            placeholder="Heading"
                            value={headings[index]}
                            onChange={(e) => handleHeadingChange(e, index)}
                          />

                          <div className="mb-3">
                            <label
                              for="formFileMultiple"
                              className="form-label"
                            >
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
                              name="image"
                              className="form-control mb-3"
                              type="file"
                              id="formFileMultiple"
                              single
                              onChange={(ev) => infoPhoto(ev, index)}
                            />
                            <div className="mb-3">
                              {images && (
                                <img
                                  style={{ width: "300px", height: "auto" }}
                                  src={images[index]}
                                  alt={index}
                                />
                              )}
                            </div>
                          </div>

                          <textarea
                            name="paragraph"
                            className="form-control mb-3"
                            placeholder="Paragraph"
                            value={paragraphs[index]}
                            onChange={(e) => handleParagraphChange(e, index)}
                          />
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
              disabled={event.status === STATUS_ENUM.PENDING}
              onClick={(e) => handleReRequest(e)}
              type="button"
              className="btn btn-primary"
            >
              Send Change Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRequestModal;
