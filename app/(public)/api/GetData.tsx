export async function getAllProjects() {
  try {
    const res = await fetch(process.env.APIBASEURL + "projects", {
      method: "GET",
      cache: "no-store",
    });
    if (res.status === 200) {
      const { projects } = await res.json();
      return projects; // Return the data if the request was successful
    }
    console.error("Failed to fetch data");
    return;
  } catch (error) {
    console.error("Error fetching data:", error);
    return; // Return an error in case of an error
  }
}
