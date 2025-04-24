import {
  Button,
  DatePicker,
  Divider,
  Form,
  FormInstance,
  Input,
  Space,
  Typography,
} from "antd";

const { TextArea } = Input;

const { Title } = Typography;
interface PersonalDetailsProps {
  form: FormInstance;
  academics: any;
  handleStepSubmit: (values: any) => void;
  prev: any;
}

const Academic: React.FC<PersonalDetailsProps> = ({
  form,
  academics,
  handleStepSubmit,
  prev,
}) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={academics}
        onFinish={handleStepSubmit}
      >
        <Title level={4}>Education</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="institution"
            label="Institution"
            rules={[
              { required: true, message: "Please enter institution name" },
            ]}
          >
            <Input placeholder="University/College name" />
          </Form.Item>

          <Form.Item
            name="degree"
            label="Degree"
            rules={[{ required: true, message: "Please enter degree" }]}
          >
            <Input placeholder="Bachelor's, Master's, etc." />
          </Form.Item>
        </div>

        <Form.Item
          name="fieldOfStudy"
          label="Field of Study"
          rules={[{ required: true, message: "Please enter field of study" }]}
        >
          <Input placeholder="Computer Science, Business, etc." />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="startYear"
            label="Start Year"
            rules={[{ required: true, message: "Please select start year" }]}
          >
            <DatePicker picker="year" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="endYear"
            label="End Year (or Expected)"
            rules={[{ required: true, message: "Please select end year" }]}
          >
            <DatePicker picker="year" style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Form.Item name="gpa" label="GPA (optional)">
          <Input placeholder="e.g., 3.8/4.0" />
        </Form.Item>

        <Divider />

        <Title level={4}>Extracurricular Activities</Title>
        <Form.Item
          name="extracurricular"
          label="Extracurricular Activities and Achievements"
          rules={[
            {
              required: true,
              message: "Please enter your extracurricular activities",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="List your extracurricular activities, volunteer work, certifications, awards, etc."
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={prev}>Previous</Button>
            <Button type="primary" htmlType="submit">
              Preview CV
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Academic;
