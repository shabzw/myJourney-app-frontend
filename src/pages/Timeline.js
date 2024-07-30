import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import loadingGIF from "../assets/loading.gif";
import EventModal from "../components/EventModal";
import ImageGallery from "../components/ImageGallery";
import ToggleInfo from "../components/ToggleInfo";
import EventEditModal from "../components/EventEditModal";
import dataContext from "../context/data/dataContext";

export default function Timeline(props) {
  const [photos, setPhotos] = useState([]);
  const [eventName, setEventName] = useState("");
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [period, setPeriod] = useState("");
  const [loading, setLoading] = useState(null);
  const [events, setEvents] = useState([localStorage.getItem("eventD")]);
  const [timelineDt, setTimelineDt] = useState(
    localStorage.getItem("timelineDataOfE")
  );
  const [eventNameE, setEventNameE] = useState("");
  const [para1E, setPara1E] = useState("");
  const [para2E, setPara2E] = useState("");
  const [periodE, setPeriodE] = useState("");
  const [eventId, setEventId] = useState("");
  const [photosE, setPhotosE] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const params = useParams();
  const navigate = useNavigate();
  const context = useContext(dataContext);
  const { uploadPhotos } = context;
  const location = useLocation();
  const { editPage } = location.state || { editPage: false };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //API call to get details of events
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
          localStorage.setItem("timelineDataOfE", timelineData);
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

  const eventPhotoUpload = async (ev) => {
    setLoading(true);
    const data = await uploadPhotos(ev);
    setPhotos((prev) => [...prev, ...data]);
    setLoading(false);
  };
  const eventEditPhotoUpload = async (ev) => {
    setLoading(true);
    const data = await uploadPhotos(ev);
    setPhotosE((prev) => [...prev, ...data]);
    setLoading(false);
  };

  const handleSubmit = (isNew) => {
    if (isNew) {
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
          console.error(
            "There was a problem with the upload operation:",
            error
          );
        });
    } else {
      fetch(`${API_BASE_URL}/api/events/editevent/`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timelineId: params.id,
          eventId: eventId,
          eventNameE,
          para1E,
          para2E,
          periodE,
          photosE,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          const editedEvents = data;
          setEvents(editedEvents);
          props.showAlert("Event updated Successfully", "success");
        })
        .catch((error) => {
          console.error(
            "There was a problem with the upload operation:",
            error
          );
        });
    }
  };

  const setEventData = (event) => {
    setEventId(event._id);
    setEventNameE(event.eventName);
    setPara1E(event.para1);
    setPara2E(event.para2);
    setPeriodE(event.period);
    setPhotosE(event.photos);
  };

  const removePhoto = (ev, photo) => {
    ev.preventDefault();
    setPhotosE((prev) => prev.filter((image) => image != photo));
  };

  const deleteEvent = (delEventId, timelineId) => {
    fetch(`${API_BASE_URL}/api/events/deleteevent/`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        delEventId,
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
        setEvents(data);
        props.showAlert("Event Deleted Successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the delete operation:", error);
      });
  };

  return (
    <>
      {!editPage ? (
        <>
          <h1
            className="mb-3 text-center"
            style={{ fontFamily: "Dancing Script" }}
          >
            Historic Events from {timelineDt?.timelineName}
          </h1>
          <div className="text-center">
            <p className="">{timelineDt?.shortDesc}</p>
          </div>
        </>
      ) : (
        <h1
          className="mb-3 text-center"
          style={{ fontFamily: "Dancing Script" }}
        >
          Create & Edit Events from {timelineDt?.timelineName}
        </h1>
      )}
      {/*===========MODALS======= */}
      <EventModal
        setEventName={setEventName}
        setPeriod={setPeriod}
        setPara1={setPara1}
        setPara2={setPara2}
        loadingGIF={loadingGIF}
        handleSubmit={handleSubmit}
        loading={loading}
        uploadPhotos={uploadPhotos}
        eventPhotoUpload={eventPhotoUpload}
      />
      <EventEditModal
        setEventName={setEventNameE}
        setPeriod={setPeriodE}
        setPara1E={setPara1E}
        setPara2E={setPara2E}
        setPhotosE={setPhotosE}
        eventNameE={eventNameE}
        periodE={periodE}
        para1E={para1E}
        para2E={para2E}
        loadingGIF={loadingGIF}
        handleSubmit={handleSubmit}
        loading={loading}
        photosE={photosE}
        // uploadPhotos={uploadPhotos}
        eventEditPhotoUpload={eventEditPhotoUpload}
        removePhoto={removePhoto}
      />

      {/* =============================== */}

      <div className="d-flex justify-content-center gap-3">
      {editPage && 
      <button
          data-bs-toggle="modal"
          data-bs-target="#modalForEvents"
          type="button"
          className="btn btn-primary"
          style={{ marginBottom: "20px" }}
        >
          Add New Event
        </button>}
        
        {!editPage && (
          <Link
            to={"/explore"}
            type="button"
            className="btn btn-success"
            style={{ marginBottom: "20px" }}
          >
            Explore All Timelines
          </Link>
        )}
      </div>

      {events?.map((event, index) => (
        <>
          <ImageGallery event={event} index={index} />

          {/* TOGGLE */}
          <ToggleInfo
            event={event}
            index={index}
            setEventData={setEventData}
            editPage={editPage}
            deleteEvent={deleteEvent}
          />
        </>
      ))}
    </>
  );
}
