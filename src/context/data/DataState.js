import React, { useState } from "react";
import DataContext from "./dataContext";

export default function DataState(props) {
  const [eData, setEData] = useState([localStorage.getItem("eData")]);
  const [timelineEvent, setTimelineEvent] = useState([
    localStorage.getItem("timelineEvent"),
  ]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const getTimelineEvent = (api, tId, eId) => {
    fetch(`${API_BASE_URL}/api/events/${api}/`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        eventId: eId,
        timelineId: tId,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        const timelineevent = data;
        setTimelineEvent(timelineevent);
        localStorage.setItem("timelineEvent", timelineevent);
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  };

  const getEData = () => {
    if (localStorage.getItem("token")) {
      fetch(`${API_BASE_URL}/api/events/getEdata/`, {
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
          const eD = data;
          setEData(eD);
          localStorage.setItem("eData", eD);
        })
        .catch((error) => {
          console.error(
            "There was a problem with the upload operation:",
            error
          );
        });
    }
  };

  return (
    <DataContext.Provider
      value={{ eData, getEData, getTimelineEvent, timelineEvent }}
    >
      {props.children};
    </DataContext.Provider>
  );
}
