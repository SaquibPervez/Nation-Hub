import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default async function Details({ params }) {
  const { name } = await params;
  const API = process.env.NEXT_PUBLIC_API;
  const res = await fetch(`${API}/name/${name}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return (
      <section className="px-5 sm:px-20 py-10">
        <h1 className="text-red-500 text-xl">Country not found.</h1>
      </section>
    );
  }

  const [country] = await res.json();

  return (
    <section className="px-5 sm:px-20 py-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Link href={"/"}>
        <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-600/50 px-6 py-1.5 rounded-md cursor-pointer shadow-md border border-gray-200 dark:border-gray-600">
          <MdOutlineKeyboardBackspace className="text-xl" /> Back
        </button>
      </Link>

      <div className="grid lg:grid-cols-2 lg:grid-rows-1 sm:gap-20 sm:mt-20 items-center">
        <div>
          <div className="relative w-[280px] h-[280px] sm:w-full sm:h-100">
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
          <h2 className="mb-10 text-4xl font-bold">{country.name.common}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-5 gap-4 text-md">
            <div>
              <span className="font-bold">Native Name:</span>{" "}
              {Object.values(country.name.nativeName)[0].common}
            </div>
            <div>
              <span className="font-bold">Top Level Domain: </span>
              {country.tld?.[0]}
            </div>
            <div>
              <span className="font-bold">Population: </span>
              {country.population}
            </div>

            <div>
              <span className="font-bold">Currencies: </span>{" "}
              {Object.values(country.currencies)[0].name} (
              {Object.values(country.currencies)[0].symbol})
            </div>

            <div>
              <span className="font-bold">Region: </span> {country.region}
            </div>
            <div>
              <span className="font-bold">Languages: </span>
              {Object.values(country.languages).join(", ")}
            </div>
            <div>
              <span className="font-bold">Sub Region: </span>{" "}
              {country.subregion}
            </div>
            <div className="row-start-5">
              <span className="font-bold">Capital: </span>{" "}
              {country.capital?.[0]}
            </div>
          </div>

          <div className="grid sm:grid-cols-4 sm:grid-rows-1 gap-4 items-center mt-10">
            <div>
              <span className="font-bold">Border Countries: </span>
            </div>

            {country.borders?.map((borderCode, index) => (
              <div
                key={index}
                className="px-2 py-1 bg-white border border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-600/50 rounded text-center"
              >
                {borderCode}
              </div>
            )) || <span>Donot have Border Countries.</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
