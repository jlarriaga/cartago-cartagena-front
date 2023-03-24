import axios from "axios";

class PropertyService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
    }

    availableProperties = (requestBody) => {
    return this.api.post("/property/available-properties", requestBody);
    };

    propertyDetails = (requestBody) => {
    return this.api.get(`property/${requestBody.id}`,requestBody);
  };
    propertyDetailsArray = (requestBody) => {
    return this.api.get("/get-properties",requestBody);
  };
}

const propertyService = new PropertyService();

export default propertyService;