import { Button, Form, Input } from "antd";

const { TextArea } = Input;

import { FormInstance } from "antd";

interface PersonalDetailsProps {
  form: FormInstance;
  personalInfo: any;
  handleStepSubmit: (values: any) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  form,
  personalInfo,
  handleStepSubmit,
}) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={personalInfo}
        onFinish={handleStepSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="John" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Doe" />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="john.doe@example.com" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="123456789" />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input placeholder="123 Main St, City, Country" />
        </Form.Item>

        <Form.Item
          name="summary"
          label="Professional Summary"
          rules={[
            {
              required: true,
              message: "Please enter your professional summary",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="A brief summary of your professional background and skills"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalDetails;
