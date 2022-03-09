import React from "react";
import Node from "../components/Node";
import MonthlyCalendar from "../components/MonthlyCalendar";
import WeeklyStudyPlan from "../components/WeeklyStudyPlan";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Home.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Home = () => {
  const [expandedCourses, setExpandedCourses] = React.useState(false);
  const [expandedWeek, setExpandedWeek] = React.useState(false);
  const [expandedMonth, setExpandedMonth] = React.useState(false);

  const handleExpandClick = (actionType) => {
    switch (actionType) {
      case "course":
        setExpandedCourses(!expandedCourses);
        break;
      case "week":
        setExpandedWeek(!expandedWeek);
        break;
      case "month":
        setExpandedMonth(!expandedMonth);
        break;
      default:
        break;
    }
  };

  return (
    <div id="Home-Div">
      <Card sx={{ maxWidth: "80%", width: "80%" }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Course Graph"
          subheader="View and add courses"
        />
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandedCourses}
            onClick={() => handleExpandClick("course")}
            aria-expanded={expandedCourses}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedCourses} timeout="auto" unmountOnExit>
          <CardContent>
            <Node />
          </CardContent>
        </Collapse>
      </Card>
      <Card sx={{ maxWidth: "80%", width: "80%" }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Weekly Study Plan"
          subheader="View and add courses"
        />
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandedWeek}
            onClick={() => handleExpandClick("week")}
            aria-expanded={expandedWeek}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedWeek} timeout="auto" unmountOnExit>
          <CardContent>
            <WeeklyStudyPlan />
          </CardContent>
        </Collapse>
      </Card>
      <Card sx={{ maxWidth: "80%", width: "80%" }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Monthly Calendar"
          subheader="View and add courses"
        />
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandedMonth}
            onClick={() => handleExpandClick("month")}
            aria-expanded={expandedMonth}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedMonth} timeout="auto" unmountOnExit>
          <CardContent>
            <MonthlyCalendar />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default Home;
