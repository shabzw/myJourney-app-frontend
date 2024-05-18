import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import loadingGIF from "../assets/loading.gif";

export default function Timeline(props) {
  const [photos, setPhotos] = useState([]);
  const [eventName, setEventName] = useState("");
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [period, setPeriod] = useState("");
  const [loading, setLoading] = useState(null);

  const [events, setEvents] = useState([localStorage.getItem("eventD")]);
  const [timelineDt, setTimelineDt] = useState(
    localStorage.getItem("timelineD")
  );
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(`${API_BASE_URL}/api/events/getevents/`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          timelineId: params.id,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          const allEvents = data.data;
          const timelineData = data.dataB;
          setEvents(allEvents);
          setTimelineDt(timelineData);
          localStorage.setItem("eventD", allEvents);
          localStorage.setItem("timelineD", timelineData);
        })
        .catch((error) => {
          console.error(
            "There was a problem with the upload operation:",
            error
          );
        });
    } else {
      navigate("/login");
    }
  }, []);

  const uploadPhotos = (ev) => {
    setLoading(true);
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    fetch(`${API_BASE_URL}/api/events/upload`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        const filenames = data.filenames;
        setPhotos((prev) => [...prev, ...filenames]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  };
  // ==================================================

  const handleSubmit = () => {
    fetch(`${API_BASE_URL}/api/events/addevent/`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timelineId: params.id,
        eventName,
        para1,
        para2,
        period,
        photos,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        const allEvents = data;
        setEvents(allEvents);
        props.showAlert("Event added Successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  };
  return (
    <>
      <h1 className="mb-3 text-center" style={{ fontFamily: "Dancing Script" }}>
        Historic Events from {timelineDt?.timelineName}
      </h1>
      <div className="text-center">
        <p className="">{timelineDt?.shortDesc}</p>
      </div>
      {/* MODAL============================ */}
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
                    onChange={uploadPhotos}
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
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button
          data-bs-toggle="modal"
          data-bs-target="#modalForEvents"
          type="button"
          className="btn btn-primary"
          style={{ marginBottom: "20px" }}
        >
          Add New Event
        </button>
        <Link
          to={"/explore"}
          type="button"
          className="btn btn-primary"
          style={{ marginBottom: "20px" }}
        >
          Explore All Timelines
        </Link>
      </div>

      {events?.map((event, index) => (
        <>
          <div
            id={`carouselExampleCaptions-${index}`}
            className="carousel slide"
          >
            <div className="carousel-indicators">
              {event?.photos?.map((photo, photoIndex) => (
                <button
                  type="button"
                  data-bs-target={`#carouselExampleCaptions-${index}`}
                  data-bs-slide-to={photoIndex}
                  className={photoIndex === 0 ? "active" : ""}
                  aria-current={photoIndex === 0}
                  aria-label={`Slide ${photoIndex + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {event?.photos?.map((photo, photoIndex) => (
                <div
                  className={`carousel-item ${
                    photoIndex === 0 ? "active" : ""
                  }`}
                >
                  <img src={photo} className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h1>{event?.eventName}</h1>
                    <h5>{event?.period}</h5>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#carouselExampleCaptions-${index}`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#carouselExampleCaptions-${index}`}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* TOGGLE */}
          <div style={{ marginTop: "10px", marginBottom: "30px" }}>
            <p class="d-inline-flex gap-1">
              <a
                class="btn btn-primary"
                data-bs-toggle="collapse"
                href={`#multiCollapseExample1-${index}`}
                role="button"
                aria-expanded="false"
                aria-controls={`#multiCollapseExample1-${index}`}
              >
                Information
              </a>
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#multiCollapseExample2-${index}`}
                aria-expanded="false"
                aria-controls={`#multiCollapseExample2-${index}`}
              >
                Read More
              </button>
            </p>
            <div class="row">
              <div class="col">
                <div
                  class="collapse multi-collapse"
                  id={`multiCollapseExample1-${index}`}
                >
                  <div class="card card-body">{event?.para1}</div>
                </div>
              </div>
              <div class="col">
                <div
                  class="collapse multi-collapse"
                  id={`multiCollapseExample2-${index}`}
                >
                  <div class="card card-body">{event?.para2}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
