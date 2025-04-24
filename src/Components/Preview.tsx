import { FilePdfOutlined, FileWordOutlined } from "@ant-design/icons";
import { Button, Divider, message, Modal, Typography } from "antd";
import { Document, HeadingLevel, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { PreviewProps } from "../utitliities/interface";
const { Title, Text } = Typography;
const Preview: React.FC<PreviewProps> = ({
  personalInfo,
  experiences,
  projects,
  academics,
  previewVisible,
  setPreviewVisible,
}) => {
  const generatePDF = () => {
    const element = document.getElementById("cv-preview");

    if (!element) {
      message.error("CV preview not found");
      return;
    }

    message.loading("Generating PDF...");

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${personalInfo.firstName}.pdf`);

      message.success("PDF generated successfully");
    });
  };

  const generateDOCX = () => {
    message.loading("Generating DOCX...");

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: `${personalInfo.firstName || ""} ${
                personalInfo.lastName || ""
              }`,
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: personalInfo.email || "",
            }),
            new Paragraph({
              text: personalInfo.phone || "",
            }),
            new Paragraph({
              text: personalInfo.address || "",
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              text: "Professional Summary",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: personalInfo.summary || "",
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              text: "Work Experience",
              heading: HeadingLevel.HEADING_2,
            }),
            ...experiences
              .filter((exp) => exp.company)
              .flatMap((exp) => [
                new Paragraph({
                  text: `${exp.position || ""} at ${exp.company || ""}`,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  text: `${exp.startDate || ""} - ${exp.endDate || "Present"}`,
                }),
                new Paragraph({
                  text: exp.description || "",
                }),
                new Paragraph({
                  text: "",
                }),
              ]),
            new Paragraph({
              text: "Projects",
              heading: HeadingLevel.HEADING_2,
            }),
            ...projects
              .filter((proj) => proj.title)
              .flatMap((proj) => [
                new Paragraph({
                  text: proj.title || "",
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  text: proj.description || "",
                }),
                new Paragraph({
                  text: "",
                }),
              ]),
            new Paragraph({
              text: "Education",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: `${academics.degree || ""} in ${
                academics.fieldOfStudy || ""
              }`,
              heading: HeadingLevel.HEADING_3,
            }),
            new Paragraph({
              text: academics.institution || "",
            }),
            new Paragraph({
              text: `${academics.startYear || ""} - ${academics.endYear || ""}`,
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              text: "Extracurricular Activities",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: academics.extracurricular || "",
            }),
          ],
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${personalInfo.firstName}.docx`);
      message.success("DOCX generated successfully");
    });
  };

  return (
    <Modal
      title="CV Preview"
      open={previewVisible}
      onCancel={() => setPreviewVisible(false)}
      width={800}
      footer={[
        <Button key="back" onClick={() => setPreviewVisible(false)}>
          Edit
        </Button>,
        <Button
          key="pdf"
          className="bg-blue-700"
          danger
          icon={<FilePdfOutlined />}
          onClick={generatePDF}
        >
          Download PDF
        </Button>,
        <Button
          key="docx"
          type="primary"
          icon={<FileWordOutlined />}
          onClick={generateDOCX}
        >
          Download DOCX
        </Button>,
      ]}
    >
      <div id="cv-preview" className="p-6 bg-white text-left space-y-6">
        <div className="text-center mb-6">
          <Title level={2}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Title>
          <div className="flex justify-center gap-4 flex-wrap">
            <Text>{personalInfo.email}</Text>
            <Text>{personalInfo.phone}</Text>
            <Text>{personalInfo.address}</Text>
          </div>
        </div>

        <Divider />

        <div className="mb-6">
          <Title level={4}>Professional Summary</Title>
          <Text>{personalInfo.summary}</Text>
        </div>

        <div className="mb-6">
          <Title level={4}>Work Experience</Title>
          {experiences
            .filter((exp) => exp.company)
            .map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <Text strong>
                    {exp.position} at {exp.company}
                  </Text>
                  <Text>
                    {exp.startDate && exp.startDate.format("MMM YYYY")} -{" "}
                    {exp.endDate ? exp.endDate.format("MMM YYYY") : "Present"}
                  </Text>
                </div>
                <Text>{exp.description}</Text>
              </div>
            ))}
        </div>

        <div className="mb-6">
          <Title level={4}>Projects</Title>
          {projects
            .filter((proj) => proj.title)
            .map((proj, index) => (
              <div key={index} className="mb-4">
                <Text strong>{proj.title}</Text>
                {proj.link && (
                  <div>
                    <Text type="secondary">Link: {proj.link}</Text>
                  </div>
                )}
                <div>
                  <Text>{proj.description}</Text>
                </div>
              </div>
            ))}
        </div>

        <div className="mb-6">
          <Title level={4}>Education</Title>
          <div>
            <Text strong>
              {academics.degree} in {academics.fieldOfStudy}
            </Text>
            <div>
              <Text>{academics.institution}</Text>
            </div>
            <div>
              <Text>
                {academics.startYear && academics.startYear.format("YYYY")} -{" "}
                {academics.endYear && academics.endYear.format("YYYY")}
              </Text>
            </div>
            {academics.gpa && (
              <div>
                <Text>GPA: {academics.gpa}</Text>
              </div>
            )}
          </div>
        </div>

        <div>
          <Title level={4}>Extracurricular Activities</Title>
          <Text>{academics.extracurricular}</Text>
        </div>
      </div>
    </Modal>
  );
};

export default Preview;
