export async function getSiteData() {
  try {
    const res = await fetch(process.env.API_V1 + 'get-sitedata/', {
      method: 'GET',
      cache: 'no-store'
    });
    if (res.status === 200) {
      const { data } = await res.json();
      return data; // Return the data if the request was successful
    }
    console.error('Failed to fetch data');
    return;
  } catch (error) {
    console.error('Error fetching data:', error);
    return; // Return an error in case of an error
  }
}
