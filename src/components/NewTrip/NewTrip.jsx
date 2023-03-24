import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FiSearch } from "react-icons/fi";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import PropertiesGrid from "../PropertiesGrid/PropertiesGrid";
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import CreateQuoteModal from "../CreateQuoteModal/CreateQuoteModal";
import NotPropertiesFound from "../NotPropertiesFound/NotPropertiesFound";
import propertyService from "../../services/property.services";
import tripService from "../../services/trip.services";
const Swal = require('sweetalert2')


function SearchBar() {
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkoutDate, setCheckoutDate] = useState(new Date());
  const [numOfTravelers, setnumOfTravelers] = useState(1);
  const [openModal, setOpenModal] = useState(false)
  const [properties, setProperties] = useState([])

  const [customerInfo, setCustomerInfo] = useState({fullName:"", email:""})



  const handleSubmit = (e) => {
    e.preventDefault();
    
    propertyService.availableProperties({checkinDate,checkoutDate,numOfTravelers})
    .then((response)=>setProperties(response.data.availableProperties))
    .catch((error)=>console.log(error,"Error en available properties"))

    console.log(`CheckInDate: ${checkinDate}`);
    console.log(`CheckOutDate: ${checkoutDate}`);
    console.log(`Guests: ${numOfTravelers}`);

  };

  const handleCreatePDF = async () => {
    const tripData = {
      checkInDate:checkinDate,
      checkOutDate:checkoutDate,
      numOfTravelers,
      properties,
      fullName:customerInfo.fullName,
      email:customerInfo.email
    };
    console.log(tripData)

    try {
      
      const tripCreated = await tripService.create(tripData)
      Swal.fire(
        'Good job!',
        'Trip created successfully!',
        'success'
      )
      console.log("se creo el trip con exito",tripCreated)

    } catch (error) {
      console.log("No se creo el trip con exito", error)
    }
  }
  console.log("Esta es la customerinfo",customerInfo)
  return (

    <div>

    <section>
    <BreadCrumb/>
    <h2 className="mt-4 text-left text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          New Trip
        </h2>
    

    <div>
    <form className="bg-white rounded-full flex items-center px-6 py-4 shadow-lg mx-auto w-auto min-w-min max-w-2xl mt-10">
      <div className="flex-grow">
        <div className="relative">
          <div className="flex items-center ">
            <div className="border-r-2">
            <input
              type="date"
              id="checkInDate"
              value={checkinDate}
              onChange={(e) => setCheckinDate(e.target.value)}
              className="block border-none w-full text-center pl-4 pr-12 py-2 text-gray-600 placeholder-gray-300 "
            />
            </div>
            <div className="border-r-2">
            <input
              type="date"
              id="checkOutDate"
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
              className="outline-4 block border-none w-full text-center pl-4 pr-12 py-2  text-gray-900 placeholder-gray-300"
            />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <div className="relative">
          <input
            type="number"
            id="guests"
            min="1"
            value={numOfTravelers}
            onChange={(e) => setnumOfTravelers(e.target.value)}
            className="block border-none w-full text-center pl-4 pr-12 py-2  text-gray-900 placeholder-gray-300 focus:outline-none focus:shadow-outline"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500">Guests</span>
          </div>
        </div>
      </div>
      <div className="ml-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-red-400 hover:bg-red-500 text-white font-bold rounded-full h-12 w-12 flex items-center justify-center focus:outline-none focus:shadow-outline"
        >
          <FiSearch />
         
        </button>
      </div>  
    </form>
    </div>

    <div className="rounded-lg px-6 py-4 shadow-lg mx-auto w-auto min-w-min max-w-8xl mt-10">
     {properties.length ? 

      <PropertiesGrid properties={properties}/>
      
      : <NotPropertiesFound/>} 

    </div>
    </section>
    
    <button
        type="button"
        onClick={()=>setOpenModal(!openModal)}
        className=" mt-8 mb-8 inline-flex items-center gap-x-2 rounded-md bg-green-400 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create Trip
        <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </button>

      {openModal ? (

      <CreateQuoteModal
        onCreatePDF={handleCreatePDF}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
      />
      ) : ""}



    </div>
    
    
    
  );
}

export default SearchBar;
