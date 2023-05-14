import {Table, Tag} from 'antd';
import React, {useState} from 'react';
import {MobileOutlined, WindowsOutlined} from '@ant-design/icons';
interface IResourceTable {
    data: any;
}
const ResourceTable = (props: IResourceTable) => {
    const {data} = props;

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Recovery Email',
            dataIndex: 'recoveryEmail',
            key: 'recoveryEmail',
        },
        {
            title: 'Profile',
            dataIndex: 'profileId',
            key: 'profileId',
        },
        {
            title: 'Device Type',
            dataIndex: 'deviceType',
            key: 'deviceType',
            render: (deviceType: string) => {
                if (deviceType === 'desktop') {
                    return <WindowsOutlined />;
                }
                return <MobileOutlined />;
            },
        },
        {
            title: 'ClientID',
            dataIndex: 'clientId',
            key: 'clientId',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: boolean, row: any) => {
                if (row.processStatus !== 'completed') {
                    return null;
                }

                if (status) {
                    return <Tag color="green">Work</Tag>;
                }
                return <Tag color="red">Die</Tag>;
            },
        },
        {
            title: 'Process',
            dataIndex: 'processStatus',
            key: 'processStatus',
            render: (processStatus: string) => {
                if (processStatus === 'waiting') {
                    return <Tag color="yellow">Wait</Tag>;
                }
                if (processStatus === 'processing') {
                    return <Tag color="cyan">Processing</Tag>;
                }
                return <Tag color="green">Done</Tag>;
            },
        },
    ];

    return <Table columns={columns} dataSource={data}/>;
};

export default ResourceTable;
