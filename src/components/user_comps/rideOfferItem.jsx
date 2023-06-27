import React from 'react'

export default function RideOfferItem(props) {
    let item = props.item;

    return (
        <div className='col-md-4'>
<div className='shadow p-2 overflow-hidden h-100 p-3' style={{ borderRadius: '10%' }}>
       departure: {item.departure_address}<br/>
        destination: {item.destination_address}<br/>
        departure time: {new Date(item.departure_time).toLocaleDateString()}<br/>
        departure time: {new Date(item.departure_time).toLocaleTimeString()}<br/>
      </div>
    </div>
  )
}

