import React, { useEffect, useState } from 'react';
import { doApiGet, API_URL, CURRENT_USER, arrRideHistory } from '../services/apiService';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table';
import PopUp from './popup';
import { border, color, fontSize } from '@mui/system';
import stylesTitle from './css/nearByRides.module.css'
import _ from 'lodash';

const user = JSON.parse(localStorage.getItem(CURRENT_USER));

export default function RidesHistory() {
  const [rides, setRides] = useState([]);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [isOfferedByUser, setIsOfferedByUser] = useState(null);

  useEffect(() => {
    async function fetchRides() {
      try {
        let rides_ar = JSON.parse(localStorage.getItem(arrRideHistory))
        const sortedrides_ar = _.sortBy(rides_ar, (ride) => {
          return -new Date(ride.details_offer.departure_time).getTime();
        });
        setRides(sortedrides_ar);
        console.log("rides_ar", sortedrides_ar);
      } catch (err) {
        console.log(err);
      }
    }
    fetchRides();
  }, []);

  const cancel = () => {
    setIsOpenPopup(false)
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Ride date',
        accessor: (row) => (row.details_offer && row.details_offer.departure_time && new Date(row.details_offer.departure_time).toLocaleDateString()) || '',
        Cell: ({ value }) => (
          <span style={{ color: '#8F97A3' }}>{value}</span>
        ),
        colSpan: 1
      },
      {
        Header: 'Ride time',
        accessor: (row) => (row.details_offer && row.details_offer.departure_time && new Date(row.details_offer.departure_time).toLocaleTimeString()) || '',
        Cell: ({ value }) => (
          <span style={{ color: '#8F97A3' }}>{value}</span>
        ),
        colSpan: 1
      },
      {
        Header: 'Departure address',
        accessor: (row) => {
          if (row.userIdOffer === user._id) {
            return row.details_offer.departure_address;
          } else {
            return row.details_request.departure_address;
          }
        },
        Cell: ({ value }) => (
          <span style={{ color: '#8F97A3' }}>{value}</span>
        ),
        colSpan: 1
      },
      {
        Header: 'Destination address',
        accessor: (row) => {
          if (row.userIdOffer === user._id) {
            return row.details_offer.destination_address;
          } else {
            return row.details_request.destination_address;
          }
        },
        Cell: ({ value }) => (
          <span style={{ color: '#8F97A3' }}>{value}</span>
        ),
        colSpan: 1
      },
      {
        Header: 'Name',
        accessor: (row) => {
          if (row.userIdOffer === user._id) {
            return "Driver";
          } else {
            return "Hitchhiker";
          }
        },
        Cell: ({ value }) => (
          <span style={{ color: '#8F97A3' }}>{value}</span>
        ),
        colSpan: 1
      },
      {
        Header: 'Status',
        accessor: (row) => {
          if (row.details_offer.status === 1) {
            return "Closed";
          } else {
            return "not done";
          }
        },
        Cell: ({ value }) => (
          <span style={{ color: '#8F97A3' }}>{value}</span>
        ),
        colSpan: 1
      },
      {
        Header: 'More details',
        Cell: ({ row }) => (
          <button style={{ width: 'fit-content',fontSize:'24px' }} onClick={() => {
            setSelectedRide(row.original);
            setIsOfferedByUser(row.original.userIdOffer === user._id ? row.original.userIdOffer : row.original.userIdRequest);
            setIsOpenPopup(true);
          }}>+</button>
        ),
      },
    ],
    []
  );


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize, globalFilter },
    setPageSize,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: rides,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const debounceFilter = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="container">

      <div className={`${stylesTitle.title} display-1 mb-3 d-flex justify-content-center align-items-end`} style={{ minHeight: '174px' }}>
        Rides History
      </div>

      <div className="global-filter">
        {/* Search: {' '} */}
        <input style={{ width: '20%', marginBottom: '10px',color: '#54E8A9'}} className="form-control py-2 border-right-0 border" type="search" placeholder='search' id="example-search-input"
          value={globalFilter || ''}
          onChange={(e) => {
            debounceFilter(e.target.value);
          }}
        />
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible">
            <table
              {...getTableProps()}
              className="table text-gray-400 border-separate space-y-6 text-sm"
              style={{ backgroundColor: "transparent", color: "#fff" }}
              cellSpacing="0"
              width="100%"
            >
              <thead className="bg-gray-800 text-gray-500">
                {headerGroups.map((headerGroup) => (
                  <tr className='tr' {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={`p-3 m-3 text-left th ${column.isSorted ? (column.isSortedDesc ? 'sort-desc' : 'sort-asc') : ''}`}
                        style={{
                          fontWeight: column.isSorted ? 'bold' : 'black',
                          color: 'black',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {column.render('Header')}
                        <span>{column.isSorted ? (column.isSortedDesc ? <svg style={{ color: "black" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                        </svg>

                        ) : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                        </svg>
                        }</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr className='bg-gray-800 p-3 m-3 tr'{...row.getRowProps()} onClick={() => {
                      setSelectedRide(row.original);
                      setIsOfferedByUser(row.original.userIdOffer === user._id ? row.original.userIdOffer : row.original.userIdRequest);
                      setIsOpenPopup(true);
                    }}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination">
              <button className='greenColor' onClick={() => previousPage()} disabled={!canPreviousPage}>
                Previous
              </button>
              <span>
                Page {pageIndex + 1} of {pageOptions.length}
              </span>
              <button className='greenColor' onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </button>
              <div className="page-size">
                Page Size: {' '}
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                  {[10, 25, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenPopup ? (
        <PopUp close={() => setIsOpenPopup(false)}>
          <div className='shadow' style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}>
          <div  style={{
            
                backgroundColor: 'rgb(27 30 32)',
                border: '0.5px  #54E8A9 solid',
                color: "#54E8A9",
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '340px',
                height: '340px',
                position: 'relative',
              }}>
            <h3 >Ride Details:</h3>
            <button
                style={{
                  position: 'absolute',
                  color: "#54E8A9",
                  top: '-2px',
                  left: '-110px',
                  padding: '5px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '24px',
                }}
                onClick={cancel}
              >
                X
              </button>
            {isOfferedByUser ? (
              <div className='text-light text-start'>
                {/* <p>Ride ID: {selectedRide.rideID}</p> */}
                <p>Driver: {selectedRide.ride_offer.fullName.firstName} {selectedRide.ride_offer.fullName.lastName}</p>
               <p>Date: {new Date(selectedRide.details_offer.departure_time).toLocaleDateString()}</p>
               <p>Time: {new Date(selectedRide.details_offer.departure_time).toLocaleTimeString()}</p>
               <p>Address Departure: </p>
               <p> {selectedRide.details_offer.departure_address}</p>
               <p>Address Destination: </p>
               <p>{selectedRide.details_offer.destination_address}</p>
                {/* Add more details here */}
              </div>
            ) : (
              <div className='text-light text-start'>
                {/* <p>Ride ID: {selectedRide.rideID}</p> */}
                <p>Passenger: {selectedRide.ride_request.fullName.firstName} {selectedRide.ride_request.fullName.lastName}</p>
                <p>Date: {new Date(selectedRide.details_request.departure_time).toLocaleDateString()}</p>
               <p>Time: {new Date(selectedRide.details_request.departure_time).toLocaleTimeString()}</p>
               <p>Address Departure: </p><br/>
               <p> {selectedRide.details_request.departure_address}</p>
               <p>Address Destination: </p><br/>
               <p>{selectedRide.details_request.destination_address}</p>
                {/* Add more details here */}
              </div>
            )}
          </div></div>
        </PopUp>
        // <PopUp close={() => setIsOpenPopup(false)}>
        //   <div >
        //   <div className="popup-content">
        //     <p>Ride Details:</p>
        //     {isOfferedByUser ? (
        //       <div>
        //         <p>Ride ID: {selectedRide.rideID}</p>
        //         <p>Name: {selectedRide.ride_offer.fullName.firstName} {selectedRide.ride_offer.fullName.lastName}</p>
        //         {/* Add more details here */}
        //       </div>
        //     ) : (
        //       <div>
        //         <p>Ride ID: {selectedRide.rideID}</p>
        //         <p>Name: {selectedRide.ride_request.fullName.firstName} {selectedRide.ride_request.fullName.lastName}</p>
        //         {/* Add more details here */}
        //       </div>
        //     )}
        //   </div></div>
        // </PopUp>
      ) : null}
    </div>
  );
}
