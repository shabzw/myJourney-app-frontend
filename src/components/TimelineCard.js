import React from 'react'
import { Link } from 'react-router-dom';

export default function TimelineCard({timelines, currentIndex, truncateText, handleClick, compass}) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5">
          {timelines?.map((timeline, index) => {
            const thumbnailsLength = timeline?.photoThumbnails?.length || 0;
            const displayIndex = currentIndex >= thumbnailsLength ? thumbnailsLength - 1 : currentIndex;

            return (
              <div key={timeline?.id} className="col">
                <div className="card mt-4 h-100">
                  {thumbnailsLength > 0 && (
                    <img
                      src={timeline.photoThumbnails[displayIndex]}
                      className="card-img-top img-fluid"
                      alt="..."
                      style={{ objectFit: "cover", height: "200px" }}
                      onClick={() => handleClick(thumbnailsLength)}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{timeline?.timelineName}</h5>
                    <p className="card-text">
                      {timeline?.shortDesc && truncateText(timeline?.shortDesc)}
                    </p>
                  </div>
                  <div style={{ width: "50px", marginLeft: "20px", marginBottom: "5px", display: "flex" }}>
                    <Link to={"/events/" + timeline?._id} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width: "50px" }} src={compass} alt="" />
                    </Link>
                    <Link to={timeline?.coordinates}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ marginLeft: "5px", width: "50px" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="col">
            <div className="card mt-4 h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Add New TimeLine</h5>
                <p className="card-text">
                  Add a new timeline and then proceed with adding sequence
                  of events (SOE) in it. This helps us broaden the journey.
                </p>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#modalForTimeline"
                  type="button"
                  className="btn btn-primary mt-auto"
                >
                  Add timeline
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}
