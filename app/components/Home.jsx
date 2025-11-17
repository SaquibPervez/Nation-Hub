"use client";
import React, { useCallback, useEffect, useState } from "react";
import CountryGrid from "./CountryGrid";
import Navbar from "./Navbar";
import { MdOutlineSearch } from "react-icons/md";
const Home = () => {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_API
  const fetchCountries = useCallback(async (endpoint) => {
    try {
      const response = await fetch(
        `${API}/${endpoint}`
      );

      if (!response.ok) {
        setError("Please enter a correct country....");
        setCountries([]);
        return;
      }
      const data = await response.json();
      setCountries(data);
      setError('')
    } catch (error) {
      setError("Network error");
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (name.length > 0) {
        fetchCountries(`name/${name}`);
      } else if (region) {
        fetchCountries(`region/${region}`);
      } else {
        fetchCountries("region/asia");
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [name, region, fetchCountries]);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="bg-gray-100 dark:bg-gray-900 px-5 sm:px-20 pt-10 flex flex-col justify-between sm:flex-row gap-6">
        <div className="relative w-full sm:w-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MdOutlineSearch className="w-5 h-5 text-gray-500" />
          </div>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="block w-full pl-10 pr-3 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:text-gray-200 text-sm rounded-lg shadow-xs placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for any country"
          />
        </div>

        <div className="w-full sm:w-60 ">
          <select
            className="block w-full py-3 px-4 border border-gray-300 text-gray-700 text-sm rounded-lg shadow-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-gray-200"
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="americas">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>
      {error && (
        <div className="flex items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft border border-danger-subtle px-5 sm:px-20" role="alert">
  {error}
</div>
      )}
      <CountryGrid countries={countries} />
    </section>
  );
};

export default Home;
