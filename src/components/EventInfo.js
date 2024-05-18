import React from 'react'

export default function EventInfo({event}) {
  return (
    <div>
                {event.headings.map((heading, idx) => (
                  <div key={idx} className="p-2">
                    {<h3 className="mb-3">{heading} -</h3>}
                    {event.images[idx] && (
                      <div className="d-flex justify-content-center">
                        <img
                          className="img-fluid mb-4 mx-auto"
                          style={{ width: "70%", height: "auto" }}
                          src={event.images[idx]}
                          alt={`Image ${idx}`}
                        />
                      </div>
                    )}
                    {<p className="mt-2">{event.paragraphs[idx]}</p>}
                  </div>
                ))}
              </div>
  )
}
