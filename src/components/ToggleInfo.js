import React from 'react'

export default function ToggleInfo({event, index}) {
  return (
    <div style={{ marginTop: "10px", marginBottom: "30px" }}>
    <p class="d-inline-flex gap-1">
      <a
        class="btn btn-primary"
        data-bs-toggle="collapse"
        href={`#multiCollapseExample1-${index}`}
        role="button"
        aria-expanded="false"
        aria-controls={`#multiCollapseExample1-${index}`}
      >
        Information
      </a>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#multiCollapseExample2-${index}`}
        aria-expanded="false"
        aria-controls={`#multiCollapseExample2-${index}`}
      >
        Read More
      </button>
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
  )
}
