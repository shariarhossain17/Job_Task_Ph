import { Dayjs } from "dayjs";

interface Experience {
  company?: string;
  role?: string;
  position?: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
  description?: string;
}

interface Project {
  title?: string;
  description?: string;
  link?: string;
}

interface Academic {
  degree?: string;
  fieldOfStudy?: string;
  institution?: string;
  startYear?: Dayjs;
  endYear?: Dayjs;
  gpa?: string;
  extracurricular?: string;
}

interface PersonalInfo {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  summary?: string;
}
export interface Item {
  propertyName: string;
}
export interface EmployeeName {
  employeeName: string;
}
export interface IDate {
  date: string;
}
export interface PreviewProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  academics: Academic;
  previewVisible: boolean;
  setPreviewVisible: (visible: boolean) => void;
}
