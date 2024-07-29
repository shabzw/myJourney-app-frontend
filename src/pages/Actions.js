import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OwnerViewModal from "../components/OwnerViewModal";
import STATUS_ENUM from "../statusEnum";
import UserRequestModal from "../components/UserRequestModal";
import loadingGIF from "../assets/loading.gif";

const Actions = (props) => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(`${API_BASE_URL}/api/tempevents/gettempevents/`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          userId: localStorage.getItem("userId"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          const sEData = data.data;
          // update corresponding states to prepopulate values in form
          setEvents(sEData);
          localStorage.setItem("tempevents", data.data);
        })
        .catch((error) => {
          console.error(
            "There was a problem with the upload operation:",
            error
          );
        });
    }else {
      navigate("/login");
    }
  }, []);
  const handleReject = (e, eventId) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/tempevents/rejectrequest/`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: STATUS_ENUM.REJECT,
        eventId: eventId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        props.showAlert("Request Rejected", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  };

  const handleApprove = (e, event) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/tempevents/approverequest/`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: STATUS_ENUM.APPROVE,
        tempEventId: event?._id,
        eventId: event?.eventId,
        date: event?.date,
        place: event?.place,
        source: event?.source,
        intro: event?.intro,
        keyComponents: event?.keyComponents,
        headings: event?.headings,
        paragraphs: event?.paragraphs,
        images: event?.images,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        props.showAlert("Request Approved Successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  };

  const updateEvent = (eventN) => {
    setEventName(eventN);
  };

  const requestDelete = (e, requestId) => {
    e.stopPropagation();
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/tempevents/deleterequest/`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId,
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
        props.showAlert("Request Deleted Successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  };

  return (
    <div>
      <h3 className="mb-3">Requests & Actions</h3>
      {events?.map((event) =>
        event?.ownerId === localStorage.getItem("userId") &&
        event?.status === "pending" ? (
          <>
            <div>
              <Link
                key={event?._id}
                className="container mt-2 text-decoration-none"
                data-bs-toggle="modal"
                data-bs-target="#modalForOwnerView"
                onClick={() => updateEvent(event)}
              >
                <div className="alert alert-secondary d-flex justify-content-between align-items-center">
                  <div className="container mt-3">
                    <div className="mb-2 p-2 border rounded">
                      <h5 className="mb-1 text-danger">Action Required</h5>
                      <h5 className="mb-1">{event?.eventName}</h5>
                      <h6 className="mb-1 text-secondary">{event?.status}</h6>
                    </div>
                  </div>
                  <h5>
                    <span className="badge text-bg-danger">New</span>
                  </h5>
                </div>
              </Link>
              <OwnerViewModal
                event={eventName}
                handleReject={handleReject}
                handleApprove={handleApprove}
              />
            </div>
          </>
        ) : event?.userId === localStorage.getItem("userId") ? (
          <div>
            <div
              key={event?._id}
              className="alert alert-secondary d-flex justify-content-between align-items-center"
            >
              <div className="container mt-3">
                <div className="mb-2 p-2 border rounded">
                  <Link
                    data-bs-toggle="modal"
                    data-bs-target="#modalForUserRequest"
                    onClick={() => updateEvent(event)}
                    className="mb-1 text-decoration-none"
                  >
                    <h5>{event?.eventName}</h5>
                  </Link>
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ marginTop: "15px" }}
                  >
                    <h6 className="mb-1 text-secondary mr-2">
                      status: <strong>{event?.status}</strong>
                    </h6>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        requestDelete(e, event?._id);
                      }}
                      style={{ cursor: "pointer", marginLeft: "auto" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <UserRequestModal
              event={eventName}
              STATUS_ENUM={STATUS_ENUM}
              setEvents={setEvents}
              showAlert={props.showAlert}
              loadingGIF={loadingGIF}
            />
          </div>
        ) : (
          "There are no tasks at the moment."
        )
      )}
    </div>
  );
};

export default Actions;
