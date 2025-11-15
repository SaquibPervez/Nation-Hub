import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default async function Details({ params }) {
    const {name} = await params
    const API = process.env.NEXT_PUBLIC_API
    const res = await fetch(`${API}/name/${name}`,{
        next: { revalidate: 0 }
    }
    )

     if (!res.ok) {
    return (
      <section className="px-5 sm:px-20 py-10">
        <h1 className="text-red-500 text-xl">Country not found.</h1>
      </section>
    );
  }

  const [country] = await res.json();

  return (
      <section className="px-5 sm:px-20 py-10 bg-gray-100 dark:bg-gray-900 h-screen">
        <Link href={'/'}>
        <button className= "flex items-center gap-2 bg-gray-100 dark:bg-gray-600/50 px-6 py-1.5 rounded-md cursor-pointer shadow-xl">

            <MdOutlineKeyboardBackspace className='text-xl' /> Back
        </button>
        </Link>

<div className="grid grid-cols-2 grid-rows-1 gap-20 mt-20 items-center">
    <div>
        <div className="relative w-full h-100">
                   <Image
                     src={country.flags.png}
                     alt={country.flags.alt || `${country.name.common} flag`}
                     fill
                     className="object-contain"
                     loading="eager"
                   />
                 </div> 
    </div>

    <div>

         <h2 className='mb-8 text-4xl font-semibold'> {country.name.common}</h2>
         <div>

         <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population}</p>
         </div>
    </div>
</div>
    
    </section>
  )
}
