import React, { useState, Fragment, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loadingGIF from "../assets/loading.gif";
import compass from "../assets/icons8-compass (1).gif";
import bg1 from "../assets/landingImage1.png";
import TimelineCard from "../components/TimelineCard";
import TimelineModal from "../components/TimelineModal";
import TimelineEditModal from "../components/TimelineEditModal";
import dataContext from "../context/data/dataContext";

export default function Home(props) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [timelines, setTimelines] = useState([]);
  const singleTimeline = localStorage.getItem("timelineSingle");
  const [photoThumbnails, setPhotoThumbnails] = useState([]);
  const [timelineName, setTimelineName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [loading, setLoading] = useState(null);
  const [coordinates, setCoordinates] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translate, setTranslate] = useState(false);
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
  const [editPage, setEditPage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (thumbnailsLength) => {
    // Increment currentIndex by 1, but loop back to 0 if currentIndex is at the end
    setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnailsLength);
  };

  useEffect(() => {
    // Load timelines from local storage when the component mounts
    const storedTimelines =
      pathname === "/mytimelines"
        ? localStorage.getItem("mytimelineD")
        : localStorage.getItem("timelineD");
    if (storedTimelines) {
      setTimelines(JSON.parse(storedTimelines));
    }

    // Fetch timelines from the API
    const fetchTimelines = async () => {
      const endpoint =
        pathname === "/mytimelines"
          ? "/api/timeline/getmytimeline/"
          : "/api/timeline/gettimeline/";
      setEditPage(pathname === "/mytimelines");

      if (localStorage.getItem("token")) {
        try {
          const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setTimelines(data);

          const storageKey =
            pathname === "/mytimelines" ? "mytimelineD" : "timelineD";
          localStorage.setItem(storageKey, JSON.stringify(data));
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      } else {
        navigate("/login");
      }
    };

    fetchTimelines();
  }, [pathname]);

  const timelinePhotoUpload = async (ev) => {
    setLoading(true);
    const data = await uploadPhoto(ev);
    setPhotoThumbnails((prev) => [...prev, ...data]);
    setLoading(false);
  };

  const timelineEditPhotoUpload = async (ev) => {
    setLoading(true);
    const data = await uploadPhoto(ev);
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

  const deleteTimeline = (timelineId) => {
    fetch(`${API_BASE_URL}/api/timeline/deletetimeline/`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timelineId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        setTimelines(data);
        props.showAlert("Timeline Deleted Successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the delete operation:", error);
      });
  };

  const handleDelete = (timelineId) => {
    deleteTimeline(timelineId);
    setShowModal(false); // Close the modal after deletion
  };

  return (
    <>
      <div>
        {!editPage && (
          <>
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
          </>
        )}

        <div className="row">
          <div className="col text-center">
            {!editPage ? (
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
            ) : (
              <h1
                style={{
                  marginTop: "20px",
                  backgroundColor: "rgba(211, 211, 211, 0.5)",
                  padding: "5px",
                  fontFamily: "Dancing Script",
                }}
              >
                Create And Edit Your Timelines
              </h1>
            )}
          </div>
        </div>
        <TimelineCard
          timelines={timelines}
          currentIndex={currentIndex}
          handleClick={handleClick}
          truncateText={truncateText}
          compass={compass}
          setTimelineData={setTimelineData}
          editPage={editPage}
          deleteTimeline={deleteTimeline}
          handleDelete={handleDelete}
          setShowModal={setShowModal}
          showModal={showModal}
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
