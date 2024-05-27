import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loadingGIF from "../assets/loading.gif";
import compass from "../assets/icons8-compass (1).gif";
import bg1 from "../assets/landingImage1.png";
import TimelineCard from "./TimelineCard";
import TimelineModal from "./TimelineModal";

export default function Home(props) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const [timelines, setTimelines] = useState([
    localStorage.getItem("timelineD"),
  ]);

  const [photoThumbnails, setPhotoThumbnails] = useState([]);
  const [timelineName, setTimelineName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [loading, setLoading] = useState(null);
  const [coordinates, setCoordinates] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translate, setTranslate] = useState(false);

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
    //create a formData to store data of images selected
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
    //API call to add new timeline
    fetch(`${API_BASE_URL}/api/timeline/addtimeline/`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timelineName,
        shortDesc,
        photoThumbnails,
        coordinates,
      }),
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

  //Truncate text if data exceeds 25 characters
  function truncateText(text) {
    const words = text.split(" ");
    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "..."; // Join first 25 words and add ellipsis
    }
    return text;
  }

  return (
    <>
      <div>
        <div style={{ display: "flex", marginBottom: "5px" }}>
          <h1
            onClick={() => setTranslate(!translate)}
            style={{
              cursor: "pointer",
              fontFamily: "Dancing Script",
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
            <h4>Also add the timelines yourself</h4>
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
        <TimelineCard
          timelines={timelines}
          currentIndex={currentIndex}
          handleClick={handleClick}
          truncateText={truncateText}
          compass={compass}
        />

        <TimelineModal
          setTimelineName={setTimelineName}
          setCoordinates={setCoordinates}
          setShortDesc={setShortDesc}
          uploadPhoto={uploadPhoto}
          handleSubmit={handleSubmit}
          loading={loading}
          loadingGIF={loadingGIF}
        />
      </div>
    </>
  );
}
