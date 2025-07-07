import axios from 'axios';
import { buildFetchGeographicData, buildFetchTripDataRequest } from './requestMappers';

const api_url = process.env.VUE_APP_API_URL;

export async function fetchBikeSPData(dataConfig) {
  const payload = buildFetchTripDataRequest(dataConfig)
  try {
    const response = await axios.post(`${api_url}/bikesp/fetch_trip_data`, payload);
    return response.data.data || [];
  } catch (error) {
    console.error("Error in bikeSPService.fetchBikeSPData:", error);
    throw error;
  }
}

export async function fetchGeographicBikeSPData(data) {
  const payload = buildFetchGeographicData(data)
  try {
    const response = await axios.post(`${api_url}/bikesp/fetch_geographic_data`, payload);
    return response.data.data || [];
  } catch (error) {
    console.error("Error in bikeSPService.fetchGeographicBikeSPData:", error);
    throw error;
  }
}