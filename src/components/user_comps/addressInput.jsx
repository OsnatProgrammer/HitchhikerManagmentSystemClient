import React, { useState, useEffect, useRef } from 'react';

const AddressInput = (props) => {

    const {onAddressChange } = props;

    const [address, setAddress] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');

    const inputRef = useRef(null);

    const handleChange = (event) => {
        console.log(event.target.value);
        setAddress(event.target.value);
        setSelectedAddress('');
    };

    useEffect(() => {
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        onAddressChange(address);

        if (address) {
            autocompleteService.getPlacePredictions(
                { input: address, componentRestrictions: { country: 'il' } },
                (predictions) => {
                    setPredictions(predictions);
                }
            );
        } else {
            setPredictions([]);
        }
    }, [address]);

    useEffect(() => {
        if (inputRef.current) {
            const autocompleteOptions = {
                types: ['address'],
                componentRestrictions: { country: 'il' },
            };

            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, autocompleteOptions);

            autocomplete.addListener('place_changed', () => {
                const selectedPlace = autocomplete.getPlace();

                if (selectedPlace && selectedPlace.place_id) {
                    setAddress(selectedPlace.formatted_address);
                    setSelectedAddress(selectedPlace.place_id);
                }
            });
        }
    }, []);

    return (
        <div>
            <input
                // {...register("address", { required: true })}
                id="address"
                name="address"
                type="text"
                placeholder="Enter an address"
                value={address}
                onChange={handleChange}
                ref={inputRef}
                className='form-control'
                style={{width:'65%', margin:'0 auto'}}
            />
        </div>
    );
};

export default AddressInput;
