import React, {useEffect, useState} from 'react'
import Link from 'next/link'
const Footer = () => {
    const [settingData, setSettingData] = useState()
    const fetchSetting = async ()=>{
        let response = await fetch('/api/setting/fetch');
        let responseData = await response.json();
        if(responseData.success){
            setSettingData(responseData.setting[0])
        }
    }
    useEffect(() => {
      fetchSetting();
    }, [])
    
    return (
        <>
            <footer aria-label="Site Footer" className="bg-white">
                <div className="max-w-screen-xl px-4 py-16 mx-auto space-y-8 sm:px-6 lg:space-y-16 lg:px-8">
                    {
                        settingData && 
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div>
                            <Link className="text-3xl font-bold leading-none" href={"/"}>
                                <img src="/logo.png" className='w-16' />
                            </Link>
                            <p className="max-w-xs mt-4 text-gray-500 ">
                                Alatwal Travel & Tourism is a pioneer in ever growing travel market of UAE and expanding wings through the world.
                            </p>
                            <ul className="flex gap-6 mt-8">
                                <li>
                                    <a href={settingData.footerFbLink} rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                        <span className="sr-only">Facebook</span>
                                        <img src="/images/icon/fb.png" className='w-8' />
                                    </a>
                                </li>
                                <li>
                                    <a href={settingData.footerInstagramLink} rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                        <span className="sr-only">Instagram</span>
                                        <img src="/images/icon/instagram.png" className='w-8' />
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://wa.me/${settingData.footerWhatsappNumber}`} rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                        <span className="sr-only">Whatsapp</span>
                                        <img src="/images/icon/wp.png" className='w-8' />
                                    </a>
                                </li>
                                <li>
                                    <a href={settingData.footerTripadvisor} rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
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
                                            <a href={settingData.service1Link} className="text-gray-700 transition hover:opacity-75">
                                                {settingData.service1Title}
                                            </a>
                                        </li>
                                        <li>
                                            <a href={settingData.service2Link} className="text-gray-700 transition hover:opacity-75">
                                            {settingData.service2Title}
                                            </a>
                                        </li>
                                        <li>
                                            <a href={settingData.service3Link} className="text-gray-700 transition hover:opacity-75">
                                            {settingData.service3Title}
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
                                            <Link href={'/p/about'} className="text-gray-700 transition hover:opacity-75">
                                                About
                                            </Link>
                                        </li>
                                        <li>
                                            <Link  href={'/p/contact'} className="text-gray-700 transition hover:opacity-75">
                                                Contact
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Helpful Links</p>
                                <nav aria-label="Footer Navigation - Company" className="mt-6">
                                    <ul className="space-y-4 text-sm">
                                        <li>
                                            <Link  href={'/register'} className="text-gray-700 transition hover:opacity-75">
                                                Register
                                            </Link>
                                        </li>
                                        <li>
                                            <Link  href={'/p/faq'} className="text-gray-700 transition hover:opacity-75">
                                                FAQs
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Quick Contacts</p>
                                <nav aria-label="Footer Navigation - Legal" className="mt-6">
                                    <ul className="space-y-4 text-sm">
                                        <li>
                                            <a href="tel:+971-45752644" className="text-gray-700 transition hover:opacity-75">
                                            {settingData.quickContact1}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="tel:+971-583938039" className="text-gray-700 transition hover:opacity-75">
                                            {settingData.quickContact2}
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    }
                    {
                        !settingData && 
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div>
                            <Link className="text-3xl font-bold leading-none" href={"/"}>
                                <img src="/logo.png" className='w-16' />
                            </Link>
                            <p className="max-w-xs mt-4 text-gray-500 bg-gray-200 h-20 w-full rounded animate-pulse">
                                {/* Alatwal Travel & Tourism is a pioneer in ever growing travel market of UAE and expanding wings through the world. */}
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
                            <div className='bg-gray-200 rounded animate-pulse'>
                                <p className="font-medium text-gray-900"></p>
                                <nav aria-label="Footer Navigation - Services" className="mt-6">
                                    <ul className="space-y-4 text-sm">
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                {/* UAE Tours */}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                {/* UAE Visa */}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-700 transition hover:opacity-75">
                                                {/* International Visa */}
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className='bg-gray-200 animate-pulse rounded'>
                                <p className="font-medium text-gray-900"></p>
                                <nav aria-label="Footer Navigation - Company" className="mt-6">
                                    <ul className="space-y-4 text-sm">
                                        <li>
                                            <Link href={'/p/about'} className="text-gray-700 transition hover:opacity-75">
                                                {/* About */}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link  href={'/p/contact'} className="text-gray-700 transition hover:opacity-75">
                                                {/* Contact */}
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className='bg-gray-200 animate-pulse rounded'>
                                <p className="font-medium text-gray-900"></p>
                                <nav aria-label="Footer Navigation - Company" className="mt-6">
                                    <ul className="space-y-4 text-sm">
                                        <li>
                                            <Link  href={'/register'} className="text-gray-700 transition hover:opacity-75">
                                                {/* Register */}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link  href={'/p/faq'} className="text-gray-700 transition hover:opacity-75">
                                                {/* FAQs */}
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className='bg-gray-200 animate-pulse rounded'>
                                <p className="font-medium text-gray-900"></p>
                                <nav aria-label="Footer Navigation - Legal" className="mt-6">
                                    <ul className="space-y-4 text-sm">
                                        <li>
                                            <a href="tel:+971-45752644" className="text-gray-700 transition hover:opacity-75">
                                            {/* +971-45752644 */}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="tel:+971-583938039" className="text-gray-700 transition hover:opacity-75">
                                            {/* +971-583938039 */}
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    }
                    <p className="text-xs text-gray-500">
                        © 2023. Toursim. All rights reserved.
                    </p>
                </div>
            </footer>

        </>
    )
}

export default Footer