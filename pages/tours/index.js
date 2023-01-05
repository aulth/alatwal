import React from 'react'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
const Tours = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-wrap mt-3">
                <div className="w-full md:w-1/3 px-4 mb-8">
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
                        <img src="https://source.unsplash.com/random/?Desert Safari Dubai" alt="Product 1" className="w-full h-48 object-cover hover:scale-105 duration-100" />
                        <div className="px-6 py-4">
                        <Link href="/tours/desert-safari"><div className="font-bold text-xl mb-2 cursor-pointer hover:text-gray-700">Desert Safari</div></Link>
                            <p className="text-gray-700 text-base">
                            Experience the thrill of a desert safari, with dune bashing, camel rides, and traditional meals.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-8">
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
                        <img src="https://source.unsplash.com/random/?Burj Khalifa" alt="Product 1" className="w-full h-48 object-cover hover:scale-105 duration-100" />
                        <div className="px-6 py-4">
                            <Link href="/tours/burj-khalifa"><div className="font-bold text-xl mb-2 cursor-pointer hover:text-gray-700">Burj Khalifa</div></Link>
                            <p className="text-gray-700 text-base">
                            The iconic Burj Khalifa, the tallest building in the world, is a must-see attraction in Dubai.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-8">
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
                        <img src="https://source.unsplash.com/random/?Dhow Cruise" alt="Product 1" className="w-full h-48 object-cover hover:scale-105 duration-100" />
                        <div className="px-6 py-4">
                        <Link href="/tours/dhow-cruise"><div className="font-bold text-xl mb-2 cursor-pointer hover:text-gray-700">Dhow Cruise</div></Link>
                            <p className="text-gray-700 text-base">
                            Savor the beauty of Dubai&apos;s waterways on a romantic dhow cruise.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-8">
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
                        <img src="https://source.unsplash.com/random/?Wild Wadi Water Park" alt="Product 1" className="w-full h-48 object-cover hover:scale-105 duration-100" />
                        <div className="px-6 py-4">
                        <Link href="/tours/wild-wide-water-park"><div className="font-bold text-xl mb-2 cursor-pointer hover:text-gray-700">Wild Wadi Water Park</div></Link>
                            <p className="text-gray-700 text-base">
                            Wild Wadi Water Park, located in Dubai, offers a fun-filled day of water slides, wave pools, and other thrilling attractions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Tours