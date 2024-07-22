import React, { useState } from "react";
import DataContext from "./dataContext";

export default function DataState(props) {
  const [eData, setEData] = useState([localStorage.getItem("eData")]);
  const [timelineEvent, setTimelineEvent] = useState([
    localStorage.getItem("timelineEvent"),
  ]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  //Function to fetch event with respect to timelines
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

  //Function to fetch events data by populating it inside timeline schema
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

  async function uploadPhoto(ev) {
    const files = ev.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/timeline/upload/`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Parse the JSON from the response
      console.log("Response data:", data); // Log the response data

      if (data && data.filenames && Array.isArray(data.filenames)) {
        const filenames = data.filenames;
        console.log("Filenames:", filenames); // Log the filenames
        return filenames; // Return the filenames array
      } else {
        console.error("Invalid response format:", data);
        return [];
      }
    } catch (error) {
      console.error("There was a problem with the upload operation:", error);
      return [];
    }
  }

  const uploadPhotos = async (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/upload`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: data,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataFiles = await response.json(); // Parse the JSON from the response
      console.log("Response data:", data); // Log the response data

      if (
        dataFiles &&
        dataFiles.filenames &&
        Array.isArray(dataFiles.filenames)
      ) {
        const filenames = dataFiles.filenames;
        console.log("Filenames:", filenames); // Log the filenames
        return filenames; // Return the filenames array
      } else {
        console.error("Invalid response format:", data);
        return [];
      }
    } catch (error) {
      console.error("There was a problem with the upload operation:", error);
      return [];
    }
  };

  const uploadTempPhoto = async (ev) => {
    const file = ev.target.files[0];
    const data = new FormData();
    data.append("photo", file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/events/uploadsingle/`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json(); // Parse the JSON from the response
      const filename = result.imageUrl;
      console.log(filename, "userC");
      return filename; // Return the filename
    } catch (error) {
      console.error("There was a problem with the upload operation:", error);
      return null; // Return null in case of error
    }
  };

  return (
    <DataContext.Provider
      value={{
        eData,
        getEData,
        getTimelineEvent,
        timelineEvent,
        uploadPhoto,
        uploadPhotos,
        uploadTempPhoto,
      }}
    >
      {props.children};
    </DataContext.Provider>
  );
}
