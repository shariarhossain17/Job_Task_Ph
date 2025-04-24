import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Pagination,
  Select,
  Table,
  Typography,
} from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";
import { columns, generateDummyData } from "../utitliities/Data";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [propertySearch, setPropertySearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [dateType, setDateType] = useState("today");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | []>(
    []
  );
  const [predefinedRange, setPredefinedRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { RangePicker } = DatePicker;
  const { Title } = Typography;
  const { Option } = Select;
  useEffect(() => {
    const dummyData: any = generateDummyData();
    setData(dummyData);
    setFilteredData(dummyData);
  }, []);

  useEffect(() => {
    let result = [...data];

    if (propertySearch) {
      result = result.filter((item: string) =>
        item.propertyName.toLowerCase().includes(propertySearch.toLowerCase())
      );
    }

    if (employeeSearch) {
      result = result.filter((item) =>
        item.employeeName.toLowerCase().includes(employeeSearch.toLowerCase())
      );
    }

    if (dateType === "today") {
      const today = dayjs().format("YYYY-MM-DD");
      result = result.filter((item) => item.date === today);
    } else if (dateType === "range" && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      result = result.filter((item) => {
        const itemDate = dayjs(item.date);
        return (
          itemDate.isSameOrAfter(startDate, "day") &&
          itemDate.isSameOrBefore(endDate, "day")
        );
      });
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [data, propertySearch, employeeSearch, dateType, dateRange]);

  const handleSelectRange = (value: string) => {
    setPredefinedRange(value);
    const today = dayjs();
    let start, end;

    switch (value) {
      case "current_week":
        start = today.startOf("week");
        end = today.endOf("week");
        break;
      case "last_week":
        start = today.subtract(1, "week").startOf("week");
        end = today.subtract(1, "week").endOf("week");
        break;
      case "current_month":
        start = today.startOf("month");
        end = today.endOf("month");
        break;
      case "last_month":
        start = today.subtract(1, "month").startOf("month");
        end = today.subtract(1, "month").endOf("month");
        break;
      default:
        start = null;
        end = null;
    }

    if (start && end) {
      setDateRange([start, end]);
      setDateType("range");
    }
  };

  const clearFilters = () => {
    setPropertySearch("");
    setEmployeeSearch("");
    setDateType("today");
    setDateRange([]);
    setPredefinedRange("");
    setFilteredData(data);
  };

  const totalTimeWorked = filteredData.reduce(
    (sum, item) => sum + item.timeWorked,
    0
  );
  const totalAmount = filteredData.reduce((sum, item) => sum + item.total, 0);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Title level={2}>Employee Work Tracker</Title>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Property Name</label>
            <Input
              value={propertySearch}
              onChange={(e) => setPropertySearch(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Employee Name</label>
            <Input
              value={employeeSearch}
              onChange={(e) => setEmployeeSearch(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Date Filter Type
            </label>
            <Select
              value={dateType}
              onChange={setDateType}
              style={{ width: "100%" }}
            >
              <Option value="today">Today</Option>
              <Option value="range">Date Range</Option>
            </Select>
          </div>
          {dateType === "range" && (
            <div>
              <label className="block text-sm font-medium">
                Predefined Range
              </label>
              <Select
                value={predefinedRange}
                onChange={handleSelectRange}
                style={{ width: "100%" }}
              >
                <Option value="">Custom Range</Option>
                <Option value="current_week">Current Week</Option>
                <Option value="last_week">Last Week</Option>
                <Option value="current_month">Current Month</Option>
                <Option value="last_month">Last Month</Option>
              </Select>
            </div>
          )}
          {dateType === "range" && predefinedRange === "" && (
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium">
                Custom Date Range
              </label>
              <RangePicker
                value={
                  dateRange.length
                    ? [dayjs(dateRange[0]), dayjs(dateRange[1])]
                    : null
                }
                onChange={(dates) => setDateRange(dates || [])}
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-gray-700 font-medium">Total Time Worked:</span>
          <span className="ml-2 text-lg font-bold">
            {totalTimeWorked} hours
          </span>
        </div>
        <div>
          <span className="text-gray-700 font-medium">Total Amount:</span>
          <span className="ml-2 text-lg font-bold">${totalAmount}</span>
        </div>
      </div>

      {/* Table + Pagination */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          scroll={{ x: 1000 }}
          sticky={{ offsetHeader: 0 }}
        />
        <div className="p-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredData.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger
            onShowSizeChange={(current, size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
