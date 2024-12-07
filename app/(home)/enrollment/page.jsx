import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import HeroSection from '@/components/home/HeroSection'
import React from 'react'

export default function EnrollmentPage() {
  return (
    <div>
        <Header />
        <HeroSection heading={"Enrollment Form"} />
        <section className='paddingvr flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
                <h2 className='text-center'>Personal Information</h2>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <h4>Enrolle's Name</h4>
                        <div className='enrollment__block'>
                            <input className='enrollment__input' type="text" placeholder='Last Name' />
                            <input className='enrollment__input' type="text" placeholder='First Name' />
                            <input className='enrollment__input' type="text" placeholder='Middle Name' />
                            <input className='enrollment__input' type="text" placeholder='Suffix' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h4>Address</h4>
                        <div className='enrollment__block'>
                            <input className='enrollment__input' type="text" placeholder='Street Name, Baranggay, Municipal, Region' />
                            <input className='enrollment__input' type="text" placeholder='Postal Code' />
                        </div>
                    </div>

                    <div className='flex w-full gap-4'>
                        <div className='flex flex-col gap-2 w-full'>
                            <h4>Birtday</h4>
                            <div className='enrollment__block'>
                                <input className='enrollment__input' type="text" placeholder='Day' />
                                <input className='enrollment__input' type="text" placeholder='Month' />
                                <input className='enrollment__input' type="text" placeholder='Year' />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <h4>Birt Place</h4>
                            <div className='enrollment__block'>
                                <input className='enrollment__input' type="text" placeholder='Address' />
                            </div>
                        </div>
                    </div>

                    <div className='flex w-full gap-4'>
                        <div className='flex flex-col gap-2 w-full'>
                            <h4>Email</h4>
                            <div className='enrollment__block'>
                                <input className='enrollment__input' type="text" placeholder='example@email.com' />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <h4>Contact Number</h4>
                            <div className='enrollment__block'>
                                <input className='enrollment__input' type="text" placeholder='09XXXXXXXX' />
                            </div>
                        </div>
                    </div>

                    <div className='flex w-full gap-4'>
                        <div className='flex flex-col gap-2 w-full'>
                            <h4>Religion</h4>
                            <div className='enrollment__block'>
                                <input className='enrollment__input' type="text" />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <h4>Civil Status</h4>
                            <div className='enrollment__block'>
                                <input className='enrollment__input' type="text" />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <h4>Sex</h4>
                        <div className='enrollmet__block'>
                            <select className='enrollment__input bg-white'>
                                <option value="">Male</option>
                                <option value="">Female</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <h2>Requirements</h2>
                <ul className='flex flex-col'>
                    <li className='list-disc ml-8'>Certificate of Good Moral</li>
                    <li className='list-disc ml-8'>Form 138 or SHS Card</li>
                    <li className='list-disc ml-8'>PSA Birth certificate</li>
                    <li className='list-disc ml-8'>Medical Certificate</li>
                    <li className='list-disc ml-8'>2x2 Id Picture</li>
                </ul>
            </div>

            <button className='p-2 w-full bg-[#044721] text-white font-semibold shadow-md rounded-md border hover:border-[#FFE714]'>Submit</button>
        </section>
        <Footer />
    </div>
  )
}
