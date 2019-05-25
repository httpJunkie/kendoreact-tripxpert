import React, { useEffect, useState } from "react";
import * as api from "../data/destinations";
import {
  PanelBar,
  PanelBarItem,
  TabStrip,
  TabStripTab
} from "@progress/kendo-react-layout";
import { Calendar } from "@progress/kendo-react-dateinputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";

const DestinationDetails = ({ match }) => {
  const [destination, setDestination] = useState(null);

  const getDestinations = () => {
    const navDestination = api.getDestination(match.params.id);
    console.log(navDestination);
    setDestination(navDestination);
  };

  useEffect(() => {
    getDestinations();
  }, []);

  const [selectedTab, setSelectedTab] = useState(0);

  const onSelectTab = ({ selected }) => setSelectedTab(selected);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const attractions = [
    {
      title: "Attraction One",
      image: "http://placekitten.com/1000",
      subtitle: "Irure aliquip irure dolore tempor in laborum nisi.",
      description:
        "Laborum magna veniam nostrud sint eu qui cupidatat nostrud mollit veniam. Minim nostrud incididunt in anim proident adipisicing. Esse minim ad in amet elit veniam consectetur ut in excepteur fugiat officia. Exercitation qui eu adipisicing dolore irure. Laborum nisi Lorem culpa ullamco velit tempor officia sint consectetur elit deserunt anim.",
      isOpen: false
    },
    {
      title: "Attraction Two",
      image: "http://placekitten.com/1000",
      subtitle: "Irure aliquip irure dolore tempor in laborum nisi.",
      description:
        "Laborum magna veniam nostrud sint eu qui cupidatat nostrud mollit veniam. Minim nostrud incididunt in anim proident adipisicing. Esse minim ad in amet elit veniam consectetur ut in excepteur fugiat officia. Exercitation qui eu adipisicing dolore irure. Laborum nisi Lorem culpa ullamco velit tempor officia sint consectetur elit deserunt anim.",
      isOpen: false
    },
    {
      title: "Attraction Three",
      image: "http://placekitten.com/1000",
      subtitle: "Irure aliquip irure dolore tempor in laborum nisi.",
      description:
        "Laborum magna veniam nostrud sint eu qui cupidatat nostrud mollit veniam. Minim nostrud incididunt in anim proident adipisicing. Esse minim ad in amet elit veniam consectetur ut in excepteur fugiat officia. Exercitation qui eu adipisicing dolore irure. Laborum nisi Lorem culpa ullamco velit tempor officia sint consectetur elit deserunt anim.",
      isOpen: false
    },
    {
      title: "Attraction Four",
      image: "http://placekitten.com/1000",
      subtitle: "Irure aliquip irure dolore tempor in laborum nisi.",
      description:
        "Laborum magna veniam nostrud sint eu qui cupidatat nostrud mollit veniam. Minim nostrud incididunt in anim proident adipisicing. Esse minim ad in amet elit veniam consectetur ut in excepteur fugiat officia. Exercitation qui eu adipisicing dolore irure. Laborum nisi Lorem culpa ullamco velit tempor officia sint consectetur elit deserunt anim.",
      isOpen: false
    },
    {
      title: "Attraction Five",
      image: "http://placekitten.com/1000",
      subtitle: "Irure aliquip irure dolore tempor in laborum nisi.",
      description:
        "Laborum magna veniam nostrud sint eu qui cupidatat nostrud mollit veniam. Minim nostrud incididunt in anim proident adipisicing. Esse minim ad in amet elit veniam consectetur ut in excepteur fugiat officia. Exercitation qui eu adipisicing dolore irure. Laborum nisi Lorem culpa ullamco velit tempor officia sint consectetur elit deserunt anim.",
      isOpen: false
    },
    {
      title: "Attraction Six",
      image: "http://placekitten.com/1000",
      subtitle: "Irure aliquip irure dolore tempor in laborum nisi.",
      description:
        "Laborum magna veniam nostrud sint eu qui cupidatat nostrud mollit veniam. Minim nostrud incididunt in anim proident adipisicing. Esse minim ad in amet elit veniam consectetur ut in excepteur fugiat officia. Exercitation qui eu adipisicing dolore irure. Laborum nisi Lorem culpa ullamco velit tempor officia sint consectetur elit deserunt anim.",
      isOpen: false
    },
    {
      title: "Attraction Seven",
      image: "http://placekitten.com/1000",
      subtitle: "Irure aliquip irure dolore tempor in laborum nisi.",
      description:
        "Laborum magna veniam nostrud sint eu qui cupidatat nostrud mollit veniam. Minim nostrud incididunt in anim proident adipisicing. Esse minim ad in amet elit veniam consectetur ut in excepteur fugiat officia. Exercitation qui eu adipisicing dolore irure. Laborum nisi Lorem culpa ullamco velit tempor officia sint consectetur elit deserunt anim.",
      isOpen: false
    }
  ];

  return destination ? (
    <div style={{ height: "100%" }}>
      <div>
        <div
          style={{
            width: "100%",
            height: 400,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${destination.DefaultImage})`
          }}
        />
        <div
          style={{
            padding: 30,
            marginTop: 30,
            width: "50%",
            marginLeft: "20%",
            justifyContent: "space-around"
          }}
        >
          <h2>{destination.Title}</h2>
          <ul
            style={{
              paddingLeft: 15,
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            {destination &&
              destination.ShortDescription.map(sd => (
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
          {/* <p style={{ marginTop: 15 }}>{destination.FullDescription}</p> */}
          <p style={{ marginTop: 15 }}>{`From $${destination.LowestPrice}`}</p>
          <p
            style={{
              cursor: "pointer",
              marginTop: 15,
              color: "blue"
            }}
            onClick={() => setIsDialogOpen(oldState => !oldState)}
          >
            View full price info
          </p>
        </div>
        <div style={{ position: "absolute", top: 350, right: 150 }}>
          <Calendar />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          backgroundColor: "#fff",
          justifyContent: "center"
        }}
      >
        <div style={{ width: "70vw", marginTop: 30 }}>
          <TabStrip selected={selectedTab} onSelect={onSelectTab}>
            <TabStripTab title="Overview">
              <div
                style={{ display: "flex", flexDirection: "row", padding: 15 }}
              >
                <p style={{ margin: 15, fontWeight: "300" }}>
                  {destination.FullDescription}
                </p>
                <p
                  style={{
                    margin: 15,
                    fontStyle: "italic",
                    fontWeight: "lighter",
                    color: "hsl(209, 11%, 45%)"
                  }}
                >
                  Id proident officia esse nostrud. Non quis nostrud commodo
                  aliqua nulla duis enim ut officia. Enim irure ut incididunt
                  sunt qui ullamco sit cupidatat qui voluptate occaecat
                  adipisicing quis irure. Ex voluptate anim non veniam. Elit
                  esse occaecat duis sunt et irure. Id duis ipsum cupidatat
                  irure magna consectetur pariatur consequat deserunt proident.
                  -- A Testimonial
                </p>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px dashed hsl(209, 11%, 45%)"
                }}
              >
                <p style={{ color: "hsl(209, 11%, 45%)", fontSize: 100 }}>
                  MAP
                </p>
              </div>
            </TabStripTab>
            <TabStripTab title="Attractions">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                {attractions.map(attraction => (
                  <div
                    key={`${attraction.title}`}
                    className="card"
                    style={{
                      width: "300px",
                      margin: 15,
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <div
                      style={{
                        height: 250,
                        width: "100%",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundImage: `url(${attraction.image})`
                      }}
                    />
                    <PanelBar>
                      <PanelBarItem title={attraction.subtitle}>
                        <p style={{ padding: 15 }}>{attraction.description}</p>
                      </PanelBarItem>
                    </PanelBar>
                  </div>
                ))}
              </div>
            </TabStripTab>
            <TabStripTab title="Enquiry">
              <form className="k-form" onSubmit={null}>
                <fieldset>
                  <legend>Contact an Expert:</legend>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row"
                    }}
                  >
                    <Input
                      name="firstName"
                      style={{ width: "50%" }}
                      label="First Name"
                      pattern={"[A-Za-z]+"}
                      minLength={2}
                      required={true}
                    />
                    <Input
                      name="lastName"
                      style={{ width: "50%" }}
                      label="Last Name"
                      pattern={"[A-Za-z]+"}
                      minLength={2}
                      required={true}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row"
                    }}
                  >
                    <Input
                      name="email"
                      type="email"
                      style={{ width: "50%" }}
                      label="Email address"
                      required={true}
                    />
                    <Input
                      name="phoneNumber"
                      type="telephoneNumber"
                      style={{ width: "50%" }}
                      label="Phone Number"
                      required={true}
                    />
                  </div>
                  <Input
                    name="comments"
                    type="textarea"
                    style={{ width: "100%" }}
                    label="Comments"
                    required={true}
                  />
                </fieldset>
                <input
                  type="submit"
                  className="k-button k-primary"
                  value="Search"
                />
              </form>
            </TabStripTab>
          </TabStrip>
        </div>
      </div>

      {isDialogOpen && (
        <Dialog style={{ width: 500, marginLeft: "33%" }}>
          <p>
            Duis culpa et proident ullamco est excepteur eu et et anim esse
            consectetur eu aliquip. Ex dolor pariatur magna ad velit proident
            consectetur excepteur aute amet. Mollit nostrud qui exercitation non
            dolor aliquip sunt mollit do reprehenderit ut commodo. Laborum ut
            voluptate sit nisi eu cillum do ipsum. Incididunt esse Lorem aliqua
            cupidatat velit. Eu cillum elit eiusmod est irure in do ipsum
            nostrud ea ullamco.
          </p>
          <DialogActionsBar>
            <Button onClick={() => setIsDialogOpen(oldState => !oldState)}>
              Close
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  ) : null;
};

export default DestinationDetails;
