import React from "react";
import { Rating } from "@mui/lab";
import { makeStyles } from '@mui/styles'; 
import FavoriteIcon from "@mui/icons-material/Favorite";

type BarProps = {
  rating: number;
  showText: boolean;
};

const useStyles = makeStyles({root:{
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
}});

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  const classes = useStyles();
  return (
    <div className="health-bar">
      <Rating
        className={classes.root}
        readOnly
        value={4 - rating}
        max={4}
        icon={<FavoriteIcon fontSize="inherit" />}
      />

      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;
