import dayjs from "dayjs";

export const generateDummyData = (count = 100) => {
  const properties = [
    "Skyline Apartments",
    "Riverside Condos",
    "Mountain View Estate",
    "Sunset Heights",
    "Ocean Breeze Complex",
  ];

  const employees = [
    "Abu Sufian",
    "Azizul islam milton",
    "Shahriar Hossain",
    "Abdur Rakib",
    "Jhnakar Mahabub",
    "Sakib Ahmed",
  ];
  const tasks = [
    "Maintenance",
    "Cleaning",
    "Inspection",
    "Repair",
    "Installation",
    "Renovation",
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
