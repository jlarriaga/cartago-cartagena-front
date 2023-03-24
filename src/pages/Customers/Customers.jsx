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
            <CustomerTable customers={customers}/>
        </>
    )
}

export default Customers