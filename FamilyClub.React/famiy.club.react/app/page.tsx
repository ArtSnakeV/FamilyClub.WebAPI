import Image from "next/image";


export default async function Home() {
/////////////////////////////////////////////////////
// Added to test connection between backend and frontend
  let message = "Loading...";
  try {
    const response = await fetch('https://localhost:7069/api/Home', {
      cache: 'no-store' // This ensures we get fresh data every time
    });
    
    if (response.ok) {
      message = await response.text(); // We use .text() because the API returns a string
    } else {
      message = "Error: Backend reached but returned " + response.status;
    }
  } catch (error) {
    console.log("REAL ERROR:", error);
    message = "Connection Failed: Is the Backend running?";
  }
/////////////////////////////////////////////////////

  return (
    <h1>Our amazing `body`.</h1>

  );
}
