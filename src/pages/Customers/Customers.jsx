import CustomerTable from "../../components/CustomerTable/CustomerTable"
import {useState,useEffect} from "react"
import customerService from "../../services/customer.service"


function Customers(){

    const [customers, setCustomers]= useState([])
    
    useEffect(()=>{
    customerService.allCustomers()
    .then((response)=> {setCustomers(response.data)} )
    .catch((error)=>console.log(error))
  },[])

    return (
        <>
        <h2 className="mt-4 mb-4 text-left text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Customers
        </h2>
            <CustomerTable customers={customers}/>
        </>
    )
}

export default Customers