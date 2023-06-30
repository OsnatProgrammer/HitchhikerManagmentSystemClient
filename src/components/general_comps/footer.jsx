import React from 'react'
import ScrollProgressBar from './scroll'

function Footer() {
    return (
        <>
        <ScrollProgressBar/>
        <div class="container-fluid shadow">
            <footer class="py-3 my-4">
                <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                    <li class="nav-item"><a href="#" class="nav-link px-2 greenColor">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 greenColor">Features</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 greenColor">Pricing</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 greenColor">FAQs</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 greenColor">About</a></li>
                </ul>
                <p class="text-center greenColor">© 2022 Company, Inc</p>
            </footer>
        </div>
        </>
    )
}

export default Footer