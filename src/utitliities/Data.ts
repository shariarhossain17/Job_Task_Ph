import dayjs from "dayjs";
import { EmployeeRecord } from "./interface";

export const generateDummyData = (count = 1000): EmployeeRecord[] => {
  const employees = [
    "Abu Sufian",
    "Azizul islam milton",
    "Shahriar Hossain",
    "Abdur Rakib",
    "Jhnakar Mahabub",
    "Sakib Ahmed",
    "Super Admin",
    "Tester Amy",
    "Test Swankie Pethick",
  ];

  const properties = [
    "Programming hero",
    "Amazon",
    "Google",
    "Meta",
    "Tesla",
    "Zazzle-zizzleburg",
    "zzzz-999-kkk-harly",
    "ZZ-1",
    "ZZ-4",
  ];

  const tasks = [
    "Hr",
    "Manager",
    "Swe",
    "Web developer",
    "QA",
    "Cyber security expert",
  ];

  const data: EmployeeRecord[] = [];

  const originalRecords = [
    {
      key: "1",
      employeeName: "Super Admin",
      date: "04-23-2025",
      propertyName: "Zazzle-zizzleburg",
      checkIn: "1:29 AM",
      checkOut: "1:31 AM",
      timeWorked: 2,
      units: 10,
      avgRate: 13.69,
      task: "Manager",
    },
    {
      key: "2",
      employeeName: "Super Admin",
      date: "04-23-2025",
      propertyName: "zzzz-999-kkk-harly",
      checkIn: "6:15 AM",
      checkOut: "Invalid Data",
      timeWorked: 0,
      units: 10,
      avgRate: 0.0,
      task: "Hr",
    },
    {
      key: "3",
      employeeName: "Super Admin",
      date: "04-23-2025",
      propertyName: "ZZ-4",
      checkIn: "4:57 PM",
      checkOut: "4:59 PM",
      timeWorked: 2,
      units: 10,
      avgRate: 10.52,
      task: "Swe",
    },
    {
      key: "4",
      employeeName: "Tester Amy",
      date: "04-23-2025",
      propertyName: "ZZ-1",
      checkIn: "12:46 PM",
      checkOut: "12:48 PM",
      timeWorked: 2,
      units: 10,
      avgRate: 9.67,
      task: "QA",
    },
    {
      key: "5",
      employeeName: "Test Swankie Pethick",
      date: "04-23-2025",
      propertyName: "ZZ-4",
      checkIn: "12:49 PM",
      checkOut: "12:50 PM",
      timeWorked: 1,
      units: 10,
      avgRate: 1.81,
      task: "Web developer",
    },
  ];

  data.push(...originalRecords);

  for (let i = 6; i <= count; i++) {
    const employeeName =
      employees[Math.floor(Math.random() * employees.length)];
    const propertyName =
      properties[Math.floor(Math.random() * properties.length)];
    const task = tasks[Math.floor(Math.random() * tasks.length)];

    const date = dayjs()
      .subtract(Math.floor(Math.random() * 60), "day")
      .format("MM-DD-YYYY");

    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const checkInTime = dayjs().hour(hour).minute(minute);
    const checkIn = checkInTime.format("h:mm A");

    const hasInvalidData = Math.random() < 0.05;

    let checkOut, timeWorked;
    if (hasInvalidData) {
      checkOut = "Invalid Data";
      timeWorked = 0;
    } else {
      const durationMinutes = Math.floor(Math.random() * 480) + 1;
      const checkOutTime = checkInTime.add(durationMinutes, "minute");
      checkOut = checkOutTime.format("h:mm A");
      timeWorked = durationMinutes;
    }

    const units = 10;

    const avgRate = hasInvalidData
      ? 0.0
      : Number.parseFloat((Math.random() * 20).toFixed(2));

    data.push({
      key: i.toString(),
      employeeName,
      date,
      propertyName,
      checkIn,
      checkOut,
      timeWorked,
      units,
      avgRate,
      task,
    });
  }

  console.timeEnd("Data Generation");
  return data;
};
