import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "600px",
};

const MapPage = ({ google }) => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    Meteor.call("getAllVisits", (e, r) => {
      if (!e) setVisits(r);
    });
  }, []);

  var bounds = new google.maps.LatLngBounds();
  visits.forEach((v) => bounds.extend(v));

  return (
    <div className="section">
      <div className="container">
        <Map
          google={google}
          zoom={14}
          containerStyle={containerStyle}
          bounds={bounds}
        >
          {visits.map((v) => (
            <Marker
              key={v._id}
              name={v.name}
              position={{ lat: v.lat, lng: v.lng }}
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: Meteor.settings.googleMapsAPIKey,
})(MapPage);
