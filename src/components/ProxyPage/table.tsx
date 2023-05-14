import { Table, Tag } from "antd";
import React from "react";
interface IResourceTable {
  data: any;
}
const ProxyTable = (props: IResourceTable) => {
  const { data } = props;

  const columns = [
    {
      title: "Proxy",
      dataIndex: "proxy",
      key: "proxy",
    },
    {
      title: "IP6",
      dataIndex: "ip6",
      key: "ip6",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Used",
      dataIndex: "used",
      key: "used",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, row: any) => {
        if (status) {
          return <Tag color="green">Live</Tag>;
        }
        return <Tag color="red">Die</Tag>;
      },
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default ProxyTable;
