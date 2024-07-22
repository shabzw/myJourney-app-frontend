import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TimelineCard({
  timelines,
  currentIndex,
  truncateText,
  handleClick,
  compass,
  setTimelineData,
  editPage,
  showModal,
  handleDelete,
  setShowModal,
}) {
  console.log(editPage);
  const navigate = useNavigate();
  const handleNav = (timeline) => {
    navigate(`/events/${timeline?._id}`, { state: { editPage } });
  };
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5">
      {timelines?.map((timeline, index) => {
        const thumbnailsLength = timeline?.photoThumbnails?.length || 0;
        const displayIndex =
          currentIndex >= thumbnailsLength
            ? thumbnailsLength - 1
            : currentIndex;

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
              <div
                style={{
                  width: "50px",
                  marginLeft: "20px",
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => handleNav(timeline)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <img style={{ width: "50px" }} src={compass} alt="" />
                </div>
                <Link to={timeline?.coordinates}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    style={{ marginLeft: "5px", width: "50px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </Link>
                {editPage && (
                  <>
                    <Link
                      onClick={() => setTimelineData(timeline)}
                      className=""
                      data-bs-toggle="modal"
                      data-bs-target="#modalForTimelineEdit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                        style={{ marginLeft: "5px", width: "50px" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                    <Link
                      onClick={() => setShowModal(true)}
                      className=""
                      style={{ display: "inline-block" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                        style={{ width: "50px" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </Link>

                    {showModal && (
                      <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Confirm Deletion</h5>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                              ></button>
                            </div>
                            <div className="modal-body">
                              <p>
                                Deleting this timeline will also delete all the
                                events associated to it. Do you still want to
                                proceed?
                              </p>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDelete(timeline._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {editPage && (
        <div className="col">
          <div className="card mt-4 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Add New TimeLine</h5>
              <p className="card-text">
                Add a new timeline and then proceed with adding sequence of
                events (SOE) in it. This helps us broaden the journey.
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
      )}
    </div>
  );
}
