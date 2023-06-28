
// // import { useParams } from 'react-router-dom'
// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

// export default function RidesHistoryDetails(props) {
//     const { ride } = props;



//     // Access the rideDetails variable
//     console.log(ride);
//     return (
//         <div className="col-md-4">
//             <div className="shadow p-2 overflow-hidden h-100 p-3" style={{ borderRadius: '10%' }}>
//                 {/* <h1>{rideDetails.fullName.firstName}</h1> */}
//                 <h2>hi</h2>
//                 {/* Display the details of the ride based on the passed props */}
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RidesHistoryDetails() {
    const location = useLocation();
    const ride = location.state;

    // Access the ride object
    console.log(ride);

    return (
        <div className="col-md-4">
            <div
                className="shadow p-2 overflow-hidden h-100 p-3"
                style={{ borderRadius: "10%" }}
            >
                {/* Display the details of the ride based on the passed props */}
                <h2>hi</h2>
                {/* <h2>{ride.rideID}</h2> */}
            </div>
        </div>
    );
}

