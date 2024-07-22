import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import loadingGIF from "../assets/loading.gif";
import compass from "../assets/icons8-compass (1).gif";
// import bg1 from "../assets/landingImage1.png";
import TimelineCard from "../components/TimelineCard";
import TimelineModal from "../components/TimelineModal";
import TimelineEditModal from "../components/TimelineEditModal";
// import DataState from "../context/data/DataState";
import dataContext from "../context/data/dataContext";

export default function MyTimelines(props) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const [timelines, setTimelines] = useState([
    localStorage.getItem("mytimelineD"),
  ]);
  const singleTimeline = localStorage.getItem("timelineSingle");
  const [photoThumbnails, setPhotoThumbnails] = useState([]);
  const [timelineName, setTimelineName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [loading, setLoading] = useState(null);
  const [coordinates, setCoordinates] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const context = useContext(dataContext);
  const { uploadPhoto } = context;
  const [timelineNameE, setTimelineNameE] = useState(
    singleTimeline?.timelineNameE
  );
  const [shortDescE, setShortDescE] = useState(singleTimeline?.shortDescE);
  const [coordinatesE, setCoordinatesE] = useState(
    singleTimeline?.coordinatesE
  );
  const [timelineIdE, setTimelineIdE] = useState("");
  const [photoThumbnailsE, setPhotoThumbnailsE] = useState([
    singleTimeline?.photoThumbnailsE,
  ]);
  const handleClick = (thumbnailsLength) => {
    // Increment currentIndex by 1, but loop back to 0 if currentIndex is at the end
    setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnailsLength);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(`${API_BASE_URL}/api/timeline/getmytimeline/`, {
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
          localStorage.setItem("mytimelineD", timelines);
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

  const timelinePhotoUpload = async (ev) => {
    setLoading(true);
    const data = await uploadPhoto(ev);
    console.log(data);
    console.log("doing");
    setPhotoThumbnails((prev) => [...prev, ...data]);
    setLoading(false);
  };

  const timelineEditPhotoUpload = async (ev) => {
    setLoading(true);
    const data = await uploadPhoto(ev);
    console.log(data);
    console.log("doing");
    setPhotoThumbnailsE((prev) => [...prev, ...data]);
    setLoading(false);
  };

  const handleSubmit = (isNew) => {
    //API call to add new timeline
    if (isNew) {
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
          console.error(
            "There was a problem with the upload operation:",
            error
          );
        });
    } else {
      fetch(`${API_BASE_URL}/api/timeline/edittimeline/`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timelineNameE,
          shortDescE,
          photoThumbnailsE,
          coordinatesE,
          timelineIdE,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          const updatedTimelines = data;
          setTimelines(updatedTimelines);
          props.showAlert("Timeline updated Successfully", "success");
        })
        .catch((error) => {
          console.error(
            "There was a problem with the upload operation:",
            error
          );
        });
    }
  };

  //Truncate text if data exceeds 25 characters
  function truncateText(text) {
    const words = text.split(" ");
    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "..."; // Join first 25 words and add ellipsis
    }
    return text;
  }

  const setTimelineData = (timelineData) => {
    setTimelineIdE(timelineData._id);
    setTimelineNameE(timelineData.timelineName);
    setCoordinatesE(timelineData.coordinates);
    setShortDescE(timelineData.shortDesc);
    setPhotoThumbnailsE(timelineData.photoThumbnails);
    localStorage.setItem("timelineSingle", timelineData);
  };

  const removePhoto = (ev, photo) => {
    ev.preventDefault();
    setPhotoThumbnailsE((prev) => prev.filter((image) => image != photo));
  };
  return (
    <>
      <div>
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
          setTimelineData={setTimelineData}
        />

        <TimelineModal
          setTimelineName={setTimelineName}
          setCoordinates={setCoordinates}
          setShortDesc={setShortDesc}
          timelinePhotoUpload={timelinePhotoUpload}
          handleSubmit={handleSubmit}
          loading={loading}
          loadingGIF={loadingGIF}
        />
        <TimelineEditModal
          setTimelineNameE={setTimelineNameE}
          setCoordinatesE={setCoordinatesE}
          setShortDescE={setShortDescE}
          setPhotoThumbnailsE={setPhotoThumbnailsE}
          timelineEditPhotoUpload={timelineEditPhotoUpload}
          handleSubmit={handleSubmit}
          loading={loading}
          loadingGIF={loadingGIF}
          timelineNameE={timelineNameE}
          shortDescE={shortDescE}
          photoThumbnailsE={photoThumbnailsE}
          coordinatesE={coordinatesE}
          removePhoto={removePhoto}
        />
      </div>
    </>
  );
}
