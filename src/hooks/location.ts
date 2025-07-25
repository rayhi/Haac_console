
import { useState, useEffect } from "react";
import api from "./api";

interface Village {
  id: number;
  name: string;
}
interface Ward {
  id: number;
  name: string;
  villages: Village[];
}
interface SubCounty {
  id: number;
  name: string;
  wards: Ward[];
}
interface County {
  id: number;
  name: string;
  sub_counties: SubCounty[];
}

export const useLocationData = () => {
const [counties, setCounties] = useState<County[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  // Fetch all counties, sub-counties, wards, and villages
  const fetchAllLocations = async () => {
    setLoading(true);

    try {
         const token = localStorage.getItem("authToken");
         if (!token) {
           console.error("No token found, please log in.");
           return;
         }
              const response = await api.get("/locations/get_locations", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
      setCounties(response.data.data.counties);
      console.log(response.data.data.counties , "all locations")
      setError(null);
    } catch (error) {
      setError("Failed to fetch all locations");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific county by ID
  const fetchCounty = async (countyId: number) => {
    setLoading(true);
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }
      const response = await api.get(
        `locations/get_locations?getCounties=${countyId}`,
      {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
                console.log(response.data.data, "all county");
      return response.data.data;
     
    } catch (error) {
      setError(`Failed to fetch county with ID ${countyId}`);
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific sub-county by ID
  const fetchSubCounty = async (subCountyId: number) => {
    setLoading(true);
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }
      const response = await api.get(
        `/locations/get_locations?getSubcounties=${subCountyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        console.log(response.data.data, "all sub counties");
      return response.data.data;
    } catch (error) {
      setError(`Failed to fetch sub-county with ID ${subCountyId}`);
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific ward by ID
  const fetchWard = async (wardId: number) => {
    setLoading(true);
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }
      const response = await api.get(
        `/locations/get_locations?getWards=${wardId}`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
                console.log(response.data.data, "all wards");
      
      return response.data.data;
    } catch (error) {
      setError(`Failed to fetch ward with ID ${wardId}`);
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchAllLocations();
  }, []);

  return {
    counties,
    fetchCounty,
    fetchSubCounty,
    fetchWard,
    loading,
    error,
  };
};
