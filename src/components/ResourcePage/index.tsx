import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Modal, Row, Statistic, Tabs} from 'antd';
import ImportForm from './import';
import {useQuery} from '@tanstack/react-query';
import {getResources, getStatistics} from '../../services/resource';
import ResourceTable from './table';
import Chart from '../Chart/PieChart';
import StatusChart from '../Chart/BarChart';
import {BarChartOutlined, PieChartOutlined} from '@ant-design/icons';

const ResourcePage = () => {
    const [isOpenImport, setIsOpenImport] = useState(false);
    const [dataResourse, setDataResourse] = useState([]);
    const [tolTal, setTolTal] = useState(dataResourse?.length);
    const toggleImportModal = () => {
        setIsOpenImport((prev) => !prev);
    };
    const [query, setQuery] = useState({
        limit: 10,
        page: 1,
    });

    const {data: resourceResponse} = useQuery({
        queryKey: ['resources'],
        queryFn: getResources(query),
    });
    useEffect(() => {
        if (resourceResponse?.data?.data) {
            setDataResourse(resourceResponse?.data?.data);
            setTolTal(resourceResponse?.data?.data?.length);
        }
    }, [resourceResponse?.data?.data]);
    const {isLoading, data: statisticResponse} = useQuery({
        queryKey: ['getResourceStatistics'],
        queryFn: getStatistics,
    });

    const statistics = statisticResponse?.data;
    const result: any = Object.values(
        dataResourse?.reduce((r: any, e: any) => {
            let k = `${e.clientId}|${e.status}`;
            if (!r[k]) r[k] = {...e, count: 1};
            else r[k].count += 1;
            return r;
        }, {}),
    );
    const dataChart: any = [];
    for (let i = 0; i < result.length; i++) {
        for (var j = i + 1; j < result.length; j++) {
            if (result[i].clientId === result[j].clientId) {
                dataChart.push({
                    ...result[i],
                    clientId: `${result[i].clientId} : ${
                        result[i].count + result[j].count
                    } account`,
                    unknown: result[i].status,
                    count: result[i].count + result[j].count,
                    live: result[i].status === true ? result[i].count : 0,
                    die: result[j].status === false ? result[j].count : 0,
                });
            }
        }
        if (i === result.length - 1 && j === result.length) {
            dataChart.push({
                ...result[i],
                clientId: `${result[i].clientId} : ${result[i].count} account`,
                count: result[i].count,
                live: result[i].status === true ? result[i].count : 0,
                die: result[i].status === false ? result[i].count : 0,
            });
        }
    }
    const tabs = [
        {
            id: 1,
            tabTitle: 'Quantity Chart',
            title: 'Quantity Chart',
            content: <Chart dataChart={dataChart} />,
            icon: <PieChartOutlined />,
        },
        {
            id: 2,
            tabTitle: 'Status Chart',
            title: 'Status Chart',
            content: <StatusChart dataChart={dataChart} />,
            icon: <BarChartOutlined />,
        },
    ];

    return (
        <div>

            <Row gutter={16}>


                <Col span={8}>
                    <Card
                        title="Statistic"
                        bordered={false}
                        loading={isLoading}
                    >
                        <Statistic
                            title="Total"
                            value={statistics?.totalCount}
                            valueStyle={{color: '#000000'}}
                        />
                        <br />
                        <Statistic
                            title="Processing..."
                            value={statistics?.processingCount}
                            valueStyle={{color: '#c5c000'}}
                        />
                        <br />
                        <Statistic
                            title="Complete"
                            value={statistics?.completedCount}
                            valueStyle={{color: '#00c728'}}
                        />
                    </Card>
                </Col>

                <Col span={16}>
                    <Card title="Analytics">
                        <Tabs
                            defaultActiveKey="0"
                            type="card"
                            size={'large'}
                            className="custom-tabs"
                            items={tabs.map((_, i) => {
                                const id = String(i);
                                return {
                                    label: (
                                        <span>
                                            {_.icon}
                                            {_.tabTitle}
                                        </span>
                                    ),
                                    key: id,
                                    children: _.content,
                                };
                            })}
                        />
                    </Card>
                </Col>
            </Row>

            <Card
                title="List resources"
                extra={<Button type="primary" size="small" onClick={toggleImportModal}>
                    Import
                </Button>}
                style={{
                    marginTop: 25,
                }}
            >
                <ResourceTable data={dataResourse || []}/>
            </Card>

            <Modal
                visible={isOpenImport}
                onCancel={toggleImportModal}
                title="Import excel"
                footer={[]}
            >
                <ImportForm onFinish={toggleImportModal} />
            </Modal>
        </div>
    );
};

export default ResourcePage;
