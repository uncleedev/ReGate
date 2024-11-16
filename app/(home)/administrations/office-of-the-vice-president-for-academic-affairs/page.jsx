"use client"

import HeroSection from '@/components/common/HeroSection'
import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import { Colors } from '@/constants/colors'
import Image from 'next/image'
import React from 'react'

export default function OfficeOfTheVicePresident() {
  return (
    <div>
        <Navbar />
        <HeroSection heading={"Office of the"} sub={"Vice President for Academic Affairs"} />
        <section className='paddingvr flex flex-col gap-8'>
            <div className='grid grid-cols-3 gap-4 w-full shadow-md p-3'>
                <div className='col-span-1 flex flex-col gap-2'>
                    <Image src={require("@/public/images/cdmssg/adviser.jpg")}/>
                    <h3 className='text-3xl'>Jhon Brian Arce</h3>
                    <h4 className='text-2xl'>President</h4>
                    <ul className='text-blue-400'>
                        <li>arce.jhonbrian@gmail.com</li>
                        <li>0912345678</li>
                    </ul>
                </div>
                <div className='col-span-2 flex flex-col gap-2'>
                    <h2 className={`text-3xl text-[${Colors.primary}]`}>Statement Title</h2>
                    <div className='text-justify'>
                        <p className='text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique consequuntur libero architecto vel natus quibusdam possimus ipsam voluptas minus, unde excepturi? Magnam vero sed dolore, quas consequuntur ex. Itaque, sed!</p>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, incidunt sapiente quo cum delectus deleniti voluptate ab voluptatum, ut inventore quod esse. Nobis quam facere aperiam odit beatae labore obcaecati fugit molestias blanditiis inventore eos rerum tempore similique ipsam enim reiciendis doloribus, quos quod repudiandae itaque officia. Consectetur labore fugiat blanditiis expedita odio. Beatae fugiat delectus atque perspiciatis saepe neque, tempora, quis nam ex molestias cupiditate assumenda voluptas possimus tenetur? Necessitatibus harum dolorum molestiae veniam, maxime aperiam nemo inventore, iusto modi praesentium, aliquid eaque deserunt nesciunt dolor. Veritatis itaque saepe reprehenderit nihil assumenda sed, eligendi illo praesentium minus quibusdam sequi?</p>

                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, incidunt sapiente quo cum delectus deleniti voluptate ab voluptatum, ut inventore quod esse. Nobis quam facere aperiam odit beatae labore obcaecati fugit molestias blanditiis inventore eos rerum tempore similique ipsam enim reiciendis doloribus, quos quod repudiandae itaque officia. Consectetur labore fugiat blanditiis expedita odio. Beatae fugiat delectus atque perspiciatis saepe neque, tempora, quis nam ex molestias cupiditate assumenda voluptas possimus tenetur? Necessitatibus harum dolorum molestiae veniam, maxime aperiam nemo inventore, iusto modi praesentium, aliquid eaque deserunt nesciunt dolor. Veritatis itaque saepe reprehenderit nihil assumenda sed, eligendi illo praesentium minus quibusdam sequi?</p>
                        
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, incidunt sapiente quo cum delectus deleniti voluptate ab voluptatum, ut inventore quod esse. Nobis quam facere aperiam odit beatae labore obcaecati fugit molestias blanditiis inventore eos rerum tempore similique ipsam enim reiciendis doloribus, quos quod repudiandae itaque officia. Consectetur labore fugiat blanditiis expedita odio. Beatae fugiat delectus atque perspiciatis saepe neque, tempora, quis nam ex molestias cupiditate assumenda voluptas possimus tenetur? Necessitatibus harum dolorum molestiae veniam, maxime aperiam nemo inventore, iusto modi praesentium, aliquid eaque deserunt nesciunt dolor. Veritatis itaque saepe reprehenderit nihil assumenda sed, eligendi illo praesentium minus quibusdam sequi?</p>
                        
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, incidunt sapiente quo cum delectus deleniti voluptate ab voluptatum, ut inventore quod esse. Nobis quam facere aperiam odit beatae labore obcaecati fugit molestias blanditiis inventore eos rerum tempore similique ipsam enim reiciendis doloribus, quos quod repudiandae itaque officia. Consectetur labore fugiat blanditiis expedita odio. Beatae fugiat delectus atque perspiciatis saepe neque, tempora, quis nam ex molestias cupiditate assumenda voluptas possimus tenetur? Necessitatibus harum dolorum molestiae veniam, maxime aperiam nemo inventore, iusto modi praesentium, aliquid eaque deserunt nesciunt dolor. Veritatis itaque saepe reprehenderit nihil assumenda sed, eligendi illo praesentium minus quibusdam sequi?</p>
                        
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, incidunt sapiente quo cum delectus deleniti voluptate ab voluptatum, ut inventore quod esse. Nobis quam facere aperiam odit beatae labore obcaecati fugit molestias blanditiis inventore eos rerum tempore similique ipsam enim reiciendis doloribus, quos quod repudiandae itaque officia. Consectetur labore fugiat blanditiis expedita odio. Beatae fugiat delectus atque perspiciatis saepe neque, tempora, quis nam ex molestias cupiditate assumenda voluptas possimus tenetur? Necessitatibus harum dolorum molestiae veniam, maxime aperiam nemo inventore, iusto modi praesentium, aliquid eaque deserunt nesciunt dolor. Veritatis itaque saepe reprehenderit nihil assumenda sed, eligendi illo praesentium minus quibusdam sequi?</p>
                        
                    </div>
                </div>
            </div>

            <div className='w-full shadow-md p-3 flex flex-col gap-2'>
                <h2 className={`bg-[${Colors.primary}] bg-opacity-25 text-[${Colors.primary}] p-2`}>About the Vice President for Academic Affairs</h2>
                <div className='text-justify'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt consequatur adipisci quod fugit hic cum deleniti tempore unde similique, voluptates quis nesciunt ducimus necessitatibus, earum provident doloribus eos voluptatibus mollitia?</p>
                    <br />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate eveniet reprehenderit laborum est? Inventore, amet. Ipsum alias iure rerum eligendi voluptatibus, commodi ipsa molestiae, consequatur dignissimos minima qui omnis soluta praesentium esse id nisi inventore rem? Quis, unde eos!</p>
                    <br />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate eveniet reprehenderit laborum est? Inventore, amet. Ipsum alias iure rerum eligendi voluptatibus, commodi ipsa molestiae, consequatur dignissimos minima qui omnis soluta praesentium esse id nisi inventore rem? Quis, unde eos!</p>

                </div>
            </div>
        </section>
        <Footer />
    </div>
  )
}
