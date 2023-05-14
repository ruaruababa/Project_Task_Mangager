import { Button, Form, Input, Modal, notification, Select } from "antd";
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../services/tasks";

const { Option } = Select;

interface Props {
  visible: boolean;
  onCancel: () => void;
  initalValues?: any;
}

const CreateTaskModal = (props: Props) => {
  const { visible, onCancel, initalValues } = props;
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (initalValues) {
      form.setFieldsValue(initalValues);
    }
  }, [initalValues]);

  const { mutate: createTaskMutate, isLoading } = useMutation({
    mutationFn: createTask,
    mutationKey: ["createTask"],
    onSuccess: () => {
      onCancel();
      notification.success({
        message: "Success ",
        description: "Create successfully",
      });
      form.resetFields();
      queryClient.refetchQueries(["getTasks"]);
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Create failed",
      });
    },
  });

  const handleFinish = (values: any) => {
    if (initalValues) {
      return;
    }
    createTaskMutate(values);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Create new task"
      footer={[]}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="videoUrl"
          label="Video URL"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter video URL" />
        </Form.Item>

        <Form.Item
          name="keywords"
          label="Keywords"
          rules={[{ required: true }]}
        >
          <Select
            mode="tags"
            placeholder="Enter keywords"
            style={{ width: "100%" }}
          ></Select>
        </Form.Item>

        <Form.Item
          name="numberOfViews"
          label="Number of Views"
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="Enter number of views" />
        </Form.Item>

        <Form.Item
          name="targetViewer"
          label="Target viewers"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select target views">
            <Option value="child">Child</Option>
            <Option value="tech">Tech</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            disabled={isLoading}
            htmlType="submit"
            block
            type="primary"
            className="!text-center !block"
            size="large"
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
