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
  AllDayPanel,
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
      data: recurrenceAppointments,
      currentDate: new Date("2022-03-25"),
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.onCommitChanges = this.onCommitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  onCommitChanges({ added, changed, deleted }) {
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
