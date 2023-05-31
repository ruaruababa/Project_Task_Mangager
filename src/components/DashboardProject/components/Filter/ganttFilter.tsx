import {Button, DatePicker, Form, Input, Select} from 'antd';
import {useState} from 'react';
import styled from 'styled-components';
import useStatus from '../../../../hooks/useStatus';
interface Props {
    projectOtpions?: any;
    setValues?: any;
}

export const Container = styled.div<{toggleClearFiled: boolean}>`
    .ant-select-clear {
        opacity: ${({toggleClearFiled}) => (toggleClearFiled ? 1 : 0)};
    }
`;

const FilterGantt = (props: Props) => {
    const [form] = Form.useForm();
    const {projectOtpions, setValues} = props;
    const handleFilterOnChange = (input: any, option: any) => {
        return (option?.label ?? '').includes(input);
    };
    const {statusOptions} = useStatus();

    const [toggleClearField, setToggleClearField] = useState<any>();

    return (
        <Form
            form={form}
            name="basic"
            onFinish={(values) => {
                console.log('values', values);
                setValues({
                    ...values,
                    start_at: values?.start_at?.format('YYYY-MM-DD HH:mm'),
                    end_at: values?.end_at?.format('YYYY-MM-DD HH:mm'),
                });
            }}
            autoComplete="off"
        >
            <div className="grid grid-cols-7 gap-3 mb-10">
                <div className="col-span-2">
                    {' '}
                    <Form.Item name={'name'} className="!h-[40px]">
                        {/* <Select
                            placeholder="Chọn tên dự án"
                            fieldNames={{label: 'label', value: 'label'}}
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
                            options={projectOtpions}
                        /> */}
                        <Input
                            type="text"
                            className="!h-[40px]"
                            placeholder="Nhập tên task"
                        ></Input>
                    </Form.Item>
                </div>
                {/* <Form.Item name={'user_do'} className="!h-[40px]">
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
                    />
                </Form.Item> */}
                <Container toggleClearFiled={toggleClearField}>
                    <Form.Item name={'status_id'}>
                        <Select
                            allowClear
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
                            onChange={(values) => {
                                console.log('values', values);
                                setToggleClearField(values);
                            }}
                        />
                    </Form.Item>
                </Container>

                <Form.Item
                    name="start_at"
                    valuePropName="startDate"
                    className="!h-[40px]"
                >
                    <DatePicker
                        className="!h-[40px]"
                        placeholder="Ngày bắt đầu"
                        format={'YYYY/MM/DD HH:mm'}
                        style={{
                            backgroundColor: '#f5f5f5',
                            width: '100%',
                        }}
                        showTime
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
                        format={'YYYY/MM/DD HH:mm'}
                        style={{
                            backgroundColor: '#f5f5f5',
                            width: '100%',
                        }}
                        showTime
                        allowClear
                        onChange={() => {
                            setToggleClearField(true);
                        }}
                    />
                </Form.Item>
                <Form.Item className="col-span-2">
                    <div className="flex gap-3">
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
    );
};

export default FilterGantt;
