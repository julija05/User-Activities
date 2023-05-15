import axios from 'axios';
axios.defaults.withCredentials = true;
export async function fetchActivities($route="/api/v1/userActivities", startDate = null, endDate = null,) {
  try {
    const response = await axios.get($route, {
      params: {
        startDate,
        endDate,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch activities');
  }
}
