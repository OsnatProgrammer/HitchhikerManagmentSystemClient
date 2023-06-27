import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';
import {GoogleMap} from 'react-google-maps';

// import $ from 'jquery';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'datatables.net-dt/css/jquery.dataTables.css';
// import 'datatables.net';
// import 'datatables.net-bs4';
// import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'; 


export const getAllRidesById = async () => {
    try {
        const url = API_URL + "/rides/getAllRidesById";
        const response = await doApiGet(url);

        const rides = [];
        rides.push(response.data.rides)
        return rides;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch rides");
    }
};


export default function RidesHistory() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        async function fetchRides() {
            try {
                const ridesData = await getAllRidesById();
                setRides(ridesData);
                console.log(ridesData);
            } catch (err) {
                console.log(err);
            }
        }

        fetchRides();
    }, []);

    // useEffect(() => {
    //     // Initialize the DataTable on component mount
    //     $(document).ready(function () {
    //       $('#dtBasicExample').DataTable({
    //         // Enable column filtering
    //         initComplete: function () {
    //           this.api().columns().every(function () {
    //             var column = this;
    //             var select = $('<select><option value=""></option></select>')
    //               .appendTo($(column.header()))
    //               .on('change', function () {
    //                 var val = $.fn.dataTable.util.escapeRegex($(this).val());

    //                 column
    //                   .search(val ? '^' + val + '$' : '', true, false)
    //                   .draw();
    //               });

    //             column.data().unique().sort().each(function (d, j) {
    //               select.append('<option value="' + d + '">' + d + '</option>');
    //             });
    //           });
    //         }
    //       });
    //     });
    //   }, []);

    // return (
    //     <div className="container">
    //         <h1>Rides History</h1>
    //         {rides.length > 0 ? (
    //             <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
    //                 <thead className="thead-dark">
    //                     <tr>
    //                         <th>Ride date</th>
    //                         <th>Ride time</th>
    //                         <th>Departure address</th>
    //                         <th>Destination address</th>
    //                         <th>Status</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {rides.map((ride) => (
    //                         <tr key={ride.rideID}>
    //                             <td>{new Date(ride.details_Request.departure_time).toLocaleDateString()}</td>
    //                             <td>{new Date(ride.details_Request.departure_time).toLocaleTimeString()}</td>
    //                             <td>{ride.details_Request.departure_address}</td>
    //                             <td>{ride.details_Request.destination_address}</td>
    //                             <td>{ride.details_Request.status}</td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         ) : (
    //             <p>No rides available</p>
    //         )}
    //     </div>
{/* <GoogleMap apiKey={apiKey} /> */}

    // );
}








