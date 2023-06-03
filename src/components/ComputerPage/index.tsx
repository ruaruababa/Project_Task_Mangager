import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, List, message, Modal, Popconfirm, Progress, Tag} from "antd";
import {DeleteOutlined, InfoCircleOutlined, PlusOutlined, ReloadOutlined} from '@ant-design/icons';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getComputers, removeComputer} from "../../services/computer";
import axios from "axios";
import CreateComputerModal from "./CreateComputerModal";


const ComputerPage = () => {
    const [computers, setComputers] = useState([])
    const [selectedComputer, setSelectedComputer] = useState(undefined)
    const [isShowCreateModal, setIsShowCreateModal] = useState(false)

    const queryClient = useQueryClient()
    const {data: computerResponse} = useQuery({
        queryFn: getComputers,
        queryKey: ['computers']
    });

    const {mutate: removeComputerMutate} = useMutation({
        mutationFn: removeComputer,
        mutationKey: ['removeComputer'],
        onSuccess: () => {
            message.success('Computer removed successfully')
            queryClient.refetchQueries(['computers'])
        },
        onError: (error: any) => {
            message.error(error?.message || '')
        }
    })

    useEffect(() => {
        const computers = computerResponse?.data
        setComputers(computers)
        const refreshHealthStatus = () => {
            const refetchComputers: any = computers?.map(async (computer: any) => {
                const response = await axios.get(computer?.url + '/health-check').then(res => ({
                    ...computer,
                    ...res.data,
                    status: true
                })).catch(err => ({

                        device_id: computer.device_id,
                        status: false
                    }
                ))
                return response
            })
            Promise.all(refetchComputers).then((refetchedComputers: any) => {
                setComputers(refetchedComputers)
            })
        }

        refreshHealthStatus()

        const healthCheckInterval = setInterval(() => {
            refreshHealthStatus()
        }, 3 * 1000)
        return () => {
            clearInterval(healthCheckInterval)
        }
    }, [computerResponse])

    const restart = (url: string) => {
        message.info('Waiting for restart')
        axios.get(url + '/restart').then(res => {
            message.success('Success')
        }).catch((error) => {
            message.error('Can"t restart')
        })
    }

    const remove = (id: string) => {
        removeComputerMutate(id)
    }

    const toggleCreateModal = () => {
        setIsShowCreateModal(prev => !prev)
    }

    return (
        <>

            <div className="flex justify-end">
                <Button icon={<PlusOutlined/>} type="primary" onClick={toggleCreateModal} className="mb-4">
                    Create new computer
                </Button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {computers?.map((computer: any) => {
                        const status = computer?.status ? <Tag color="green">Live</Tag> : <Tag color="red">Die</Tag>
                        const ramPercent = Math.round((computer?.ram_used / computer?.ram_total) * 100)
                        const diskPercent = Math.round((computer?.disk_used / computer?.disk_total) * 100)

                        return (
                            <Card title={computer.name} bordered={true} key={computer?.device_id}>
                                <div className="mb-2">
                                    <span className="mb-1">Status</span> <br/> {status}
                                </div>
                                <div>
                                    <span>CPU: {computer?.cpu_use}%</span> <Progress percent={computer?.cpu_use}
                                                                                     size="small"/>
                                </div>
                                <div>
                                    <span>Ram: {computer?.ram_used}/{computer?.ram_total} GB</span> <Progress
                                    percent={ramPercent}
                                    size="small"/>
                                </div>
                                <div>
                                    <span>Disk: {computer?.disk_used}/{computer?.disk_total} GB</span> <Progress
                                    percent={diskPercent}
                                    size="small"/>
                                </div>
                                <Divider/>
                                <div className="flex items-center gap-3 actions">
                                    <Button icon={<InfoCircleOutlined/>} onClick={() => setSelectedComputer(computer)}>
                                        Details
                                    </Button>
                                    <Popconfirm
                                        title="Reboot computer"
                                        description="Are you sure to reboto this computer?"
                                        onConfirm={() => restart(computer.url)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button danger icon={<ReloadOutlined/>}>
                                            Reboot
                                        </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        title="Delete the computer"
                                        description="Are you sure to delete this computer?"
                                        onConfirm={() => {
                                            remove(computer._id)
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button className="!bg-red-600 text-white" icon={<DeleteOutlined/>}>
                                            Remove
                                        </Button>
                                    </Popconfirm>
                                </div>

                            </Card>
                        )
                    }
                )}
                <Modal title="Computer info" open={!!selectedComputer} onCancel={() => {
                    setSelectedComputer(undefined);
                }}>
                    <List
                        size="small"
                        bordered
                        dataSource={Object.entries(selectedComputer || {})}
                        renderItem={(item: any) => <List.Item>
                            <b>
                                {item?.[0] || ""}
                            </b>
                            <span>{item?.[1] || ""}
                        </span>
                        </List.Item>}
                    />
                </Modal>

                <CreateComputerModal onCancel={() => setIsShowCreateModal(false)} visible={isShowCreateModal}/>
            </div>
        </>
    );
};

export default ComputerPage;