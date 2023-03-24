import PropertiesGrid from "../../components/PropertiesGrid/PropertiesGrid";
import {useState, useEffect} from "react"
import propertyService from "../../services/property.services";


function Properties(){
    const [properties, setProperties] = useState([])


    useEffect(()=>{
        propertyService.allProperties()
        .then((response)=>setProperties(response.data))
        .catch((error)=>console.log(error))
    },[])

    return(
        <>
        <h2 className="mt-4 mb-4 text-left text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Properties
        </h2>

        {properties.length ? 
        
        <PropertiesGrid properties={properties}/>
        :
        <h1>Hola soy Properties</h1>

        }

        </>
    )
}

export default Properties;