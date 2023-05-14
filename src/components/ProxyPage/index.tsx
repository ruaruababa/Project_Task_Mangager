import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Modal,
  notification,
  Tag,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProxies, importProxies } from "../../services/proxy.service";
import ProxyTable from "./table";
import Analytics from "./analytics";
import { UploadOutlined } from "@ant-design/icons";

const ProxyPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const queryClient = useQueryClient();
  const { data: proxyResponse } = useQuery({
    queryFn: getProxies,
    queryKey: ["proxies"],
  });

  const { mutate: importProxyMutate, isLoading } = useMutation({
    mutationFn: importProxies,
    mutationKey: ["importProxies"],
    onSuccess: () => {
      notification.success({
        message: "Success ",
        description: "Imported",
      });
      queryClient.refetchQueries(["proxies"]);
      queryClient.refetchQueries(["proxyAnalytisc"]);
      setIsShowModal(false);
    },
    onError: (error: any) => {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message || "Unknown",
      });
    },
  });

  const toggleModal = () => {
    setIsShowModal((prev) => !prev);
  };

  const handleImportProxy = (values: any) => {
    console.log(values);
    importProxyMutate({
      file: values?.file?.file || "",
      isClean: values?.isClean,
    });
  };

  return (
    <>
      <Analytics />
      <Divider />
      <div className="flex justify-end">
        <Button type="primary" onClick={toggleModal}>
          Import Proxy
        </Button>
      </div>
      <Card title="Proxy" className="mt-4">
        <ProxyTable data={proxyResponse?.data || []} />
      </Card>

      <Modal
        open={isShowModal}
        title="Import proxy"
        onCancel={toggleModal}
        footer={[]}
      >
        <Form onFinish={handleImportProxy}>
          <p className="mt-4 mb-2 ">Proxy List</p>

          <Form.Item name="file" rules={[{ required: true }]}>
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="isClean" valuePropName="checked">
            <Checkbox>Delete all proxy before add new</Checkbox>
          </Form.Item>

          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Import
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ProxyPage;
