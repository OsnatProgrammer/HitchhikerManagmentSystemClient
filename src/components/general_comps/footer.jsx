import React from 'react'
import ScrollProgressBar from './scroll'

function Footer() {
    return (
        <>
        <ScrollProgressBar/>
        <div className="container-fluid shadow">
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a href="#" className="nav-link px-2 greenColor">Home</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 greenColor">Features</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 greenColor">Pricing</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 greenColor">FAQs</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 greenColor">About</a></li>
                </ul>
                <p className="text-center greenColor">© 2022 Company, Inc</p>
            </footer>
        </div>
        </>
    )
}

export default Footer