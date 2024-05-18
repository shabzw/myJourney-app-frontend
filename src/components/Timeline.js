import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import loadingGIF from "../assets/loading.gif";
import EventModal from "./EventModal";
import ImageGallery from "./ImageGallery";
import ToggleInfo from "./ToggleInfo";

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
      <EventModal setEventName={setEventName} setPeriod={setPeriod} setPara1={setPara1} setPara2={setPara2} loadingGIF={loadingGIF} handleSubmit={handleSubmit} loading={loading} uploadPhotos={uploadPhotos}/>

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
          className="btn btn-success"
          style={{ marginBottom: "20px" }}
        >
          Explore All Timelines
        </Link>
      </div>

      {events?.map((event, index) => (
        <>
         <ImageGallery event={event} index={index}/>

          {/* TOGGLE */}
         <ToggleInfo event={event} index={index}/>
        </>
      ))}
    </>
  );
}
