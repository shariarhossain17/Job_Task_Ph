"use client";

import {
  ClearOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Pagination,
  Select,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { generateDummyData } from "../utitliities/Data";
import { EmployeeRecord } from "../utitliities/interface";

const { Title } = Typography;
const { Option } = Select;

export default function EmployeeTable() {
  const [data, setData] = useState<EmployeeRecord[]>([]);
  const [filteredData, setFilteredData] = useState<EmployeeRecord[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    dayjs("2025-04-23")
  );
  const [dateRange, setDateRange] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const dummyData = generateDummyData();
    setData(dummyData);
    setFilteredData(dummyData);
  }, []);

  console.log(data);

  useEffect(() => {
    let result = [...data];

    if (searchText) {
      result = result.filter(
        (item) =>
          item.propertyName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.employeeName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedDate) {
      const formattedDate = selectedDate.format("MM-DD-YYYY");
      result = result.filter((item) => {
        const itemDate = item.date;
        return itemDate === formattedDate;
      });
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [data, searchText, selectedDate, dateRange]);

  const clearFilters = () => {
    setSearchText("");
    setSelectedDate(dayjs("2025-04-23"));
    setDateRange("");
    setFilteredData(data);
  };

  const downloadCSV = () => {
    const headers = [
      "Employee Name",
      "Date",
      "Property Name",
      "Check In",
      "Check Out",
      "Time Worked",
      "No of Units",
      "Avg. $/Unit",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((item) =>
        [
          item.employeeName,
          item.date,
          item.propertyName,
          item.checkIn,
          item.checkOut,
          item.timeWorked,
          item.units,
          item.avgRate,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "payroll_list.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const groupedData: Record<string, EmployeeRecord[]> = {};
  filteredData.forEach((record) => {
    if (!groupedData[record.employeeName]) {
      groupedData[record.employeeName] = [];
    }
    groupedData[record.employeeName].push(record);
  });

  const getPaginatedData = () => {
    const employeeNames = Object.keys(groupedData);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, employeeNames.length);
    const currentEmployees = employeeNames.slice(startIndex, endIndex);

    const result: (
      | EmployeeRecord
      | {
          key: string;
          isSubtotal: boolean;
          employeeName: string;
          timeWorked: number;
          units: number;
          avgRate: number;
        }
    )[] = [];

    currentEmployees.forEach((employeeName) => {
      const records = groupedData[employeeName];

      result.push(...records);

      const totalTimeWorked = records.reduce(
        (sum, record) => sum + record.timeWorked,
        0
      );
      const totalUnits = records.reduce((sum, record) => sum + record.units, 0);
      const avgRate =
        records.reduce(
          (sum, record) => sum + record.avgRate * record.units,
          0
        ) / totalUnits;

      result.push({
        key: `subtotal-${employeeName}`,
        isSubtotal: true,
        employeeName: "Total Time Worked",
        timeWorked: totalTimeWorked,
        units: totalUnits,
        avgRate: avgRate,
      });
    });

    return result;
  };

  const columns: ColumnsType<any> = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      width: 180,
      render: (text, record) => {
        if (record.isSubtotal) {
          return <strong>{text}</strong>;
        }
        return text;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
      width: 180,
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
      width: 120,
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      width: 120,
      render: (text) => {
        if (text === "Invalid Data") {
          return <span className="text-red-500">{text}</span>;
        }
        return text;
      },
    },
    {
      title: "Time Worked",
      dataIndex: "timeWorked",
      key: "timeWorked",
      width: 120,
      render: (value) => `${value} min`,
    },
    {
      title: "No of Units",
      dataIndex: "units",
      key: "units",
      width: 120,
    },
    {
      title: "Avg. $/Unit",
      dataIndex: "avgRate",
      key: "avgRate",
      width: 120,
      render: (value) => value.toFixed(2),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="m-0">
          Payroll List
        </Title>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={downloadCSV}
        >
          Download CSV
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by Property or Employee"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </div>

          <div>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              format="MM-DD-YYYY"
              allowClear={false}
            />
          </div>

          <div>
            <Select
              placeholder="Select a date range"
              style={{ width: 180 }}
              value={dateRange || undefined}
              onChange={setDateRange}
            >
              <Option value="today">Today</Option>
              <Option value="yesterday">Yesterday</Option>
              <Option value="this_week">This Week</Option>
              <Option value="last_week">Last Week</Option>
              <Option value="this_month">This Month</Option>
              <Option value="last_month">Last Month</Option>
            </Select>
          </div>

          <Button onClick={clearFilters} icon={<ClearOutlined />}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table
          columns={columns}
          dataSource={getPaginatedData()}
          pagination={false}
          rowClassName={(record) => (record.isSubtotal ? "bg-gray-100" : "")}
          scroll={{ x: 1000 }}
          sticky={{ offsetHeader: 0 }}
        />

        <div className="p-4 flex justify-between items-center">
          <div>Total {Object.keys(groupedData).length} employees</div>
          <div className="flex items-center gap-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={Object.keys(groupedData).length}
              onChange={(page) => setCurrentPage(page)}
              size="small"
              simple
            />
            <span>{pageSize} / page</span>
          </div>
        </div>
      </div>
    </div>
  );
}
