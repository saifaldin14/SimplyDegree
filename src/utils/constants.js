export const initialNodes = [
  {
    id: "horizontal-1",
    sourcePosition: "right",
    type: "input",
    className: "dark-node",
    data: { label: "CP317" },
    position: { x: 0, y: 80 },
  },
  {
    id: "horizontal-2",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "CP363" },
    position: { x: 250, y: 0 },
  },
  {
    id: "horizontal-3",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "CP213" },
    position: { x: 250, y: 160 },
  },
  {
    id: "horizontal-4",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "CP216" },
    position: { x: 500, y: 0 },
  },
  {
    id: "horizontal-5",
    sourcePosition: "top",
    targetPosition: "bottom",
    data: { label: "CP164" },
    position: { x: 500, y: 100 },
  },
  {
    id: "horizontal-6",
    sourcePosition: "bottom",
    targetPosition: "top",
    data: { label: "CP104" },
    position: { x: 500, y: 230 },
  },
  {
    id: "horizontal-7",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "MA121" },
    position: { x: 750, y: 50 },
  },
  {
    id: "horizontal-8",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "MA103" },
    position: { x: 750, y: 300 },
  },
];

export const initialEdges = [
  {
    id: "horizontal-e1-2",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-2",
    animated: true,
  },
  {
    id: "horizontal-e1-3",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-3",
    animated: true,
  },
  {
    id: "horizontal-e1-4",
    source: "horizontal-2",
    type: "smoothstep",
    target: "horizontal-4",
    label: "edge label",
  },
  {
    id: "horizontal-e3-5",
    source: "horizontal-3",
    type: "smoothstep",
    target: "horizontal-5",
    animated: true,
  },
  {
    id: "horizontal-e3-6",
    source: "horizontal-3",
    type: "smoothstep",
    target: "horizontal-6",
    animated: true,
  },
  {
    id: "horizontal-e5-7",
    source: "horizontal-5",
    type: "smoothstep",
    target: "horizontal-7",
    animated: true,
  },
  {
    id: "horizontal-e6-8",
    source: "horizontal-6",
    type: "smoothstep",
    target: "horizontal-8",
    animated: true,
  },
];

export const recurrenceAppointments = [
  {
    title: "Finish CP317 Design Document",
    startDate: new Date("March 20, 2022 09:15:00"),
    endDate: new Date("March 20, 2022 012:15:00"),
    id: 100,
    priorityId: 2,
    rRule: "FREQ=DAILY;COUNT=3",
  },
  {
    title: "Eat Healthy",
    startDate: new Date("March 21, 2022 012:15:00"),
    endDate: new Date("March 21, 2022 016:15:00"),
    id: 101,
    priorityId: 1,
    rRule: "FREQ=DAILY;COUNT=4",
    allDay: true,
  },
  {
    title: "Study for CP363",
    startDate: new Date("March 23, 2022 013:15:00"),
    endDate: new Date("March 23, 2022 014:35:00"),
    id: 102,
    priorityId: 2,
    rRule: "FREQ=DAILY;COUNT=5",
  },
  {
    title: "Finish BU121 Assignment",
    startDate: new Date("March 24, 2022 10:00:00"),
    endDate: new Date("March 24, 2022 11:00:00"),
    id: 3,
    priorityId: 2,
    location: "Room 2",
  },
  {
    title: "Study for CP317",
    startDate: new Date("March 25, 2022 11:45:00"),
    endDate: new Date("March 25, 2022 013:20:00"),
    id: 4,
    priorityId: 1,
    location: "Room 2",
  },
  {
    title: "Study CP363",
    startDate: new Date("March 25, 2022 14:40:00"),
    endDate: new Date("March 25, 2022 15:45:00"),
    id: 5,
    priorityId: 1,
    location: "Room 2",
  },
  {
    title: "Read Java Book",
    startDate: new Date("March 26, 2022 09:45:00"),
    endDate: new Date("March 26, 2022 011:15:00"),
    id: 6,
    priorityId: 1,
    location: "Room 1",
  },
  {
    title: "Study BU121",
    startDate: new Date("March 26, 2022 11:45:00"),
    endDate: new Date("March 26, 2022 013:05:00"),
    id: 7,
    priorityId: 2,
    location: "Room 3",
  },
  {
    title: "Work on CP363",
    startDate: new Date("March 26, 2022 10:00:00"),
    endDate: new Date("March 26, 2022 011:30:00"),
    id: 12,
    priorityId: 2,
    location: "Room 2",
  },
];