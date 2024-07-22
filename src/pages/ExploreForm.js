import React, { useContext, useEffect, useState } from "react";
import loadingGIF from "../assets/loading.gif";
import { useParams } from "react-router-dom";
import MoreInfoModal from "../components/MoreInfoModal";
import dataContext from "../context/data/dataContext";

export default function ExploreForm(props) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  //States used
  const [singleEventData, setSingleEventData] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [source, setSource] = useState("");
  const [intro, setIntro] = useState("");
  const [keyComponents, setKeyComponents] = useState("");
  const [loading, setLoading] = useState(false);
  // const [paraTemp1, setParaTemp1] = useState("");
  const [paraTemp, setParaTemp] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [headings, setHeadings] = useState([]);
  const [images, setImages] = useState([]);
  const [imageTemp, setImageTemp] = useState("");
  // const [imageTemp1, setImageTemp1] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [headingTemp, setHeadingTemp] = useState("");
  // const [headingTemp1, setHeadingTemp1] = useState("");
  // const [indexD, setIndexD] = useState("");
  const params = useParams();
  const [saveCount, setSaveCount] = useState(0);
  const [auth, setAuth] = useState(false);

  const context = useContext(dataContext);
  const { uploadTempPhoto } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(`${API_BASE_URL}/api/events/getsingleevent/`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          eventid: params.eventId,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          const sEData = data;
          // update corresponding states to prepopulate values in form
          setSingleEventData(sEData);
          setParagraphs(data.paragraphs);
          setDate(data.date);
          setHeadings(data.headings);
          setImages(data.images);
          setPlace(data.place);
          setIntro(data.intro);
          setSource(data.source);
          setKeyComponents(data.keyComponents);

          if (sEData.ownerId === localStorage.getItem("userId")) {
            setAuth(true);
          }
        })
        .catch((error) => {
          console.error(
            "There was a problem with the upload operation:",
            error
          );
        });
    }
    console.log("useEffect runs");
  }, []);
  const handleAddInfoClick = () => {
    // toggle form visibility
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = () => {
    // API call to update event
    fetch(`${API_BASE_URL}/api/events/updateevents/`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
        eventId: params.eventId,
      },
      body: JSON.stringify({
        date,
        place,
        source,
        intro,
        keyComponents,
        headings,
        images,
        paragraphs,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        props.showAlert("Timeline added Successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  };

  //Submit Request function

  const handleRequest = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/tempevents/addtempevent/`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: params.eventId,
        eventName: singleEventData.eventName,
        ownerId: singleEventData.ownerId,
        userId: localStorage.getItem("userId"),
        date,
        place,
        source,
        intro,
        keyComponents,
        headings,
        images,
        paragraphs,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        props.showAlert("Request sent Successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  };
  function uploadPhoto(ev) {
    setLoading(true);

    const file = ev.target.files[0];
    //Create a new formData to store image details
    const data = new FormData();
    data.append("photo", file);
    //API call to add single photo
    fetch(`${API_BASE_URL}/api/events/uploadsingle/`, {
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
        const filename = data.imageUrl;
        setImageTemp(filename);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  }

  const infoPhoto = async (ev, index) => {
    setLoading(true);
    const data = await uploadTempPhoto(ev);

    if (data) {
      setImages((photos) => {
        const updatedPhotos = [...photos]; // Create a copy of the photos array
        updatedPhotos[index] = data; // Update the specific index
        return updatedPhotos; // Return the new array
      });
    } else {
      console.error("Failed to upload photo");
    }

    setLoading(false);
  };

  console.log(images, "these are images after upload");

  const handleDoneClick = (ev) => {
    ev.preventDefault();

    setIsFormVisible(false);
    if (!headingTemp && !imageTemp && !paraTemp) {
      return props.showAlert("Please add the information", "danger");
    }

    setHeadings((prev) => {
      return [...prev, headingTemp];
    });
    setHeadingTemp("");

    setImages((prev) => {
      return [...prev, imageTemp];
    });
    setImageTemp("");

    setParagraphs((prev) => {
      return [...prev, paraTemp];
    });
    setParaTemp("");
    props.showAlert(
      "Saved. Please submit the form to apply changes",
      "success"
    );
    setSaveCount(saveCount + 1);
  };

  // =============================================
  // Function to truncate text after 25 characters are read

  // function truncateText(text) {
  //   if (!text) {
  //     return ""; // Return an empty string if paragraph is undefined
  //   }
  //   const words = text.split(" ");
  //   if (words.length > 25) {
  //     return words.slice(0, 25).join(" ") + "..."; // Join first 25 words and add ellipsis
  //   }
  //   return text;
  // }
  // ==============================================

  const handleHeadingChange = (e, index) => {
    const newHeadings = [...headings];
    newHeadings[index] = e.target.value;
    setHeadings(newHeadings);
  };

  const handleParagraphChange = (e, index) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = e.target.value;
    setParagraphs(newParagraphs);
  };

  console.log(headings, paragraphs);
  return (
    <div>
      {/* ADD INFO OF AN EVENT*/}
      <div className="container mt-2">
        <h1>Add more info to explore</h1>
        <form>
          <div className="mb-3">
            <label
              htmlfor="name"
              className="form-label"
              style={{ marginTop: "15px" }}
            >
              Date Of Occurance
            </label>
            <input
              type="text"
              className="form-control"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-describedby="emailHelp"
            />

            <label
              htmlfor="email"
              className="form-label"
              style={{ marginTop: "15px" }}
            >
              Place of Occurance
            </label>
            <input
              type="text"
              className="form-control"
              id="place"
              name="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlfor="source" className="form-label">
              Source or external links
            </label>
            <input
              type="text"
              className="form-control"
              id="source"
              name="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlfor="intro" className="form-label">
              Introduction
            </label>
            <input
              type="text"
              className="form-control"
              id="intro"
              name="intro"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              required
              minLength={5}
            />
          </div>
          <div>
            <label htmlfor="keyComponents" className="form-label">
              Key Components (Ex: Usage of Sewing machine, Horse Carriage usage,
              so on...)
            </label>
            <input
              type="text"
              className="form-control"
              id="keyComponents"
              name="keyComponents"
              value={keyComponents}
              onChange={(e) => setKeyComponents(e.target.value)}
              required
              minLength={5}
            />
          </div>

          <div>
            <div
              className="mt-4 border border-gray-600 p-3"
              style={{ backgroundColor: "rgb(235, 235, 235)" }}
            >
              <h4>More Information</h4>
              {singleEventData?.headings?.map((heading, index) => (
                <div key={index} className="border-bottom mb-3 p-2">
                  <input
                    type="text"
                    className="form-control mb-3"
                    name="heading"
                    placeholder="Heading"
                    value={headings[index]}
                    onChange={(e) => handleHeadingChange(e, index)}
                  />

                  <div className="mb-3">
                    <label for="formFileMultiple" className="form-label">
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
                      name="image"
                      className="form-control mb-3"
                      type="file"
                      id="formFileMultiple"
                      single
                      onChange={(e) => infoPhoto(e, index)}
                    />
                    <div className="mb-3">
                      {images && (
                        <img
                          style={{ width: "300px", height: "auto" }}
                          src={images[index]}
                          alt={index}
                        />
                      )}
                    </div>
                  </div>

                  <textarea
                    name="paragraph"
                    className="form-control mb-3"
                    placeholder="Paragraph"
                    value={paragraphs[index]}
                    onChange={(e) => handleParagraphChange(e, index)}
                  />
                </div>
              ))}
            </div>

            {/* ============================= */}
            {/* Form to add new Information */}
            <div className="border border-gray-300 p-3 my-3">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                {saveCount != 0 && (
                  <span
                    className="px-2 py-1 rounded"
                    style={{ backgroundColor: "rgb(210,210,210)" }}
                  >
                    {saveCount} data saved. Submit form to update
                  </span>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddInfoClick}
                >
                  Add More Information
                </button>
              </div>

              {isFormVisible && (
                <div>
                  <div>
                    <input
                      type="text"
                      className="form-control my-3"
                      name="heading"
                      placeholder="Heading"
                      onChange={(e) => setHeadingTemp(e.target.value)}
                    />

                    <div className="mb-3">
                      <label for="formFileMultiple" className="form-label">
                        Upload Images{" "}
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
                        name="image"
                        className="form-control mb-3"
                        type="file"
                        id="formFileMultiple"
                        single
                        onChange={(ev) => uploadPhoto(ev)}
                      />
                    </div>

                    <textarea
                      name="paragraph"
                      className="form-control mb-3"
                      placeholder="Paragraph"
                      onChange={(e) => setParaTemp(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleDoneClick}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
            {/* ============================== */}
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className="btn btn-danger"
            style={{ marginBottom: "15px", marginTop: "15px" }}
            disabled={!auth}
          >
            Submit Form
          </button>
          <button
            onClick={handleRequest}
            type="button"
            className="btn btn-secondary mx-2"
            style={{ marginBottom: "15px", marginTop: "15px" }}
            disabled={auth}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
