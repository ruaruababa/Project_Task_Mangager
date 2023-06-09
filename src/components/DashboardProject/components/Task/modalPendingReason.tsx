import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Form, Modal, notification} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useParams} from 'react-router-dom';
import {updateTask} from '../../../../services/project';
interface Props {
    visible: boolean;
    onCancel: () => void;
    setVisible?: any;
    data?: any;
}

const ModalPendingReason = (props: Props) => {
    const {visible, onCancel, setVisible, data} = props;
    const {id} = useParams();

    const queryClient = useQueryClient();
    const {mutate: updateTaskInProject} = useMutation({
        mutationFn: (params: any) => updateTask(params, id, params?.idTask),
        mutationKey: ['updateTask'],
        onSuccess: () => {
            notification.success({
                message: 'Thành công ',
                description: 'Cập nhật thành công',
            });
            setVisible(false);
            queryClient.refetchQueries(['filterTask']);
        },
        onError: (error: any) => {
            const messError = error?.response?.data?.message;
            notification.error({
                message: 'Error',
                description: `${messError}` || 'Lỗi hệ thống, vui lòng thử lại sau',
            });
        },
    });
    return (
        <div>
            <Modal
                title="Lý do hoãn"
                open={visible}
                onCancel={onCancel}
                footer={[]}
            >
                <Form
                    name="basic"
                    initialValues={{}}
                    onFinish={(values) => {
                        updateTaskInProject({
                            ...values,
                            ...data,
                        });
                    }}
                    autoComplete="off"
                    className="mt-5"
                >
                    <Form.Item
                        name="pending_reason"
                        label="Lý do"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lý do!',
                            },
                        ]}
                    >
                        <TextArea
                            placeholder="Nhập lý do"
                            style={{
                                backgroundColor: '#f5f5f5',
                            }}
                            cols={30}
                            rows={10}
                        />
                    </Form.Item>

                    <Button type="primary" block htmlType="submit">
                        Create
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default ModalPendingReason;
