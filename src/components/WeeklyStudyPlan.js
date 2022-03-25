/* eslint-disable react/destructuring-assignment */
import React from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  AppointmentForm,
  ConfirmationDialog,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

const recurrenceAppointments = [
  {
    title: "Finish CP317 Design Document",
    startDate: new Date("March 20, 2022 09:15:00"),
    endDate: new Date("March 20, 2022 012:15:00"),
    id: 100,
    rRule: "FREQ=DAILY;COUNT=3",
  },
  {
    title: "Eat Healthy",
    startDate: new Date("March 21, 2022 012:15:00"),
    endDate: new Date("March 21, 2022 016:15:00"),
    id: 101,
    rRule: "FREQ=DAILY;COUNT=4",
    allDay: true,
  },
  {
    title: "Study for CP363",
    startDate: new Date("March 23, 2022 013:15:00"),
    endDate: new Date("March 23, 2022 014:35:00"),
    id: 102,
    rRule: "FREQ=DAILY;COUNT=5",
  },
  {
    title: "Finish BU121 Assignment",
    startDate: new Date("March 24, 2022 10:00:00"),
    endDate: new Date("March 24, 2022 11:00:00"),
    id: 3,
    location: "Room 2",
  },
  {
    title: "Study for CP317",
    startDate: new Date("March 25, 2022 11:45:00"),
    endDate: new Date("March 25, 2022 013:20:00"),
    id: 4,
    location: "Room 2",
  },
  {
    title: "Study CP363",
    startDate: new Date("March 25, 2022 14:40:00"),
    endDate: new Date("March 25, 2022 15:45:00"),
    id: 5,
    location: "Room 2",
  },
  {
    title: "Read Java Book",
    startDate: new Date("March 26, 2022 09:45:00"),
    endDate: new Date("March 26, 2022 011:15:00"),
    id: 6,
    location: "Room 1",
  },
  {
    title: "Study BU121",
    startDate: new Date("March 26, 2022 11:45:00"),
    endDate: new Date("March 26, 2022 013:05:00"),
    id: 7,
    location: "Room 3",
  },
  {
    title: "Work on CP363",
    startDate: new Date("March 26, 2022 10:00:00"),
    endDate: new Date("March 26, 2022 011:30:00"),
    id: 12,
    location: "Room 2",
  },
];

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

export default class WeeklyStudyPlan extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: recurrenceAppointments,
      currentDate: new Date("2022-03-25"),
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
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
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <EditRecurrenceMenu />
          <WeekView startDayHour={5} endDayHour={21} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments appointmentComponent={appointmentComponent} />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm fullSize={true} />
          <DragDropProvider allowDrag={allowDrag} />
        </Scheduler>
      </Paper>
    );
  }
}
