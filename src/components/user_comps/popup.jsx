
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
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// export default function RidesHistoryDetails(props) {
// //   const location = useLocation();
// //   const ride = location.state;
//   // Access the ride object
// //   console.log(ride);
// console.log(props.P);
//   return (
//     <div className="col-md-4">
//       <div
//         className="shadow p-2 overflow-hidden h-100 p-3"
//         style={{ borderRadius: "10%" }}
//       >
//         {/* Display the details of the ride based on the passed props */}
//         <h2>hi</h2>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
// import styled from "styled-components";
// import { CloseOutlinedIcon } from '@mui/icons-material/CloseOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styled from 'styled-components';



const PopUp = ({ close, children }) => (
  <div className="col-md-4 popUpBg">
    <div className="shadow p-2 overflow-hidden h-100 p-3 popUp" style={{ borderRadius: '10%' }}>
      {close ? (
        <button onClick={close} className="close">
          <CloseOutlinedIcon />
        </button>
      ) : null}
      <div className="children-popup">{children}</div>
    </div>
  </div>
);

export default PopUp;