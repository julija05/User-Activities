export async function fetchActivities(startDate = null, endDate = null) {
  console.log(startDate,'start')
    const response = await fetch(route('activities.index', {
      startDate, endDate,
    }));
    const data = await response.json();
    return data;
  }