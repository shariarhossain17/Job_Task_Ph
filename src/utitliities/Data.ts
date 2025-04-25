import dayjs from "dayjs";
import { EmployeeRecord } from "./interface";

export const generateDummyData = (count = 100000): EmployeeRecord[] => {
  const employees = [
    "Abu Sufian",
    "Azizul islam milton",
    "Shahriar Hossain",
    "Abdur Rakib",
    "Jhnakar Mahabub",
    "Sakib Ahmed",
    "Rasel Ahmed",
    "Shabaj khan Toky",
    "Amar Ex",
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
