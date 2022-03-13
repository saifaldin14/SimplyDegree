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
import Modal from "@mui/material/Modal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Add } from "@mui/icons-material";
import "./Home.css";
import SmallLogo from "../assets/signIn/small-logo.svg";
import { useNavigate } from "react-router-dom";
import AddNode from "../components/AddNode";
import { CourseContext } from "../utils/context";
import { initialElements } from "../utils/constants";

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
  let navigate = useNavigate();

  const [expandedCourses, setExpandedCourses] = React.useState(false);
  const [expandedWeek, setExpandedWeek] = React.useState(false);
  const [expandedMonth, setExpandedMonth] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [elements, setElements] = React.useState(initialElements);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <CourseContext.Provider
      value={{ open, setOpen, handleClose, handleOpen, elements, setElements }}
    >
      <div className="nav">
        <img src={SmallLogo} alt="small-logo" />
        <div className="logout-button" onClick={() => navigate("/")}>
          <h1>Log Out</h1>
        </div>
      </div>

      <div id="Home-Div">
        <Card sx={{ maxWidth: "80%", width: "80%" }}>
          <CardHeader title="Course Graph" subheader="View and add courses" />
          <CardActions disableSpacing>
            <IconButton aria-label="add course" onClick={handleOpen}>
              <Add />
            </IconButton>
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
            title="Weekly Study Plan"
            subheader="View and edit your weekly study plan"
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
            title="Monthly Calendar"
            subheader="View and add due dates for the upcoming month"
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

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddNode />
        </Modal>
      </div>
    </CourseContext.Provider>
  );
};

export default Home;
