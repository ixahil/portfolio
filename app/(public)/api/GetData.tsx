export default async function getData() {
  try {
    const res = await fetch(process.env.APIBASEURL + "get-all-project");

    if (!res.ok) {
      // Handle non-ok response (e.g., 404 or 500) by throwing an error
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data; // Return the data if the request was successful
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return a default value (null) in case of an error
  }
}
