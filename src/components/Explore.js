import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dataContext from '../context/data/dataContext';

export default function Explore() {
  const context = useContext(dataContext);
  const {getEData, eData} = context;
    const navigate = useNavigate()
    // const API_BASE_URL =process.env.REACT_APP_API_BASE_URL
    
    useEffect(()=>{
        if (localStorage.getItem("token")){
          getEData();
        } else {
          navigate("/login");
        }
    },[])

  return (
    <div>
      <h1 className="mb-3 text-center rounded py-1" style={{ fontFamily: "Satisfy", backgroundColor: "rgb(211,211,211)" }}>
        Explore all timelines and experience more...
      </h1>
      <hr />
      <div className="container-fluid" style={{ marginBottom: "30px" }}>
        {eData?.map((data) => (
          <div key={data?.id} className="mb-4 px-2 rounded border-bottom" style={{ marginTop: "40px" }}>
            <h2 className="text-center" style={{ fontFamily: "Dancing Script", fontWeight: "bold" }}>{data?.timelineName}</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 my-3 g-4">
              {data?.events?.map((event) => (
                <div key={event?._id} className="col">
                  <div className="card" style={{ width: "100%", height: "15rem", marginBottom: "10px" }}>
                    <div className="card d-flex flex-column" style={{ height: "100%", backgroundImage: `url(${event.photos[0]})`, backgroundSize: 'cover', position: 'relative' }}>
                      <div className="card-body" style={{ position: "relative" }}>
                        <span className="text-white card-title z-10 px-2 py-1 rounded" style={{backgroundColor:"rgb(70, 70, 70)"}}>{event?.eventName}</span>
                        <Link to={"/explore/" + event?.timelineId + "/" + event?._id} className="btn btn-primary" style={{ bottom: "10px", right: "10px", position: 'absolute' }}>Explore</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
