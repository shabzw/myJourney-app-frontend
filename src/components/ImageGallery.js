import React from 'react'

export default function ImageGallery({event, index}) {
  return (
    <div
    id={`carouselExampleCaptions-${index}`}
    className="carousel slide"
  >
    <div className="carousel-indicators">
      {event?.photos?.map((photo, photoIndex) => (
        <button
          type="button"
          data-bs-target={`#carouselExampleCaptions-${index}`}
          data-bs-slide-to={photoIndex}
          className={photoIndex === 0 ? "active" : ""}
          aria-current={photoIndex === 0}
          aria-label={`Slide ${photoIndex + 1}`}
        ></button>
      ))}
    </div>
    <div className="carousel-inner">
      {event?.photos?.map((photo, photoIndex) => (
        <div
          className={`carousel-item ${
            photoIndex === 0 ? "active" : ""
          }`}
        >
          <img src={photo} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h1>{event?.eventName}</h1>
            <h5>{event?.period}</h5>
          </div>
        </div>
      ))}
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target={`#carouselExampleCaptions-${index}`}
      data-bs-slide="prev"
    >
      <span
        className="carousel-control-prev-icon"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target={`#carouselExampleCaptions-${index}`}
      data-bs-slide="next"
    >
      <span
        className="carousel-control-next-icon"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  )
}
