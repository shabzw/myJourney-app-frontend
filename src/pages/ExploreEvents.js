import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import dataContext from "../context/data/dataContext";
import ImageGallery from "../components/ImageGallery";
import EventInfo from "../components/EventInfo";

export default function ExploreEvents() {
  const context = useContext(dataContext);
  const params = useParams();
  const { timelineEvent, getTimelineEvent } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const api = "gettimelineevent";
      const tId = params.tId;

      const eId = params.eId;
      //Function is defined in data context and returns an event as per params
      getTimelineEvent(api, eId, tId);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {timelineEvent?.events?.map((event, index) => (
        <div key={index}>
          <h1 className="text-center mb-4">
            Explore more about {event.eventName}
          </h1>
          <Link
            to={`/exploreForm/${params.eId}`}
            className="btn btn-primary mb-4"
          >
            Edit Data
          </Link>

          <div>
            <div className="row">
              <div className="col-md-4 col-sm-12 mb-4">
                <ul className="border border-black rounded p-2 list-unstyled">
                  <li>
                    <strong>Year:</strong> {event.date}
                  </li>
                  <li>
                    <strong>Place:</strong> {event.place}
                  </li>
                  <li>
                    <strong>Key Roles:</strong> {event.keyComponents}
                  </li>
                  <li>
                    <strong>Source:</strong> <Link> {event.source}</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-8 col-sm-12 border border-black rounded p-2 mb-3">
                <h4>Introduction :</h4>
                <p>{event.intro}</p>
              </div>
            </div>

            <div>
              {/* PHOTOS */}
              <ImageGallery event={event} index={index} />
              {/* Extra Components */}
              <div className="border border-gray-300 rounded my-3 p-2">
                <strong>Key Components/Roles :</strong> {event.keyComponents}
              </div>
              {/* Main Explanation */}
              <EventInfo event={event} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
