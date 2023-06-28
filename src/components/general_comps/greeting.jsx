import React, { useState, useEffect } from 'react';
import { CURRENT_USER } from '../services/apiService';

export default function Greeting() {
    const [greeting, setGreeting] = useState('');

    const user = JSON.parse(localStorage.getItem(CURRENT_USER))
    console.log(user);

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour >= 0 && currentHour < 12) {
            setGreeting('Good Morning '+user.fullName.firstName+" "+user.fullName.lastName);
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good Afternoon '+user.fullName.firstName + " " + user.fullName.lastName);
} else {
    setGreeting('Good Evening '+user.fullName.firstName + " " + user.fullName.lastName);
}
  }, []);

return <p className='p-0 m-0'>{greeting}</p>;
}
