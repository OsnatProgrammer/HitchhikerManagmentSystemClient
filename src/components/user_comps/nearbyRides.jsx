import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';
import RideOfferItem from './rideOfferItem';
import RideRequestItem from './rideRequestItem';
import Loading from '../general_comps/loading';
import styles from './css/nearByRides.module.css'


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
  const [FilteredRidesRequests, setFilteredRidesRequests] = useState([])
  const [FilteredRidesOffers, setFilteredRidesOffers] = useState([])


  useEffect(() => {
    async function fetchrides() {
      try {
        const ridesRequestsData = await getAllridesRequestsOpen();
        setRidesRequests(ridesRequestsData);
        const ridesoffersData = await getAllridesoffersOpen();
        setridesoffers(ridesoffersData);

        setFilteredRidesRequests(ridesRequestsData);
        setFilteredRidesOffers(ridesoffersData)

      } catch (err) {
        console.log(err);
      }
    }
    fetchrides();
    // setRefreshFlag(false)
  }, [refreshFlag]);


  const setSearchTermRequests = (searchTerm) => {
    console.log(searchTerm);
    console.log(ridesRequests);
    const filteredData = ridesRequests.filter((request) =>
      request.details_request.departure_address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(filteredData);
    setFilteredRidesRequests(filteredData);
  }

  const setSearchTermOffers = (searchTerm) => {
    console.log(searchTerm);
    const filteredData = ridesoffers.filter((offer) =>
      offer.details_offer.departure_address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(filteredData);
    setFilteredRidesOffers(filteredData);
  }

  return (
    <>
      <div className={`${styles.strip} d-flex align-items-end`}>
        <div className='display-1'>
          Ride Requests & Ride Offers
        </div>

      </div>
      <div className='container'>
        <div className='row g-3'>
          <div className='d-flex m-5' style={{ alignItems: 'center' }}>
            <h2 className='font-weight-bold text-light'>Rides Requests: </h2>
            <div>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                onInput={(e) => setSearchTermRequests(e.target.value)} />
            </div>
          </div>


          <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {FilteredRidesRequests.length > 0 && (
                <>
                  {FilteredRidesRequests.reduce((result, item, index) => {
                    if (index % 3 === 0) {
                      const carouselItem = FilteredRidesRequests.slice(index, index + 3);
                      result.push(
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <div className="d-flex">
                            {carouselItem.map((ride, i) => (
                              <div key={i} className="col-md-4"
                                style={{ border: '5px solid #1B1F23' }}>
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
            <button className="carousel-control-prev" style={{ top: 63, left: -103 }} type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" style={{ top: 63, right: -103 }} type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>


          {FilteredRidesRequests.length < 1 && <Loading />}
        </div>


        <div className='row g-3'>

          <div className='d-flex m-5' style={{ alignItems: 'center' }}>
            <h2 className='font-weight-bold text-light'>Rides Offers: </h2>
            <div>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                onInput={(e) => setSearchTermOffers(e.target.value)} />
            </div>
          </div>

          <div id="carouselExampleInterval2" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {FilteredRidesOffers.length > 0 && (
                <>
                  {FilteredRidesOffers.reduce((result, item, index) => {
                    if (index % 3 === 0) {
                      const carouselItem = FilteredRidesOffers.slice(index, index + 3);
                      result.push(
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <div className="d-flex">
                            {carouselItem.map((ride, i) => (
                              <div key={i} className="col-md-4"
                                style={{ border: '5px solid #1B1F23' }}>
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
            <button className="carousel-control-prev" style={{ top: 63, left: -103 }} type="button" data-bs-target="#carouselExampleInterval2" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" style={{ top: 63, right: -103 }} type="button" data-bs-target="#carouselExampleInterval2" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {FilteredRidesOffers.length < 1 && <Loading />}
        </div>

      </div>

    </>
  )
}
