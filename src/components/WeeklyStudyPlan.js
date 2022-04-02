/* eslint-disable react/destructuring-assignment */
import React from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  DragDropProvider,
  EditRecurrenceMenu,
  AppointmentForm,
  ConfirmationDialog,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  TodayButton,
  Resources,
  GroupingPanel,
  ViewSwitcher,
} from "@devexpress/dx-react-scheduler-material-ui";
import { blue, orange } from "@mui/material/colors";
import { recurrenceAppointments } from "../utils/constants";
import {
  getDocs,
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const { db } = require("../utils/firebaseConfig");

const dragDisableIds = new Set([3, 8, 10, 12]);

const allowDrag = ({ id }) => !dragDisableIds.has(id);
const appointmentComponent = (props) => {
  if (allowDrag(props.data)) {
    return <Appointments.Appointment {...props} />;
  }
  return (
    <Appointments.Appointment
      {...props}
      style={{ ...props.style, cursor: "not-allowed" }}
    />
  );
};

const resources = [
  {
    fieldName: "priorityId",
    title: "Priority",
    instances: [
      { text: "Low Priority", id: 1, color: blue },
      { text: "High Priority", id: 2, color: orange },
    ],
  },
];
const groupOrientation = (viewName) => viewName.split(" ")[0];
const grouping = [
  {
    resourceName: "priorityId",
  },
];

export default class WeeklyStudyPlan extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentDate: new Date("2022-03-25"),
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.fetchData = this.fetchData.bind(this);
    this.onCommitChanges = this.onCommitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const fetchedCourses = await getDocs(collection(db, "week"));
    fetchedCourses.forEach((doc) => {
      this.setState({
        data: [
          ...new Set([
            ...this.state.data,
            {
              id: doc.id,
              ...doc.data(),
            },
          ]),
        ],
      });
    });
  }

  async onCommitChanges({ added, changed, deleted }) {
    let { data } = this.state;
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      // data = [...data, { id: startingAddedId, ...added }];
      const sDate = added.startDate,
        eDate = added.endDate;
      added.startDate = sDate.toString();
      added.endDate = eDate.toString();
      await setDoc(doc(db, "week", startingAddedId), {
        ...added,
      });
      added.startDate = sDate;
      added.endDate = eDate;
      data = [...data, { id: startingAddedId, ...added }];
    }
    if (changed) {
      data.map(async (appointment) => {
        if (changed[appointment.id]) {
          const sDate = changed[appointment.id].startDate,
            eDate = changed[appointment.id].endDate;
          if (sDate !== undefined) {
            changed[appointment.id].startDate = sDate.toString();
          }

          if (eDate !== undefined) {
            changed[appointment.id].endDate = eDate.toString();
          }
          await updateDoc(doc(db, "week", appointment.id), {
            ...appointment,
            ...changed[appointment.id],
          });
          // appointment = { ...appointment, ...changed[appointment.id] };
        }
      });

      data = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      // data = data.filter((appointment) => appointment.id !== deleted);
      await deleteDoc(doc(db, "week", deleted));
      data = data.filter((appointment) => appointment.id !== deleted);
    }
    // this.fetchData();
    this.setState({ data });
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  render() {
    const {
      currentDate,
      data,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
    } = this.state;

    return (
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState defaultCurrentDate={currentDate} />
          <EditingState
            onCommitChanges={this.onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <GroupingState
            grouping={grouping}
            groupOrientation={groupOrientation}
          />
          <EditRecurrenceMenu />

          <WeekView
            startDayHour={9}
            endDayHour={17}
            excludedDays={[0, 6]}
            cellDuration={60}
            name="Vertical Orientation"
          />
          <WeekView
            startDayHour={9}
            endDayHour={17}
            excludedDays={[0, 6]}
            name="Horizontal Orientation"
          />

          <Appointments appointmentComponent={appointmentComponent} />
          <Resources data={resources} mainResourceName="priorityId" />

          <IntegratedGrouping />
          <IntegratedEditing />

          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments />

          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />

          <GroupingPanel />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <DragDropProvider allowDrag={allowDrag} />
        </Scheduler>
      </Paper>
    );
  }
}
