import dayjs from "dayjs";
import { EmployeeData } from "./dataType";

export const generateDummyData = (count = 100000) => {
  const properties = ["Programming hero", "Amazon", "Google", "Meta", "tesla"];

  const employees = [
    "Abu Sufian",
    "Azizul islam milton",
    "Shahriar Hossain",
    "Abdur Rakib",
    "Jhnakar Mahabub",
    "Sakib Ahmed",
  ];
  const tasks = [
    "Hr",
    "Manager",
    "Swe",
    "web developer",
    "saq",
    "cyber security expert",
  ];

  return Array.from({ length: count }, (_, i) => {
    const date = dayjs().subtract(Math.floor(Math.random() * 60), "day");
    const hoursWorked = Math.floor(Math.random() * 8) + 1;

    return {
      key: i.toString(),
      propertyName: properties[Math.floor(Math.random() * properties.length)],
      employeeName: employees[Math.floor(Math.random() * employees.length)],
      date: date.format("YYYY-MM-DD"),
      task: tasks[Math.floor(Math.random() * tasks.length)],
      timeWorked: hoursWorked,
      total: hoursWorked * 15,
    };
  });
};

export const columns = [
  {
    title: "Employee Name",
    dataIndex: "employeeName",
    key: "employeeName",
    sorter: (a: EmployeeData, b: EmployeeData) =>
      a.employeeName.localeCompare(b.employeeName),
  },

  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a: EmployeeData, b: EmployeeData) =>
      dayjs(a.date).unix() - dayjs(b.date).unix(),
  },
  {
    title: "Property Name",
    dataIndex: "propertyName",
    key: "propertyName",
    sorter: (a: EmployeeData, b: EmployeeData) =>
      a.propertyName.localeCompare(b.propertyName),
  },

  {
    title: "Task",
    dataIndex: "task",
    key: "task",
  },
  {
    title: "Time Worked (hours)",
    dataIndex: "timeWorked",
    key: "timeWorked",
    sorter: (a: EmployeeData, b: EmployeeData) => a.timeWorked - b.timeWorked,
  },
  {
    title: "Total ($)",
    dataIndex: "total",
    key: "total",
    sorter: (a: EmployeeData, b: EmployeeData) => a.total - b.total,
  },
];
