import React from 'react';

const GoogleMap = () => {
    // Define the latitude and longitude coordinates for Monastir center
    const latitude = 35.7643627;
    const longitude = 10.7288866;
  
    // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
    const apiKey = 'AIzaSyA-Iofy9ZupISK18gmYNj1ZoBY79JeGMEI';
  
    // Generate the URL for embedding the map with the specified location and API key
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`;
  
    return (
      <>
        <iframe src={mapUrl} width="100%" height="450" allowFullScreen="" loading="lazy"></iframe>
      </>
    );
  };
  
  export default GoogleMap;