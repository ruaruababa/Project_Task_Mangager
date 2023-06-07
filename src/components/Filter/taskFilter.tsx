import {Button, DatePicker, Form, Input, Select} from 'antd';
import {useState} from 'react';
import styled from 'styled-components';
import useStatus from '../../hooks/useStatus';
import useUser from '../../hooks/useUser';

export const Container = styled.div<{toggleClearFiled: boolean}>`
    .ant-select-clear {
        opacity: ${({toggleClearFiled}) => (toggleClearFiled ? 1 : 0)};
    }
    .ant-picker-clear {
        opacity: ${({toggleClearFiled}) => (toggleClearFiled ? 1 : 0)};
    }
`;
interface Props {
    projectOtpions?: any;
    statusOptions?: any;
    setValues?: any;
    needHours?: any;
}
const FilterTask = (props: Props) => {
    const [form] = Form.useForm();
    const {statusOptions} = useStatus();
    const {needHours, setValues} = props;
    const handleFilterOnChange = (input: any, option: any) => {
        return (option?.name ?? '').includes(input);
    };

    const handleFilterSort = (optionA: any, optionB: any) => {
        return (optionA?.name ?? '')
            .toLowerCase()
            .localeCompare((optionB?.name ?? '').toLowerCase());
    };

    const {users} = useUser();
    const [toggleClearField, setToggleClearField] = useState<any>(false);
    return (
        <Container toggleClearFiled={toggleClearField}>
            {' '}
            <Form
                form={form}
                name="basic"
                onFinish={(values) => {
                    setValues(values);
                }}
                autoComplete="off"
            >
                <div className="grid grid-cols-6 gap-3 mb-10">
                    <div className="col-span-1">
                        {' '}
                        <Form.Item name={'task_name'} className="!h-[40px]">
                            <Input
                                type="text"
                                className="!h-[40px]"
                                placeholder="Nhập tên task"
                            ></Input>
                        </Form.Item>
                    </div>
                    <Form.Item name={'user_do'} className="!h-[40px]">
                        <Select
                            placeholder="Chọn người thực hiện"
                            fieldNames={{label: 'name', value: 'id'}}
                            className="w-full"
                            size={'large'}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input: any, option: any) =>
                                handleFilterOnChange(input, option)
                            }
                            filterSort={(optionA, optionB) =>
                                handleFilterSort(optionA, optionB)
                            }
                            options={users}
                            allowClear
                            onChange={() => {
                                setToggleClearField(true);
                            }}
                        />
                    </Form.Item>
                    <Form.Item name={'status_id'}>
                        <Select
                            placeholder="Chọn trạng thái"
                            fieldNames={{label: 'label', value: 'value'}}
                            className="w-full"
                            size={'large'}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input: any, option: any) =>
                                handleFilterOnChange(input, option)
                            }
                            options={statusOptions}
                            allowClear
                            onChange={() => {
                                setToggleClearField(true);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="start_at"
                        valuePropName="startDate"
                        className="!h-[40px]"
                    >
                        <DatePicker
                            className="!h-[40px]"
                            placeholder="Ngày bắt đầu"
                            format={`YYYY/MM/DD ${needHours && 'HH:mm'}`}
                            style={{
                                width: '100%',
                            }}
                            showTime={needHours ? true : false}
                            allowClear
                            onChange={() => {
                                setToggleClearField(true);
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="end_at" valuePropName="endDate">
                        <DatePicker
                            className="!h-[40px]"
                            placeholder="Ngày kết thúc"
                            format={`YYYY/MM/DD ${needHours && 'HH:mm'}`}
                            style={{
                                width: '100%',
                            }}
                            showTime={needHours ? true : false}
                            allowClear
                            onChange={() => {
                                setToggleClearField(true);
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className="flex justify-evenly">
                            {' '}
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="!h-[40px]"
                            >
                                Tìm kiếm
                            </Button>
                            <Button
                                className="!h-[40px] bg-blue-500 text-white hover:bg-blue-600"
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                Xóa bộ lọc
                            </Button>
                        </div>
                    </Form.Item>
                </div>
            </Form>
        </Container>
    );
};

export default FilterTask;
