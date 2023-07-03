// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { doApiGet, API_URL, CURRENT_USER } from '../services/apiService';
// // import { Route } from 'react-router-dom';
// // import PopUp from './popup';
// // // import { useSelector } from "react-redux";
// // // import { ridesSelector } from "../slices/ridesSlice";

// // const user = JSON.parse(localStorage.getItem(CURRENT_USER));


// // export const getAllRidesById = async () => {
// //     try {
// //         const url = API_URL + "/rides/getAllRidesById";
// //         const response = await doApiGet(url);
// //         const rides = response.data.rides;
// //         return rides;
// //     } catch (err) {
// //         console.log(err);
// //         throw new Error("Failed to fetch rides");
// //     }
// // };


// // export default function RidesHistory() {
// //     const [rides, setRides] = useState([]);
// //     const [isOpenPopup, setIsOpenPopup] = useState(false);
// //     const [selectedRide, setSelectedRide] = useState(null);
// //     const [IsOfferedByUser, setIsOfferedByUser] = useState(null);
// //     // const ride = useSelector(ridesSelector);
// //     // console.log("ride", ride);
// //     let item = rides;
// //     const itemString = JSON.stringify(item)

// //     useEffect(() => {
// //         async function fetchRides() {
// //             try {
// //                 const ridesData = await getAllRidesById();
// //                 console.log(ridesData);
// //                 setRides(ridesData);
// //             } catch (err) {
// //                 console.log(err);
// //             }
// //         }
// //         fetchRides();
// //     }, []);

// //     return (
// //         <div className="container">
// //             <h1>Rides History</h1>
// //             <table className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
// //                 <thead className="thead-dark">
// //                     <tr>
// //                         <th>Ride date</th>
// //                         <th>Ride time</th>
// //                         <th>Name</th>
// //                         <th>Departure address</th>
// //                         <th>Destination address</th>
// //                         <th>Status</th>
// //                         <th>More details</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {rides.map((ride, i) => {
// //                         const isOfferedByUser = ride.userIdOffer === user._id;
// //                         const isRequestedByUser = ride.userIdRequest === user._id;

// //                         const rideDetails = isOfferedByUser ? ride.ride_offer : ride.ride_request;
// //                         console.log(ride);
// //                         return (
// //                             <tr key={ride.rideID}>
// //                                 <td>{new Date(isOfferedByUser ? ride.details_offer.departure_time : ride.details_request.departure_time).toLocaleDateString()}</td>
// //                                 <td>{new Date(isOfferedByUser ? ride.details_offer.departure_time : ride.details_request.departure_time).toLocaleTimeString()}</td>
// //                                 <td>{rideDetails.fullName.firstName}</td>
// //                                 <td>{isOfferedByUser ? ride.details_offer.departure_address : ride.details_request.departure_address}</td>
// //                                 <td>{isOfferedByUser ? ride.details_offer.destination_address : ride.details_request.destination_address}</td>
// //                                 <td>{isOfferedByUser ? ride.details_offer.status : ride.details_request.status}</td>
// //                                 <td>
// //                                     <button onClick={() => {
// //                                         setSelectedRide(ride); setIsOfferedByUser(ride.userIdOffer === user._id ? ride.userIdOffer : ride.userIdRequest)
// //                                         setIsOpenPopup(true);
// //                                     }}>X</button>                                </td>
// //                             </tr>
// //                         );
// //                     })}
// //                 </tbody>
// //             </table>
// //             {isOpenPopup ? (
// //                 <PopUp close={() => setIsOpenPopup(false)}>
// //                     <p>Ride Details:</p>
// //                     {IsOfferedByUser ? (
// //                         <div>

// //                             <p>Ride ID: {selectedRide.rideID}</p>
// //                             <p>name: {selectedRide.ride_offer.fullName.firstName}</p>
// //                         </div>
// //                     ) :
// //                         <p>name: "hi"</p>


// //                     }
// //                 </PopUp>
// //             ) : null}
// //         </div>
// //     );
// // }

// import React, { useEffect, useState } from 'react';
// import { doApiGet, API_URL, CURRENT_USER } from '../services/apiService';
// import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table';
// import PopUp from './popup';
// <<<<<<< HEAD
// import { color } from '@mui/system';
// import styles from './css/nearByRides.module.css'

// const user = JSON.parse(localStorage.getItem(CURRENT_USER));

// export const getAllRidesById = async () => {
//   try {
//     const url = API_URL + "/rides/getAllRidesById";
//     const response = await doApiGet(url);
//     const rides = response.data.rides;
//     console.log(rides);
//     return rides;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch rides");
//   }
// };

// export default function RidesHistory() {
//   const [rides, setRides] = useState([]);
//   const [isOpenPopup, setIsOpenPopup] = useState(false);
//   const [selectedRide, setSelectedRide] = useState(null);
//   const [isOfferedByUser, setIsOfferedByUser] = useState(null);

//   useEffect(() => {
//     async function fetchRides() {
//       try {
//         const ridesData = await getAllRidesById();
//         setRides(ridesData);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     fetchRides();
//   }, []);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Ride date ',
//         accessor: (row) => (row.details_offer && row.details_offer.departure_time && new Date(row.details_offer.departure_time).toLocaleDateString()) ? new Date(row.details_request.departure_time).toLocaleDateString() : '',
//       },
//       {
//         Header: 'Ride time ',
//         accessor: (row) => (row.details_offer && row.details_offer.departure_time && new Date(row.details_offer.departure_time).toLocaleTimeString()) ? new Date(row.details_request.departure_time).toLocaleTimeString() : '',
//       },
//       {
//         Header: 'Name ',
//         accessor: (row) => {
//           if (row.userIdOffer === user._id) {
//             return row.ride_offer.fullName.firstName;
//           } else {
//             return row.ride_request.fullName.firstName;
//           }
//         },
//       },
//       {
//         Header: 'Departure address ',
//         accessor: (row) => {
//           if (row.userIdOffer === user._id) {
//             return row.details_offer.departure_address;
//           } else {
//             return row.details_request.departure_address;
//           }
//         },
//       },
//       {
//         Header: 'Destination address ',
//         accessor: (row) => {
//           if (row.userIdOffer === user._id) {
//             return row.details_offer.destination_address;
//           } else {
//             return row.details_request.destination_address;
//           }
//         },
//       },
//       {
//         Header: 'Status ',
//         accessor: (row) => {
//           if (row.userIdOffer === user._id) {
//             return row.details_offer.status;
//           } else {
//             return row.details_request.status;
//           }
//         },
//       },
//       {
//         Header: 'More details ',
//         Cell: ({ row }) => (
//           <button onClick={() => {
//             setSelectedRide(row.original);
//             setIsOfferedByUser(row.original.userIdOffer === user._id ? row.original.userIdOffer : row.original.userIdRequest);
//             setIsOpenPopup(true);
//           }}>X</button>
//         ),
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageOptions,
//     state: { pageIndex, pageSize, globalFilter },
//     setPageSize,
//     prepareRow,
//     setGlobalFilter,
//   } = useTable(
//     {
//       columns,
//       data: rides,
//       initialState: { pageIndex: 0, pageSize: 10 },
//     },
//     useFilters,
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

//   const debounceFilter = useAsyncDebounce((value) => {
//     setGlobalFilter(value || undefined);
//   }, 200);

//   return (
//     <div className="container">
//       <h1>Rides History</h1>
//       <div className="global-filter">
//         Search: {' '}
//         <input
//           value={globalFilter || ''}
//           onChange={(e) => {
//             debounceFilter(e.target.value);
//           }}
//         />
//       </div>
//       <table
//         {...getTableProps()}
//         className="table table-striped table-bordered table-sm"
//         style={{ backgroundColor: "transparent", color: "#fff" }}
//         cellSpacing="0"
//         width="100%"
//       >
//         <thead className="thead-dark">
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th
//                   {...column.getHeaderProps(column.getSortByToggleProps())}
//                   className={column.isSorted ? (column.isSortedDesc ? 'sort-desc' : 'sort-asc') : ''}
//                   style={{
//                     fontWeight: column.isSorted ? 'bold' : 'black',
//                     color: 'black',
//                   }}
//                 >
//                   {column.render('Header')}
//                   <span>{column.isSorted ? (column.isSortedDesc ? <svg style={{ color: "black" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
//                     <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
//                   </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
//                     <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
//                   </svg>
//                   ) : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
//                     <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
//                   </svg>}</span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} onClick={() => {
//                 setSelectedRide(row.original);
//                 setIsOfferedByUser(row.original.userIdOffer === user._id ? row.original.userIdOffer : row.original.userIdRequest);
//                 setIsOpenPopup(true);
//               }}>
//                 {row.cells.map((cell) => {
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="pagination">
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           Previous
//         </button>
//         <span>
//           Page {pageIndex + 1} of {pageOptions.length}
//         </span>
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           Next
//         </button>
//         <div className="page-size">
//           Page Size: {' '}
//           <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
//             {[10, 25, 50].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//     <>
//       <div className={`${styles.strip} d-flex align-items-end`}>
//         <div className='display-1'>
//           Rides History
//         </div>
//       </div>

//       <div className="container">
//         <div className="global-filter">
//           Search: {' '}
//           <input
//             value={globalFilter || ''}
//             onChange={(e) => {
//               debounceFilter(e.target.value);
//             }}
//           />
//         </div>
//         <table {...getTableProps()} className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
//           <thead className="thead-dark">
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     className={column.isSorted ? (column.isSortedDesc ? 'sort-desc' : 'sort-asc') : ''}
//                   >
//                     {column.render('Header')}
//                     <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()} onClick={() => {
//                   setSelectedRide(row.original);
//                   setIsOfferedByUser(row.original.userIdOffer === user._id ? row.original.userIdOffer : row.original.userIdRequest);
//                   setIsOpenPopup(true);
//                 }}>
//                   {row.cells.map((cell) => {
//                     return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <div className="pagination">
//           <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//             Previous
//           </button>
//           <span>
//             Page {pageIndex + 1} of {pageOptions.length}
//           </span>
//           <button onClick={() => nextPage()} disabled={!canNextPage}>
//             Next
//           </button>
//           <div className="page-size">
//             Page Size: {' '}
//             <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
//               {[10, 25, 50].map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         {isOpenPopup ? (
//           <PopUp close={() => setIsOpenPopup(false)}>
//             <div className="popup-content">
//               <p>Ride Details:</p>
//               {isOfferedByUser ? (
//                 <div>
//                   <p>Ride ID: {selectedRide.rideID}</p>
//                   <p>Name: {selectedRide.ride_offer.fullName.firstName} {selectedRide.ride_offer.fullName.lastName}</p>
//                   {/* Add more details here */}
//                 </div>
//               ) : (
//                 <div>
//                   <p>Ride ID: {selectedRide.rideID}</p>
//                   <p>Name: {selectedRide.ride_request.fullName.firstName} {selectedRide.ride_request.fullName.lastName}</p>
//                   {/* Add more details here */}
//                 </div>
//               )}
//             </div>
//           </PopUp>
//         ) : null}
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from 'react';
import { doApiGet, API_URL, CURRENT_USER, arrRideHistory } from '../services/apiService';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table';
import PopUp from './popup';
import { color } from '@mui/system';

const user = JSON.parse(localStorage.getItem(CURRENT_USER));

export default function RidesHistory() {
  const [rides, setRides] = useState([]);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [isOfferedByUser, setIsOfferedByUser] = useState(null);



  useEffect(() => {
    async function fetchRides() {
      try {
        setRides( JSON.parse(localStorage.getItem(arrRideHistory)));
      console.log(rides);
      } catch (err) {
        console.log(err);
      }
    }
    fetchRides();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Ride date ',
        accessor: (row) => (row.details_offer && row.details_offer.departure_time && new Date(row.details_offer.departure_time).toLocaleDateString()) ? new Date(row.details_request.departure_time).toLocaleDateString() : '',
      },
      {
        Header: 'Ride time ',
        accessor: (row) => (row.details_offer && row.details_offer.departure_time && new Date(row.details_offer.departure_time).toLocaleTimeString()) ? new Date(row.details_request.departure_time).toLocaleTimeString() : '',
      },
      {
        Header: 'Name ',
        accessor: (row) => {
          if (row.userIdOffer === user._id) {
            return row.ride_offer.fullName.firstName;
          } else {
            return row.ride_request.fullName.firstName;
          }
        },
      },
      {
        Header: 'Departure address ',
        accessor: (row) => {
          if (row.userIdOffer === user._id) {
            return row.details_offer.departure_address;
          } else {
            return row.details_request.departure_address;
          }
        },
      },
      {
        Header: 'Destination address ',
        accessor: (row) => {
          if (row.userIdOffer === user._id) {
            return row.details_offer.destination_address;
          } else {
            return row.details_request.destination_address;
          }
        },
      },
      {
        Header: 'Status ',
        accessor: (row) => {
          if (row.userIdOffer === user._id) {
            return row.details_offer.status;
          } else {
            return row.details_request.status;
          }
        },
      },
      {
        Header: 'More details ',
        Cell: ({ row }) => (
          <button onClick={() => {
            setSelectedRide(row.original);
            setIsOfferedByUser(row.original.userIdOffer === user._id ? row.original.userIdOffer : row.original.userIdRequest);
            setIsOpenPopup(true);
          }}>X</button>
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
      <h1>Rides History</h1>
      <div className="global-filter">
        Search: {' '}
        <input
          value={globalFilter || ''}
          onChange={(e) => {
            debounceFilter(e.target.value);
          }}
        />
      </div>
      <table
        {...getTableProps()}
        className="table table-striped table-bordered table-sm text-gray-400 border-separate space-y-6"
        style={{ backgroundColor: "transparent", color: "#fff" }}
        cellSpacing="0"
        width="100%"
      >
        <thead className="bg-gray-800 text-gray-500">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th 
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.isSorted ? (column.isSortedDesc ? 'sort-desc' : 'sort-asc') : ''}
                  style={{
                    fontWeight: column.isSorted ? 'bold' : 'black',
                    color: 'black',
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
              <tr className='bg-gray-800 p-3'{...row.getRowProps()} onClick={() => {
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
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
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
      {isOpenPopup ? (
        <PopUp close={() => setIsOpenPopup(false)}>
          <div className="popup-content">
            <p>Ride Details:</p>
            {isOfferedByUser ? (
              <div>
                <p>Ride ID: {selectedRide.rideID}</p>
                <p>Name: {selectedRide.ride_offer.fullName.firstName} {selectedRide.ride_offer.fullName.lastName}</p>
                {/* Add more details here */}
              </div>
            ) : (
              <div>
                <p>Ride ID: {selectedRide.rideID}</p>
                <p>Name: {selectedRide.ride_request.fullName.firstName} {selectedRide.ride_request.fullName.lastName}</p>
                {/* Add more details here */}
              </div>
            )}
          </div>
        </PopUp>
      ) : null}
    </div>
  );

}








