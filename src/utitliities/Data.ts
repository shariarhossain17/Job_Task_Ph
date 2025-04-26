import dayjs from "dayjs";
import { EmployeeRecord } from "./interface";

export const generateDummyData = (count = 100000): EmployeeRecord[] => {
  console.time("Data Generation");

  const employees = [
    "Abu Sufian",
    "MIlton",
    "Shahriar ",
    "Abdur Rakib",
    "Jhnakar Mahabub",
    "Sakib Ahmed",
    "Rasel Ahmed",
    "Shabaj khan",
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
    const second = Math.floor(Math.random() * 60);
    const checkInTime = dayjs().hour(hour).minute(minute).second(second);

    const hasInvalidData = Math.random() < 0.05;

    let checkOutTime, checkOut, totalSeconds, timeWorked, units, avgRate;
    if (hasInvalidData) {
      checkOut = "Invalid Data";
      totalSeconds = 0;
      timeWorked = 0;
      units = 0;
      avgRate = 0.0;
    } else {
      const durationSeconds = Math.floor(Math.random() * (600 - 60 + 1)) + 60;
      checkOutTime = checkInTime.add(durationSeconds, "second");

      totalSeconds = durationSeconds;
      timeWorked = Math.round(totalSeconds / 60);
      units = timeWorked * 5;
      avgRate = units > 0 ? Number((totalSeconds / units).toFixed(2)) : 0.0;

      checkOut = checkOutTime.format("h:mm A");
    }

    const checkIn = checkInTime.format("h:mm A");

    data.push({
      key: i.toString(),
      employeeName,
      date,
      propertyName,
      checkIn,
      checkOut,
      totalSeconds,
      timeWorked,
      units,
      avgRate,
      task,
    });
  }

  console.timeEnd("Data Generation");
  return data;
};
