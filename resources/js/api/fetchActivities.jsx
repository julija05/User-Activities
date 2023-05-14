export async function fetchActivities(startDate = null, endDate = null) {
    const response = await fetch(route('activities.index', {
      startDate, endDate,
    }));
    const data = await response.json();
    return data;
  }

