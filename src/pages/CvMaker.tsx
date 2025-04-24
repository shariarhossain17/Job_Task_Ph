import {
  BookOutlined,
  ExportOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Form, Input, Steps, Typography } from "antd";
import { useState } from "react";
import Experience from "../Components/Experience";
import Navbar from "../Components/Navbar";
import PersonalDetails from "../Components/PersonalDetails";
import Projects from "../Components/Projects";
const { Title } = Typography;
const { Step } = Steps;
const { TextArea } = Input;
const CvMaker = () => {
  const [current, setCurrent] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({});
  const [experiences, setExperiences] = useState([{}]);
  const [projects, setProjects] = useState([{}]);
  const [academics, setAcademics] = useState({});
  const [previewVisible, setPreviewVisible] = useState(false);
  const [form] = Form.useForm();

  const steps = [
    {
      title: "Personal Details",
      icon: <UserOutlined />,
    },
    {
      title: "Experience",
      icon: <ExportOutlined />,
    },
    {
      title: "Projects",
      icon: <ProjectOutlined />,
    },
    {
      title: "Academics",
      icon: <BookOutlined />,
    },
  ];

  const goToStep = (step) => {
    setCurrent(step);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleStepSubmit = (values) => {
    switch (current) {
      case 0:
        setPersonalInfo(values);
        break;
      case 1:
        setExperiences(values.experiences || [{}]);
        break;
      case 2:
        setProjects(values.projects || [{}]);
        break;
      case 3:
        setAcademics(values);
        break;
      default:
        break;
    }

    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      setPreviewVisible(true);
    }
  };

  const renderStepContent = () => {
    switch (current) {
      case 0:
        return (
          <PersonalDetails
            form={form}
            personalInfo={personalInfo}
            handleStepSubmit={handleStepSubmit}
          />
        );
      case 1:
        return (
          <Experience
            form={form}
            experiences={experiences}
            handleStepSubmit={handleStepSubmit}
            prev={prev}
          />
        );
      case 2:
        return (
          <Projects
            form={form}
            projects={projects}
            handleStepSubmit={handleStepSubmit}
            prev={prev}
          />
        );
      case 3:
        return (
          <PersonalDetails
            form={form}
            personalInfo={personalInfo}
            handleStepSubmit={handleStepSubmit}
          />
        );
      default:
        return null;
    }
  };

  console.log(personalInfo);

  return (
    <div>
      <Navbar></Navbar>
      <div className="p-6 max-w-4xl mx-auto">
        <Title level={2} className="mb-6 text-center">
          CV Maker
        </Title>

        <Card className="mb-6">
          <Steps current={current} onChange={goToStep}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} icon={item.icon} />
            ))}
          </Steps>
        </Card>

        <Card>
          <div className="p-4">
            <Title level={3} className="mb-4">
              {steps[current].title}
            </Title>
            {renderStepContent()}
          </div>
        </Card>

        {/* {renderCVPreview()} */}
      </div>
    </div>
  );
};

export default CvMaker;
