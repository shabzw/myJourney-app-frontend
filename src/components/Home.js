import React, {  useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loadingGIF from "../assets/loading.gif";
import compass from "../assets/icons8-compass (1).gif";

import bg1 from "../assets/landingImage1.png";
export default function Home(props) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [timelines, setTimelines] = useState([
    localStorage.getItem("timelineD"),
  ]);
  const [photoThumbnails, setPhotoThumbnails] = useState([]);
  const [timelineName, setTimelineName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [loading, setLoading] = useState(null);
  const [coordinates, setCoordinates] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const handleClick = (thumbnailsLength) => {
    // Increment currentIndex by 1, but loop back to 0 if currentIndex is at the end
    setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnailsLength);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(`${API_BASE_URL}/api/timeline/gettimeline/`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          const allTimelines = data;
          setTimelines(allTimelines);
          localStorage.setItem("timelineD", timelines);
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

  function uploadPhoto(ev) {

    setLoading(true);
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    fetch(`${API_BASE_URL}/api/timeline/upload/`, {
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
        setPhotoThumbnails((prev) => [...prev, ...filenames]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  }

  const handleSubmit = () => {

    fetch(`${API_BASE_URL}/api/timeline/addtimeline/`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timelineName, shortDesc, photoThumbnails, coordinates }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        const allTimelines = data;
        setTimelines(allTimelines);
        props.showAlert("Timeline added Successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  };

  function truncateText(text) {
    const words = text.split(" ");
    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "..."; // Join first 25 words and add ellipsis
    }
    return text;
  }
  const [translate, setTranslate] = useState(false);
  return (
    <>
      <div>
        <div style={{ display: "flex", marginBottom: "5px" }}>
          <h1
            onClick={() => setTranslate(!translate)}
            style={{
              cursor: "pointer",
              fontFamily: "Dancing Script"
            }}
            className="text-4xl mx-auto mb-3 rounded"
          >
            {translate
              ? "Navigate to the past using myJourney"
              : "ᚾᚨᚡᛁᚷᚨᛏᛖ ᛏᛟ ᛏᚺᛖ ᛈᚨᛋᛏ ᛁᚾ ᛗᚤᛃᛟᚢᚱᚾᛖᚤ"}
          </h1>
        </div>

        
        <div
          className="position-relative"
          style={{ width: "100%", height: "400px" }}
        >
          <img
            src={bg1}
            alt="Background"
            className="img-fluid rounded"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(50%)",
            }}
          />

          <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
            <h2 className="mb-3" style={{ fontFamily: "Dancing Script" }}>
              Welcome to the unique timeline navigator
            </h2>
            <h4 className="mb-4">
              Navigate, Explore and Experience the events from history.
            </h4>
            <h4>
            Also add the timelines yourself
            </h4>
          </div>
        </div>
      

        <div className="row">
          <div className="col text-center">
            <h1
              style={{
                marginTop: "20px",
                backgroundColor: "rgba(211, 211, 211, 0.5)",
                padding: "5px",
                fontFamily: "Dancing Script",
              }}
            >
              Timelines of the past
            </h1>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5">
          {timelines?.map((timeline, index) => {
            const thumbnailsLength = timeline?.photoThumbnails?.length || 0;
            const displayIndex = currentIndex >= thumbnailsLength ? thumbnailsLength - 1 : currentIndex;

            return (
              <div key={timeline?.id} className="col">
                <div className="card mt-4 h-100">
                  {thumbnailsLength > 0 && (
                    <img
                      src={timeline.photoThumbnails[displayIndex]}
                      className="card-img-top img-fluid"
                      alt="..."
                      style={{ objectFit: "cover", height: "200px" }}
                      onClick={() => handleClick(thumbnailsLength)}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{timeline?.timelineName}</h5>
                    <p className="card-text">
                      {timeline?.shortDesc && truncateText(timeline?.shortDesc)}
                    </p>
                  </div>
                  <div style={{ width: "50px", marginLeft: "20px", marginBottom: "5px", display: "flex" }}>
                    <Link to={"/events/" + timeline?._id} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width: "50px" }} src={compass} alt="" />
                    </Link>
                    <Link to={timeline?.coordinates}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ marginLeft: "5px", width: "50px" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="col">
            <div className="card mt-4 h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Add New TimeLine</h5>
                <p className="card-text">
                  Add a new timeline and then proceed with adding sequence (SOE)
                  of events in it. This helps us broaden the journey.
                </p>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#modalForTimeline"
                  type="button"
                  className="btn btn-primary mt-auto"
                >
                  Add timeline
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" tabindex="-1" id="modalForTimeline">
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
                  <div className="my-3">
                    <label htmlFor="formFile" className="form-label">
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
                      onChange={uploadPhoto}
                      name="image"
                      className="form-control"
                      type="file"
                      id="formFile"
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
      </div>
    </>
  );
}
