import React from 'react';
import {Button, Form, Input, Modal, notification} from "antd";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createComputer} from "../../services/computer";

interface Props {
    visible: boolean,
    onCancel: () => void,
}

const CreateComputerModal = (props: Props) => {
    const {visible, onCancel} = props;
    const queryClient = useQueryClient()
    const {mutate: createComputerMutate, isLoading} = useMutation({
        mutationFn: createComputer,
        mutationKey: ['createComputer'],
        onSuccess: () => {
            onCancel()
            notification.success({
                message: 'Success ',
                description: 'Create successfully',
            });
            queryClient.refetchQueries(['computers'])
        },
        onError: () => {
            notification.error({
                message: 'Error',
                description: 'Create failed',
            });
        }

    })

    const onFinish = (values: any) => {
        createComputerMutate(values)
    }

    return (
        <div>
            <Modal title="Create new computer" open={visible} onCancel={onCancel} footer={[]}>
                <Form
                    name="basic"
                    initialValues={{}}
                    onFinish={onFinish}
                    autoComplete="off"
                    className="mt-5"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please enter this field'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="URL"
                        name="url"
                        rules={[{required: true, message: 'Please enter this field'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Button type="primary" block htmlType="submit" loading={isLoading}>Create</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default CreateComputerModal;