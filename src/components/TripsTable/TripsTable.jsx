import tripService from "../../services/trip.services";
import {useState, useEffect} from "react"
import dayjs from "dayjs"
import { useNavigate, Link } from 'react-router-dom';





function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TripTable() {
  const [trips, setTrips] = useState([])
  

  useEffect(()=>{
    tripService.allTrips()
    .then((response)=> {setTrips(response.data.allTrips)} )
    .catch((error)=>console.log(error))
  },[])

  console.log("los trips", trips)

  const navigate = useNavigate();
  return (
    <div className="mt-24 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-left text-2xl font-semibold leading-6 text-gray-900">Recent Trips</h2>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            type="button"
            to="/dashboard/new-trip"
            className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           New Trip
          </Link>
        </div>
      </div>
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Customer Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Check-in 
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Check-out
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                # Travelers
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Price
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, planIdx) => (
              
              <tr className="hover:bg-slate-50 cursor-pointer" key={planIdx} onClick={() => navigate(`/${trip._id}`)}>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-gray-200',
                    'relative py-4 pl-4 pr-3 text-left text-sm sm:pl-6'
                  )}
                >
                  <div className="font-medium text-gray-900">
                    {trip._customer.fullName}
                  </div>

                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-gray-200',
                    'hidden px-3 py-3.5 text-left text-sm text-gray-500 lg:table-cell'
                  )}
                >
                  {dayjs(trip.checkInDate).format('YYYY-MM-DD')}
                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-gray-200',
                    'hidden px-3 py-3.5 text-left text-sm text-gray-500 lg:table-cell'
                  )}
                >
                  {dayjs(trip.checkOutDate).format('YYYY-MM-DD')}
                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-gray-200',
                    'hidden px-3 py-3.5 text-left text-sm text-gray-500 lg:table-cell'
                  )}
                >
                  {trip.numOfTravelers}
                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-gray-200',
                    'px-3 py-3.5 text-left text-sm text-gray-500'
                  )}
                >
                  <div className="sm:hidden">{trip.price}/mo</div>
                  <div className="hidden sm:block">{trip.price}/month</div>
                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-transparent',
                    'relative py-3.5 pl-3 pr-4  text-sm font-medium sm:pr-6'
                  )}
                >

                  
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    disabled={trip.isCurrent}
                    
                  >
                    PDF<span className="sr-only">, {trip.name}</span>
                  </button>
                 
                  
                  {planIdx !== 0 ? <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" /> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
