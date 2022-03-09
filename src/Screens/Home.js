import React from "react";
import Node from "../components/Node";
import MonthlyCalendar from "../components/MonthlyCalendar";
import WeeklyStudyPlan from "../components/WeeklyStudyPlan";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Home = () => {
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(() => ({
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{ width: "50%", height: "100%" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ width: "35%", flexShrink: 0 }}>
            Course Graph
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            View and set your courses
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Node />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography sx={{ width: "35%", flexShrink: 0 }}>
            Daily Schedule
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            View your classes for the week
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <WeeklyStudyPlan />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
          <Typography sx={{ width: "35%", flexShrink: 0 }}>Calendar</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            View your due dates
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MonthlyCalendar />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Home;
