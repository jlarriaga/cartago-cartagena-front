import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import tripService from "../../services/trip.services";
import propertyService from "../../services/property.services";
import dayjs from "dayjs";

import { Fragment } from 'react'
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function TripDetails() {
  const [tripDetail, setTripDetail] = useState({});
  const [properties, setProperties] = useState([]);
  const params = useParams();

  const getTripDetails = async () => {
    try {
      const response = await tripService.tripDetails(params);
      setTripDetail(response.data);
    } catch (error) {
      console.log("Error finding Trip by Id", error);
    }
  };

  const getPropertiesDetails = async () => {
    try {
      const propertiesArray = tripDetail.foundTrip._properties.map((id) =>
        propertyService.propertyDetails({ id })
      );
      const resolvedProperties = await Promise.all(propertiesArray);
      console.log("resolvedProperties", resolvedProperties);
      setProperties(resolvedProperties);
    } catch (error) {
      console.log("Error getting property details", error);
    }
  };
  const { jsPDF } = require("jspdf")

  const generatePDF = () => {
  console.log("Hola botones")
  const doc = new jsPDF();
  let initialY = 84;
  
  doc.addImage("https://res.cloudinary.com/dhfx7lukl/image/upload/v1679621395/cartago-cartagena/Logo_BW_bix2bi.png",'PNG',10,20,40,10,"logo-cartago")
  doc.text("Trip Details", 10, 50);
  doc.text(`Check-in: ${dayjs(tripDetail.foundTrip.checkInDate).format("YYYY-MM-DD")}`, 10, 57);
  doc.text(`Check-out: ${dayjs(tripDetail.foundTrip.checkOutDate).format("YYYY-MM-DD")}`, 10, 64);
  doc.text("Properties Available", 10, 74);
  
  for(let i = 0; i < properties.length; i++){
    doc.addImage(properties[i].data.propertyFound.images[0],'JPEG',10,initialY,80,60,`casa-${i}`)
    doc.text(properties[i].data.propertyFound.title, 10, initialY+70)
    doc.text(`Price per night: ${String(properties[i].data.propertyFound.pricePerNight)}`, 10, initialY+80)
   
    doc.text(properties[i].data.propertyFound.moreInfo, 10, initialY+90)
    initialY = initialY + 120;
  }

  doc.save("trip-details.pdf");
};

  useEffect(() => {
    getTripDetails();
  }, []);

  useEffect(() => {
    if (tripDetail.foundTrip && tripDetail.foundTrip._properties) {
      console.log("Trip Details:", tripDetail);
      console.log("Properties Ids", tripDetail.foundTrip._properties);
      getPropertiesDetails();
    }
  },[tripDetail]);


  useEffect(() => {
    console.log("This are the properties", properties);
  }, [properties]);


  return (
    <div>
    {tripDetail.foundTrip && (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className=" text-left text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Trip Details
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Jose Luis
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Remote
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            $120k &ndash; $140k
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {dayjs(tripDetail.foundTrip.checkInDate).format("YYYY-MM-DD")} to {dayjs(tripDetail.foundTrip.checkOutDate).format("YYYY-MM-DD")}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Edit
          </button>
        </span>

  

        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={generatePDF}          
          >
            <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
            Create PDF
          </button>
        </span>

        {/* Dropdown */}
        <Menu as="div" className="relative ml-3 sm:hidden">
          <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
            More
            <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    View
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
    )}






   

    <h2 className="mt-5 mb-2 text-left text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
          Properties Available
        </h2>
      {properties.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {properties.map((properties, id) => (
            <li key={id} className="relative">
            {/* <p className="text-left pointer-events-none mt-2 block truncate text-lg font-medium text-gray-900">
                {properties.data.propertyFound.title}
              </p> */}
              <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  src={properties.data.propertyFound.images[0]}
                  alt=""
                  className="pointer-events-none object-cover group-hover:opacity-75"
                />
                <button
                  type="button"
                  className="absolute inset-0 focus:outline-none"
                >
                  <span className="sr-only">
                    View details for {properties.title}
                  </span>
                </button>
              </div>
              <p className="pointer-events-none mt-2 block truncate text-lg font-medium text-gray-900">
                {properties.data.propertyFound.title}
              </p>
              <p className="leading-snug pointer-events-none block text-sm font-medium text-gray-500">
                {properties.data.propertyFound.moreInfo}
              </p>
              <div className="flex items-center justify-between py-2">
                <span className="text-xl font-bold text-gray-900 dark:text-gray-900">
                  ${properties.data.propertyFound.pricePerNight}
                </span>
                <p className="leading-snug pointer-events-none block text-left text-sm font-medium text-gray-500">per night</p>
                
                {/* <a href="#" className=" mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10">Add</a> */}
              </div>
              
            </li>
          ))}
        </ul>
        
      ) : (
        <p>No properties found.</p>
      )}
      
    </div>
  );
}
