import React, { useEffect, useState } from "react";
import MasonryLayout from "./MasonryLayout";
import { useMedia } from "react-use-media";

/* KendoReact Components and CSS */
import { AutoComplete } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import * as api from "../data/destinations";

const Home = () => {
  document.title = `TripXpert Home`;
  const isMd = useMedia("(min-width: 768px)") ? true : false;
  const offerOptions = ["All", "Special", "Regular"];
  const priceOptions = ["$0 to $999", "$1000 to $1999", "$2000 to $2999"];

  const [destinations, setDestinations] = useState([]);
  const [filterDestinations, setFilterDestinations] = useState([]);

  const getDestinations = () => {
    const retrievedDestinations = api.getAllDestinations();
    setDestinations(retrievedDestinations);
    setFilterDestinations(retrievedDestinations);
    console.log(retrievedDestinations);
  };

  useEffect(() => {
    getDestinations();
  }, []);

  const titles = destinations.map(destination => destination.Title);

  const [selectDestination, setSelectDestination] = useState("");

  const onChange = event => {
    setSelectDestination(event.target.value);
    if (event.target.value === "") {
      setFilterDestinations(destinations);
    }
  };

  const search = () => {
    const matchedDestinations = destinations.filter(
      destination => destination.Title === selectDestination
    );
    setFilterDestinations(matchedDestinations);
  };

  const itemRender = (li, itemProps) => {
    console.log(li, itemProps);
    const thisDest = destinations.find(
      dest => dest.Title === itemProps.dataItem
    );
    const itemChildren = (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img height="100" width="100" src={thisDest.DefaultImage} />
          <div style={{ padding: 15 }}>
            {li.props.children}
            <p>{`$${thisDest.LowestPrice}`}</p>
          </div>
        </div>
      </div>
    );

    return React.cloneElement(li, li.props, itemChildren);
  };

  return (
    <>
      <div className="home-header-container">
        <div className="header-centered">
          <h1>Find the best destinations all around the world</h1>

          <div className="tx-search-sm">
            <span>Find your destination</span>
          </div>

          <div className="tx-search-md">
            <div className="row no-gutters">
              <div className="col-2">
                <AutoComplete data={offerOptions} placeholder="Offer Type" />
              </div>
              <div className="col-3">
                <AutoComplete data={priceOptions} placeholder="Price Range" />
              </div>
              <div className="col-5">
                <AutoComplete
                  data={titles}
                  placeholder="Destinations"
                  itemRender={itemRender}
                  onChange={onChange}
                />
              </div>
              <div className="col-2">
                <Button primary={true} onClick={search}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectDestination === "" && (
        <div className="content-description text-center">
          <h3 className="title">Tripxpert Recomends</h3>
          <p className="text-muted text-italic">
            Explore top destinations and attractions
          </p>
        </div>
      )}
      <div className="masonry-grid">
        <MasonryLayout columns={isMd ? 3 : 2} gap={isMd ? 32 : 24}>
          {filterDestinations.slice(0, 3).map(destination => {
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
                  height: `500px`,
                  display: "flex",
                  flexDirection: "column"
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
                <div
                  style={{
                    flex: 0.1,
                    padding: 15
                  }}
                >
                  <h3>{Title}</h3>
                  <ul
                    style={{
                      marginLeft: 10,
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
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between"
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
          })}
        </MasonryLayout>
      </div>
    </>
  );
};

export default Home;
