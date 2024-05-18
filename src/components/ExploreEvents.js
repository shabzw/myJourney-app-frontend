import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import dataContext from "../context/data/dataContext";

export default function ExploreEvents() {
  const context = useContext(dataContext);
  const params = useParams();
  const { timelineEvent, getTimelineEvent } = context;
  const navigate = useNavigate();
  // const API_BASE_URL =process.env.REACT_APP_API_BASE_URL
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const api = "gettimelineevent";
      const tId = params.tId;

      const eId = params.eId;
      getTimelineEvent(api, eId, tId);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {timelineEvent?.events?.map((event, index) => (
        <div key={index}>
          <h1 className="text-center mb-4">
            Explore more about {event.eventName}
          </h1>
          <Link
            to={`/exploreForm/${params.eId}`}
            className="btn btn-primary mb-4"
          >
            Edit Data
          </Link>

          <div>
            <div className="row">
              <div className="col-md-4 col-sm-12 mb-4">
                <ul className="border border-black rounded p-2 list-unstyled">
                  <li>
                    <strong>Year:</strong> {event.date}
                  </li>
                  <li>
                    <strong>Place:</strong> {event.place}
                  </li>
                  <li>
                    <strong>Key Roles:</strong> {event.keyComponents}
                  </li>
                  <li>
                    <strong>Source:</strong> <Link> {event.source}</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-8 col-sm-12 border border-black rounded p-2">
                <h4>Introduction :</h4>
                <p>{event.intro}</p>
              </div>
            </div>

            <div>
              {/* PHOTOS */}
              <div
                id={`carouselExampleCaptions-${index}`}
                className="carousel slide mt-4 rounded"
              >
                <div className="carousel-indicators">
                  {event?.photos?.map((photo, photoIndex) => (
                    <button
                      key={photoIndex}
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
                      key={photoIndex}
                      className={`carousel-item ${
                        photoIndex === 0 ? "active" : ""
                      }`}
                    >
                      <img src={photo} className="d-block w-100" alt="..." />
                      <div className="carousel-caption d-none d-md-block">
                        <h2>{event?.eventName}</h2>
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
              {/* Extra Components */}
              <div className="border border-gray-300 rounded my-3 p-2">
                <strong>Key Components/Roles :</strong> {event.keyComponents}
              </div>
              {/* Main Explanation */}
              <div>
                {event.headings.map((heading, idx) => (
                  <div key={idx} className="p-2">
                    {<h3 className="mb-3">{heading} -</h3>}
                    {event.images[idx] && (
                      <div className="d-flex justify-content-center">
                        <img
                          className="img-fluid mb-4 mx-auto"
                          style={{ width: "70%", height: "auto" }}
                          src={event.images[idx]}
                          alt={`Image ${idx}`}
                        />
                      </div>
                    )}
                    {<p className="mt-2">{event.paragraphs[idx]}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
