import React, { useState, useEffect } from 'react';
import './index.css';
import Icon from '@mdi/react';
import { mdiMapMarkerMultiple } from '@mdi/js';
const Midnav = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=801271f3886cf2fcf260ec83adea8d1f`)
            .then((response) => response.json())
            .then((data) => {
              const city = data[0]?.name;
              const state = data[0]?.state;
              setLocation({ city, state, coordinates: { latitude, longitude } });
            })
            .catch((error) => console.error('Error fetching location information:', error));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div className="midnav">
      {location ? (
        <div>
          <h4><Icon path={mdiMapMarkerMultiple} size={1} />{location.city}, {location.state}</h4>
          <h6>{location.coordinates.latitude}° N & {location.coordinates.longitude}° E</h6>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
      <form className="form-inline d-flex justify-content-right md-form form-sm mt-0">
        <i className="fas fa-search" aria-hidden="true"></i>
        <input className="form-control form-control-sm " type="text" placeholder="Search"
          aria-label="Search" />
      </form>
    </div>
  );
};

export default Midnav;
