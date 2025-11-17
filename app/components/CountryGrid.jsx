import Image from "next/image";
import Link from "next/link";

const CountryGrid = ({ countries }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 sm:px-12 py-10 ">
      {countries.map((country) => (
        <Link
          href={`/details/${country.name.common}`}
          key={country.cca3}
          className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out overflow-hidden sm:w-4/5 w-full mx-auto mt-4"
        >
          <div className="relative w-full h-45">
            <Image
              src={country.flags.png}
              alt={country.flags.alt || `${country.name.common} flag`}
              fill
              className="object-cover"
              loading="eager"
            />
          </div>

          <div className="grow px-6 pt-4 pb-8 ">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              {country.name.common}
            </h3>

            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-400">
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital?.[0] || "N/A"}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountryGrid;
