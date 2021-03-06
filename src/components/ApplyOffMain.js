import React, { useState, useEffect } from "react";
import "./ApplyOffMain.css";

import { IoTimeOutline } from "react-icons/io5";
import { IoMdBed } from "react-icons/io";
import { FaBath } from "react-icons/fa";
import StarRating from "./StarRating";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";

import HouseImg from "../images/off-campus-01.jpg";
import axios from 'axios';

function ApplyOffMain({filteringPrice, houseType}) {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/offcampus/")
      .then((response) => {
        setHouses(response.data.filter((data) => data.approved === true));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  let filteredHouses;
  filteredHouses = houses.filter((house)  => {
    return house.price <= filteringPrice
  })
  filteredHouses = filteredHouses.filter((house) => {
    return house.gender === houseType
  })

  const [apply, setApply] = useState(false);
  const [moreInfoBtnText, setMoreInfoBtnText] = useState("More Info");

  const onApply = () => {
    setApply(!apply);
    if (apply) {
      setMoreInfoBtnText("More Info");
    } else {
      setMoreInfoBtnText("Close");
    }
  };

  return (
    <div className="ApplyOffMain">
      {filteredHouses.map((house) => {
        return (
          <div className="houseThumb">
            <div className="houseThumbContainer">
              <div className="image">
                <img src={HouseImg} alt="off campus house" />
              </div>
              <div className="text">
                <h4>{house.address}</h4>
                <div className="properties">
                  <span className="icon">
                    <h6>{house.curfew} PM</h6>
                    <IoTimeOutline />
                  </span>
                  <span className="icon">
                    <h6>{house.availableBeds} </h6>
                    <IoMdBed />
                  </span>
                  <span className="icon">
                    <h6>{house.availableBathRooms} </h6>
                    <FaBath />
                  </span>
                </div>
                <h4 className="price">${house.price} / month </h4>
                <div className="ratings">
                  <StarRating />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onApply}
                  endIcon={<Icon>info</Icon>}
                >
                  {moreInfoBtnText}
                </Button>
              </div>
            </div>

            {apply ? (
              <div className="fullDetails">
                <hr />
                <div className="images">
                  <img src={HouseImg} alt="off campus house" />
                  <img src={HouseImg} alt="off campus house" />
                  <img src={HouseImg} alt="off campus house" />
                  <img src={HouseImg} alt="off campus house" />
                </div>
                <div className="description">
                  <h3>Description</h3>
                  <p>
                    {house.description}
                  </p>
                </div>
                <form noValidate autoComplete="off">
                  <div className="form-group">
                    <TextField id="standard-basic" label="Enter Phone Number" />
                  </div>

                  <div className="form-group">
                    <TextField
                      label="Message house owner"
                      multiline
                      rows={4}
                      defaultValue="I am interested in your house"
                      fullWidth
                    />
                  </div>

                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    onClick={onApply}
                  >
                    Send
                  </Button>
                </form>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ApplyOffMain;
