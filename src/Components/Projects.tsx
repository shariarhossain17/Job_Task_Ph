import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";

const { TextArea } = Input;
interface PersonalDetailsProps {
  form: FormInstance;
  projects: any;
  handleStepSubmit: (values: any) => void;
  prev: any;
}
const Projects: React.FC<PersonalDetailsProps> = ({
  form,
  projects,
  handleStepSubmit,
  prev,
}) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ projects }}
        onFinish={handleStepSubmit}
      >
        <Form.List name="projects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  className="mb-4"
                  extra={
                    fields.length > 1 ? (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    ) : null
                  }
                >
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    label="Project Title"
                    rules={[
                      { required: true, message: "Please enter project title" },
                    ]}
                  >
                    <Input placeholder="Project title" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter project description",
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Describe the project, your role, and technologies used"
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "link"]}
                    label="Project Link (optional)"
                  >
                    <Input placeholder="https://example.com/project" />
                  </Form.Item>
                </Card>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Project
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Space>
            <Button onClick={prev}>Previous</Button>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Projects;
