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
import AddNode from "../components/AddNode";
import { CourseContext } from "../utils/context";
import { initialNodes, initialEdges } from "../utils/constants";
import Footer from "../components/Footer";
import { useAuth } from "../utils/context";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
const { db } = require("../utils/firebaseConfig");

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
  const [nodes, setNodes] = React.useState([]);
  const [edges, setEdges] = React.useState([]);
  const [error, setError] = React.useState("");
  const { currentUser, logout } = useAuth();

  React.useEffect(() => {
    async function fetchData() {
      const fetchedCourses = await getDocs(collection(db, "courses"));
      let counterX = 0,
        counterY = 0;
      fetchedCourses.forEach((doc) => {
        counterX += 1;

        if (counterX === 3) {
          counterX = 0;
          counterY += 1;
        }
        setNodes((e) =>
          e.concat({
            id: doc.id,
            data: { label: doc.id },
            sourcePosition: "right",
            targetPosition: "left",
            position: {
              x: 500 + 200 * counterX,
              y: 100 + 100 * counterY,
            },
          })
        );
      });

      const fetchedEdges = await getDocs(collection(db, "edges"));
      fetchedEdges.forEach((doc) => {
        setEdges((e) =>
          e.concat({
            id: doc.id,
            source: doc.data().source,
            target: doc.data().target,
            type: "smoothstep",
            animated: true,
          })
        );
      });
    }

    fetchData();
  }, []);

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

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <CourseContext.Provider
      value={{
        open,
        setOpen,
        handleClose,
        handleOpen,
        nodes,
        setNodes,
        edges,
        setEdges,
      }}
    >
      <div id="main-container">
        <div className="nav">
          <img src={SmallLogo} alt="small-logo" />
          <div className="logout-button" variant="link" onClick={handleLogout}>
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
          <Card sx={{ maxWidth: "80%", width: "80%", marginBottom: "2rem" }}>
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
        <Footer id="footer" />
      </div>
    </CourseContext.Provider>
  );
};

export default Home;
