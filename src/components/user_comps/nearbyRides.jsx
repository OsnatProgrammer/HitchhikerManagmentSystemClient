import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';
import RideOfferItem from './rideOfferItem';
import RideRequestItem from './rideRequestItem';
import Loading from '../general_comps/loading';


export const getAllridesRequestsOpen = async () => {
  let url = API_URL + "/rideRequests/getAllridesRequestsOpen";
  try {
    const response = await doApiGet(url);
    console.log("Requests", response);
    const ridesRequests = response.data.ar_rideRequests;
    console.log(ridesRequests);
    return ridesRequests;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch ridesRequests");
  }
};

export const getAllridesoffersOpen = async () => {
  let url = API_URL + "/rideoffers/getAllridesoffersOpen";
  try {
    const response = await doApiGet(url);
    console.log("Offer", response);
    const ridesoffers = response.data.ar_rideoffers;
    console.log(ridesoffers);
    return ridesoffers;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch ridesoffers");
  }
};


export default function NearbyRides() {
  const [ridesRequests, setRidesRequests] = useState([]);
  const [ridesoffers, setridesoffers] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    async function fetchrides() {
      try {
        const ridesRequestsData = await getAllridesRequestsOpen();
        setRidesRequests(ridesRequestsData);
        const ridesoffersData = await getAllridesoffersOpen();
        setridesoffers(ridesoffersData);

      } catch (err) {
        console.log(err);
      }
    }
    fetchrides();
    // setRefreshFlag(false)
  }, [refreshFlag]);

  return (
    <div className='container'>
      <h2 className='m-3 mt-5 font-weight-bold text-light mt-5'>Rides Requests: </h2>
      <div className='row g-3'>
        {/* {ridesRequests.map((item, i) => {
          return (
            <RideRequestItem key={i} item={item} refreshFlag={refreshFlag} setRefreshFlag={setRefreshFlag} />
          )
        })} */}

        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {ridesRequests.length > 0 && (
              <>
                {ridesRequests.reduce((result, item, index) => {
                  if (index % 3 === 0) {
                    const carouselItem = ridesRequests.slice(index, index + 3);
                    result.push(
                      <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <div className="d-flex">
                          {carouselItem.map((ride, i) => (
                            <div key={i} className="col-md-4 border border-5 border-black">
                              <RideRequestItem item={ride} setRefreshFlag={setRefreshFlag} />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return result;
                }, [])}
              </>
            )}
          </div>
          <button className="carousel-control-prev" style={{top:63, left: -103}} type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" style={{top:63, right: -103}} type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>


        {ridesRequests.length < 1 && <Loading/>}
      </div>
      <div className='row g-3'>
        <h2 className='m-3 font-weight-bold text-light mt-5'>Rides Offers: </h2>
        {/* {ridesoffers.map((item,i) => {
          return (
            <RideOfferItem key={i} item={item} setRefreshFlag = {setRefreshFlag}/>
          )
        })} */}

        <div id="carouselExampleInterval2" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {ridesoffers.length > 0 && (
              <>
                {ridesoffers.reduce((result, item, index) => {
                  if (index % 3 === 0) {
                    const carouselItem = ridesoffers.slice(index, index + 3);
                    result.push(
                      <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <div className="d-flex">
                          {carouselItem.map((ride, i) => (
                            <div key={i} className="col-md-4 border border-5 border-black">
                              <RideOfferItem item={ride} setRefreshFlag={setRefreshFlag} />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return result;
                }, [])}
              </>
            )}
          </div>
          <button className="carousel-control-prev" style={{top:63, left: -103}} type="button" data-bs-target="#carouselExampleInterval2" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" style={{top:63, right: -103}} type="button" data-bs-target="#carouselExampleInterval2" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {ridesoffers.length < 1 && <Loading/>}
      </div>
      
    </div>
  )
}
