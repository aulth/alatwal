import React from 'react'
import Link from 'next/link'
const Footer = () => {
    return (
        <>
            <footer aria-label="Site Footer" className="bg-white">
                <div className="max-w-screen-xl px-4 py-16 mx-auto space-y-8 sm:px-6 lg:space-y-16 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div>
                            <Link className="text-3xl font-bold leading-none" href={"/"}>
                                <img src="/logo.png" className='w-16' />
                            </Link>
                            <p className="max-w-xs mt-4 text-gray-500">
                                Alatwal Travel & Tourism is a pioneer in ever growing travel market of UAE and expanding wings through the world.
                            </p>
                            <ul className="flex gap-6 mt-8">
                                <li>
                                    <a href="https://www.facebook.com/alatwaltourism/" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                        <span className="sr-only">Facebook</span>
                                        <img src="/images/icon/fb.png" className='w-8' />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/alatwal_travel_tourism_llc/?r=nametag" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                        <span className="sr-only">Instagram</span>
                                        <img src="/images/icon/instagram.png" className='w-8' />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://wa.link/rvxryi" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                        <span className="sr-only">Whatsapp</span>
                                        <img src="/images/icon/wp.png" className='w-8' />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.tripadvisor.com/Attraction_Review-g295424-d23950908-Reviews-ALATWAL_TRAVEL_TOURISM_LLC-Dubai_Emirate_of_Dubai.html" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                        <span className="sr-only">Trip Advisor</span>
                                        <img src="/images/icon/tripadvisor.png" className='w-8' />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                            <div>
                                <p className="font-medium text-gray-900">Services</p>
                                <nav aria-label="Footer Navigation - Services" className="mt-6">
                                    <ul className="space-y-4 text-sm">
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                UAE Tours
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                UAE Visa
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                International Visa
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Company</p>
                                <nav aria-label="Footer Navigation - Company" className="mt-6">
                                    <ul className="space-y-4 text-sm">
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                About
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                Contact
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Helpful Links</p>
                                <nav aria-label="Footer Navigation - Company" className="mt-6">
                                    <ul className="space-y-4 text-sm">
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                Register
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                FAQs
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Legal</p>
                                <nav aria-label="Footer Navigation - Legal" className="mt-6">
                                    <ul className="space-y-4 text-sm">
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                Privacy Policy
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                Refund Policy
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">
                        © 2023. Toursim. All rights reserved.
                    </p>
                </div>
            </footer>

        </>
    )
}

export default Footer