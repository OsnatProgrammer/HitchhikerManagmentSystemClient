import React from 'react'
import { regEmail } from '../services/apiService';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const InputEmail = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const defaultValue = props.defaultValue



    return (
        <>
            <div>
                <label htmlFor="email" className="block text-sm font-medium ">
                   {label}
                </label>
                <input   defaultValue={defaultValue}
                {...register('email', { required: true, minLength: 2, maxLength: 35, pattern: regEmail })}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    className={classNames(errors.email ? "relative block w-full appearance-none rounded  border border-gray-300 px-3 py-2 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                        :
                        "relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2   focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white")}
                        
                />
                {errors.email && <p className='text-white font-bold  text-center rounded  border-gray-300  py-1'>Enter valid email</p>}
            </div>





        </>
    )
}

export default InputEmail