import {
  BookOutlined,
  //   BriefcaseOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Steps, Typography } from "antd";
import { useState } from "react";
const { Title } = Typography;
const { Step } = Steps;
const CvMaker = () => {
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: "Personal Details",
      icon: <UserOutlined />,
    },
    {
      title: "Experience",
      icon: <UserOutlined></UserOutlined>,
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
  return (
    <div>
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
            {/* {renderStepContent()} */}
          </div>
        </Card>

        {/* {renderCVPreview()} */}
      </div>
    </div>
  );
};

export default CvMaker;
