"use client"

import React from 'react'
import { Colors } from '@/constants/colors'
import Image from 'next/image'

export default function PresidentAcademicSection() {
  return (
    <section className='paddingvr flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-4 w-full shadow-md p-3'>
            <div className='col-span-1 flex flex-col gap-2'>
                <Image src={require("@/public/images/cdmssg/adviser.jpg")}/>
                <h3 className='text-3xl'>BGEN. Jose D. Caparas, Jr. (Retired)</h3>
                <h4 className='text-2xl'>Vice President for</h4>
                <ul className='text-blue-400'>
                    <li>rhezamaureengabinite@gmail.com</li>
                    <li>0912345678</li>
                </ul>
            </div>
            <div className='col-span-2 flex flex-col gap-2'>
                <h2 className={`text-3xl text-[${Colors.primary}]`}>A Vision for Tomorrow: The Vice President for Academic Affairs’s Statement</h2>
                <div className='text-justify'>
                    <p className='text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique consequuntur libero architecto vel natus quibusdam possimus ipsam voluptas minus, unde excepturi? Magnam vero sed dolore, quas consequuntur ex. Itaque, sed!</p>
                    <br />
                    <p>As we continue to grow and evolve as a distinguished institution, we remain steadfast in our commitment to providing an environment where students and faculty alike can thrive. It is with great pride that I reflect on the accomplishments of our college and look toward the future with optimism and determination.</p>

                    <br />
                    <p>Over the past few years, we have witnessed remarkable progress in all facets of our academic and student life. Our faculty, whose dedication and passion for teaching set the foundation for our success, have shown extraordinary resilience and creativity in adapting to the changing landscape of education. Through their efforts, we have continued to provide an enriching academic experience that encourages intellectual curiosity and promotes critical thinking.</p>
                    
                    <p>The challenges of the past years have tested our collective strength, yet we have emerged stronger than ever. We are not only learning from these experiences but also growing from them. With every challenge we face, we build the skills, knowledge, and perseverance necessary for the future. We continue to foster an inclusive, supportive, and innovative environment where every member of our community—students, faculty, and staff—can feel empowered to reach their full potential.</p>

                    <p>As we look to the future, we remain focused on our core mission: providing an education that prepares our students to become thoughtful, engaged citizens who can make a positive impact on the world. Our commitment to excellence in teaching, research, and service remains unwavering, and we will continue to expand our reach, enhance our programs, and strengthen our global partnerships.</p>

                    <p>There are countless opportunities before us, and together, we will take them on with determination, collaboration, and vision. I encourage each of you to take part in this exciting journey, to be bold in your aspirations, and to contribute to the growth of our beloved college.</p>

                    <p>Thank you for your continued support and dedication. Together, we will continue to build a brighter future for our college and the generations that follow.</p>
                </div>
            </div>
        </div>

        <div className='w-full shadow-md p-3 flex flex-col gap-2'>
            <h2 className={`bg-[${Colors.primary}] bg-opacity-25 text-[${Colors.primary}] p-2`}>About the President</h2>
            <div className='text-justify flex flex-col gap-3'>
                <p>Rheza Maureen Joy Y. Gabinite, LPT, MBA is an accomplished leader and visionary, committed to guiding Colegio de Montalban toward excellence in higher education. With a deep passion for fostering an inclusive and innovative academic community, Dr. [Last Name] has played a pivotal role in shaping the college’s strategic direction and enhancing its reputation as a leading institution.</p>
                <p>Before joining Colegio de Montalban, Dr. Mercado held senior leadership positions at several prestigious institutions, where they focused on academic growth, student success, and community engagement. With a background in [academic field or area of expertise], Dr. [Last Name] is driven by a deep belief in the transformative power of education and the importance of creating opportunities for all students to succeed.</p>
                <p>Dr. [Last Name] is dedicated to ensuring that the college remains at the forefront of education, research, and community service. Under their leadership, [College Name] has strengthened its commitment to innovation, diversity, and global engagement, positioning it as a hub for critical thinking and intellectual curiosity. They are passionate about building a future where students are not only well-prepared for the challenges of tomorrow but are also inspired to make a meaningful impact in the world.</p>
                <p>An advocate for collaboration, Dr. [Last Name] works closely with faculty, staff, alumni, and students to ensure that [College Name] continues to thrive and evolve. Their leadership is characterized by an unwavering commitment to excellence, integrity, and a vision of an educational environment that nurtures creativity, leadership, and personal growth.</p>
            </div>
        </div>
    </section>
  )

}
