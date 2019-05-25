import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { useMedia } from "react-use-media";
import * as api from "../data/destinations";

const Destinations = ({ match }) => {
  document.title = `TripXpert Destinations`;
  const isMd = useMedia("(min-width: 768px)") ? true : false;

  const [destinations, setDestinations] = useState([]);

  const getDestinations = () => {
    const retrievedDestinations = api.getAllDestinations();
    setDestinations(retrievedDestinations);
  };

  useEffect(() => {
    getDestinations();
  }, []);

  return (
    <div style={{ padding: 15 }}>
      <div className="content-description text-center">
        <h3 className="title">Available Destinations</h3>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "80vw",
            justifySelf: "center"
          }}
        >
          {destinations.length > 0
            ? destinations.map(destination => {
                const {
                  DestinationID,
                  DefaultImage,
                  LowestPrice,
                  Title,
                  ShortDescription,
                  Rating
                } = destination;
                return (
                  <div
                    key={`${DestinationID}`}
                    className="card"
                    style={{
                      minHeight: `300px`,
                      minWidth: 300,
                      maxWidth: 400,
                      display: "flex",
                      flexDirection: "column",
                      margin: 15,
                      backgroundColor: "#fff"
                    }}
                  >
                    <div
                      style={{
                        flex: 0.9,
                        backgroundImage: `url(
                        ${DefaultImage}
                      )`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    <div>
                      <h3 style={{ padding: 15 }}>{Title}</h3>
                      <ul
                        style={{
                          paddingLeft: 15,
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap"
                        }}
                      >
                        {ShortDescription.map(sd => (
                          <span
                            style={{
                              fontSize: "8",
                              color: "hsl(209, 11%, 45%)"
                            }}
                          >
                            {sd}&nbsp;
                          </span>
                        ))}
                      </ul>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          padding: " 20px 15px 0px 15px"
                        }}
                      >
                        <p style={{ color: "red" }}>From {`$${LowestPrice}`}</p>
                        <a
                          href={`/destinationDetails/${DestinationID}`}
                          style={{ textDecoration: "none" }}
                        >
                          Show Details
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            : []}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
