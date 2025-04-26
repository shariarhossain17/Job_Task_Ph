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
  Spin,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { generateDummyData } from "../utitliities/Data";
import type { EmployeeRecord, Row } from "../utitliities/interface";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { Title, Text } = Typography;
const { Option } = Select;

export default function EmployeeTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<EmployeeRecord[]>([]);
  const [filteredData, setFilteredData] = useState<EmployeeRecord[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [dateRange, setDateRange] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [groupedData, setGroupedData] = useState<{
    [key: string]: EmployeeRecord[];
  }>({});

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const dummyData = generateDummyData(1000);
      setData(dummyData);
      setFilteredData(dummyData);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    setLoading(true);

    const timeoutId = setTimeout(() => {
      let result = [...data];

      if (searchText) {
        result = result.filter(
          (item) =>
            item.propertyName
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item.employeeName.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      if (selectedDate && !dateRange) {
        const formattedDate = selectedDate.format("MM-DD-YYYY");
        result = result.filter((item) => item.date === formattedDate);
      }

      if (dateRange) {
        const today = dayjs().startOf("day");
        let startDate: dayjs.Dayjs;
        let endDate: dayjs.Dayjs;

        switch (dateRange) {
          case "today":
            result = result.filter(
              (item) => item.date === today.format("MM-DD-YYYY")
            );
            break;

          case "yesterday":
            const yesterday = today.subtract(1, "day");
            result = result.filter(
              (item) => item.date === yesterday.format("MM-DD-YYYY")
            );
            break;

          case "this_week":
            startDate = today.startOf("week");
            endDate = today.endOf("week");
            result = result.filter((item) => {
              const itemDate = dayjs(item.date, "MM-DD-YYYY").startOf("day");
              return (
                itemDate.isSameOrAfter(startDate) &&
                itemDate.isSameOrBefore(endDate)
              );
            });
            break;

          case "last_week":
            startDate = today.subtract(1, "week").startOf("week");
            endDate = today.subtract(1, "week").endOf("week");
            result = result.filter((item) => {
              const itemDate = dayjs(item.date, "MM-DD-YYYY").startOf("day");
              return (
                itemDate.isSameOrAfter(startDate) &&
                itemDate.isSameOrBefore(endDate)
              );
            });
            break;

          case "this_month":
            startDate = today.startOf("month");
            endDate = today.endOf("month");
            result = result.filter((item) => {
              const itemDate = dayjs(item.date, "MM-DD-YYYY").startOf("day");
              return (
                itemDate.isSameOrAfter(startDate) &&
                itemDate.isSameOrBefore(endDate)
              );
            });
            break;

          case "last_month":
            startDate = today.subtract(1, "month").startOf("month");
            endDate = today.subtract(1, "month").endOf("month");
            result = result.filter((item) => {
              const itemDate = dayjs(item.date, "MM-DD-YYYY").startOf("day");
              return (
                itemDate.isSameOrAfter(startDate) &&
                itemDate.isSameOrBefore(endDate)
              );
            });
            break;
        }
      }

      setFilteredData(result);
      setCurrentPage(1);

      const grouped: { [key: string]: EmployeeRecord[] } = result.reduce(
        (acc: any, item: EmployeeRecord) => {
          const employeeName = item.employeeName;
          if (!acc[employeeName]) {
            acc[employeeName] = [];
          }
          acc[employeeName].push(item);
          return acc;
        },
        {}
      );
      setGroupedData(grouped);

      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [data, searchText, selectedDate, dateRange]);

  const clearFilters = () => {
    setSearchText("");
    setSelectedDate(dayjs());
    setDateRange("");
    setFilteredData(data);
    setCurrentPage(1);
  };

  const handleDownloadCsv = () => {
    try {
      const csvData = filteredData.map((item) => ({
        "Employee Name": item.employeeName,
        Date: item.date,
        "Property Name": item.propertyName,
        "Check In": item.checkIn,
        "Check Out": item.checkOut,
        "Time Worked (min)": item.timeWorked,
        "No of Units": item.units,
        "Avg. $/Unit": item.avgRate.toFixed(2),
      }));

      let csvContent = "data:text/csv;charset=utf-8,";

      const headers = Object.keys(csvData[0] || {});
      csvContent += headers.join(",") + "\r\n";

      csvData.forEach((row) => {
        const values = headers.map((header) => {
          const value = row[header as keyof Row];

          return typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        });
        csvContent += values.join(",") + "\r\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "employee_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  const getPaginatedData = () => {
    const employeeNames = Object.keys(groupedData);

    const employeesPerPage = 2;

    const startIndex = (currentPage - 1) * employeesPerPage;
    const endIndex = Math.min(
      startIndex + employeesPerPage,
      employeeNames.length
    );
    const currentPageEmployees = employeeNames.slice(startIndex, endIndex);

    const result: any[] = [];

    currentPageEmployees.forEach((employeeName) => {
      const records = groupedData[employeeName];
      result.push(...records);

      const totalTimeWorked = records.reduce(
        (sum, record) => sum + record.timeWorked,
        0
      );

      const totalUnits = records.reduce((sum, record) => sum + record.units, 0);
      const totalValue = records.reduce(
        (sum, record) => sum + record.avgRate * record.units,
        0
      );
      const avgRate = totalUnits > 0 ? totalValue / totalUnits : 0;

      result.push({
        key: `subtotal-${employeeName}`,
        isSubtotal: true,
        employeeName: "",
        date: "",
        propertyName: "Total Time Worked",
        checkIn: "",
        checkOut: "",
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
      render: (text, record, index) => {
        if (record.isSubtotal) {
          return { children: "", props: { rowSpan: 0 } };
        }

        const currentData = getPaginatedData();
        const previousRecord = currentData[index - 1];

        if (
          previousRecord &&
          previousRecord.employeeName === record.employeeName
        ) {
          return { children: null, props: { rowSpan: 0 } };
        }

        const employeeRows = currentData.filter(
          (item) =>
            item.employeeName === record.employeeName && !item.isSubtotal
        ).length;

        return {
          children: text,
          props: { rowSpan: employeeRows },
        };
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (record.isSubtotal ? "" : text),
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
      render: (text, record) => {
        if (record.isSubtotal) {
          return {
            children: <strong style={{ whiteSpace: "nowrap" }}>{text}</strong>,
            props: { colSpan: 4, align: "center" },
          };
        }
        return { children: text, props: {} };
      },
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (_, record) => {
        if (record.isSubtotal) {
          return { children: null, props: { colSpan: 0 } }; // Hide cell
        }
        return { children: record.checkIn, props: {} };
      },
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (_, record) => {
        if (record.isSubtotal) {
          return { children: null, props: { colSpan: 0 } }; // Hide cell
        }
        return { children: record.checkOut, props: {} };
      },
    },
    {
      title: "Time Worked",
      dataIndex: "timeWorked",
      key: "timeWorked",
      align: "center",
      render: (value, record) =>
        record.isSubtotal ? <strong>{value} min</strong> : `${value} min`,
    },
    {
      title: "No of Units",
      dataIndex: "units",
      key: "units",
      align: "center",
      render: (value, record) =>
        record.isSubtotal ? <strong>{value}</strong> : value,
    },
    {
      title: "Avg. $/Unit",
      dataIndex: "avgRate",
      key: "avgRate",
      align: "center",
      render: (value, record) =>
        record.isSubtotal ? (
          <strong>{value.toFixed(2)}</strong>
        ) : (
          value.toFixed(2)
        ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2} className="m-0">
              Payroll List
            </Title>
            <Text type="secondary">
              Showing data from {filteredData.length} records
            </Text>
          </div>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownloadCsv}
          >
            Download CSV
          </Button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Input
              placeholder="Search by Property or Employee"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
              style={{ width: "300px", height: "40px" }}
            />

            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              format="MM-DD-YYYY"
              allowClear
              style={{ width: "150px", height: "40px" }}
            />

            <Select
              placeholder="Select a date range"
              value={dateRange || undefined}
              onChange={setDateRange}
              style={{ width: "180px", height: "40px" }}
            >
              <Option value="today">Today</Option>
              <Option value="yesterday">Yesterday</Option>
              <Option value="this_week">This Week</Option>
              <Option value="last_week">Last Week</Option>
              <Option value="this_month">This Month</Option>
              <Option value="last_month">Last Month</Option>
            </Select>

            <Button
              icon={<ClearOutlined />}
              onClick={clearFilters}
              style={{ height: "40px" }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <Spin spinning={loading} tip="Loading data...">
          <Table
            columns={columns}
            dataSource={getPaginatedData()}
            pagination={false}
            scroll={{ x: 1000, y: 350 }}
            className="custom-table"
          />
          <div className="p-4 flex justify-between items-center">
            <div>Total {filteredData.length} records</div>
            <div className="flex items-center">
              <div>Total {Object.keys(groupedData).length} employees</div>
              <Pagination
                current={currentPage}
                pageSize={2}
                total={Object.keys(groupedData).length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                itemRender={(page, type, originalElement) => {
                  if (type === "page") {
                    return <Button size="small">{page}</Button>;
                  }
                  return originalElement;
                }}
              />
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
}
