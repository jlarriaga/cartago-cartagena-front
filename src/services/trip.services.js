import axios from "axios";

class TripService {
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

    allTrips = (requestBody) => {
    return this.api.get("/trip/all-trips", requestBody);
  };
    tripDetails = (requestBody) => {
    return this.api.get(`trip/${requestBody.id}`,requestBody);
  };
    create = (requestBody) => {
    return this.api.post("/trip/create", requestBody);
  
  };

  

  
}

const tripService = new TripService();

export default tripService;