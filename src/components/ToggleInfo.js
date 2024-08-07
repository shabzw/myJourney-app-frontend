import React from "react";
import { Link } from "react-router-dom";

export default function ToggleInfo({
  event,
  index,
  setEventData,
  editPage,
  deleteEvent,
}) {
  return (
    <div style={{ marginTop: "10px", marginBottom: "30px" }}>
      <p class="d-inline-flex gap-1 justify-center">
        <a
          class="btn btn-primary flex my-auto"
          data-bs-toggle="collapse"
          href={`#multiCollapseExample1-${index}`}
          role="button"
          aria-expanded="false"
          aria-controls={`#multiCollapseExample1-${index}`}
        >
          Information
        </a>
        <button
          class="btn btn-primary flex my-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#multiCollapseExample2-${index}`}
          aria-expanded="false"
          aria-controls={`#multiCollapseExample2-${index}`}
        >
          Read More
        </button>
        {editPage && (
          <>
            <Link
              onClick={() => setEventData(event)}
              className=""
              data-bs-toggle="modal"
              data-bs-target="#modalForEditEvents"
              style={{ display: "inline-block", marginRight: "10px" }}
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
              onClick={() => deleteEvent(event._id, event.timelineId)}
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
          </>
        )}
      </p>
      <div class="row">
        <div class="col">
          <div
            class="collapse multi-collapse"
            id={`multiCollapseExample1-${index}`}
          >
            <div class="card card-body">{event?.para1}</div>
          </div>
        </div>
        <div class="col">
          <div
            class="collapse multi-collapse"
            id={`multiCollapseExample2-${index}`}
          >
            <div class="card card-body">{event?.para2}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
