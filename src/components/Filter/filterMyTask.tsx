import {Button, DatePicker, Form, Input} from 'antd';
import {useState} from 'react';
import {styled} from 'styled-components';
import dayjs from 'dayjs';

interface Props {
    projectOtpions?: any;
    statusOptions?: any;
    setValues?: any;
    page?: any;
    setPage?: any
}
export const Container = styled.div<{toggleClearFiled: boolean}>`
    .ant-select-clear {
        opacity: ${({toggleClearFiled}) => (toggleClearFiled ? 1 : 0)};
    }
    .ant-picker-clear {
        opacity: ${({toggleClearFiled}) => (toggleClearFiled ? 1 : 0)};
    }
`;
const FilterMyTask = (props: Props) => {
    const [form] = Form.useForm();
    const {projectOtpions, statusOptions, setValues, page, setPage} = props;
    const [toggleClearFiled, setToggleClearFiled] = useState(false);
    const startDate = Form.useWatch('start_at', form);

    return (
        <Form
            form={form}
            name="basic"
            onFinish={(values) => {
                if (page > 1) {
                    setPage(1)  
                }

                setValues({
                    ...values,
                    start_at: values?.start_at?.format('YYYY-MM-DD HH:mm'),
                    end_at: values?.end_at?.format('YYYY-MM-DD HH:mm'),
                });
                // form.resetFields();
            }}
            autoComplete="off"
        >
            <Container
                toggleClearFiled={toggleClearFiled}
                className="grid grid-cols-6 gap-3 mb-10"
            >
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
                            placeholder="Nhập tên dự án"
                        ></Input>
                    </Form.Item>
                </div>
                <Form.Item name={'taskName'}>
                    <Input placeholder="Nhập tên đầu việc" className="!h-[40px]" />
                </Form.Item>

                <Form.Item
                    name="start_at"
                    valuePropName="startDate"
                    className="!h-[40px]"
                >
                    <DatePicker
                        className="!h-[40px]"
                        placeholder="Thời gian bắt đầu"
                        format={'YYYY/MM/DD HH:mm'}
                        style={{
                            backgroundColor: '#f5f5f5',
                            width: '100%',
                        }}
                        showTime
                        allowClear
                        onChange={() => {
                            setToggleClearFiled(true);
                        }}
                    />
                </Form.Item>
                <Form.Item name="end_at" valuePropName="endDate">
                    <DatePicker
                        disabledDate={(d) =>
                            !d ||
                            d.isBefore(
                                dayjs(startDate).format(
                                    'YYYY/MM/DD HH:mm',
                                ),
                            )
                        }                    
                        className="!h-[40px]"
                        placeholder="Thời gian kết thúc"
                        allowClear
                        onChange={() => {
                            setToggleClearFiled(true);
                        }}
                        format={'YYYY/MM/DD HH:mm'}
                        style={{
                            backgroundColor: '#f5f5f5',
                            width: '100%',
                        }}
                        showTime
                    />
                </Form.Item>
                <Form.Item>
                    <div className="flex gap-3">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="!h-[40px]"
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            className="!h-[40px] bg-blue-500 text-white"
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Xóa bộ lọc
                        </Button>
                    </div>
                </Form.Item>
            </Container>
        </Form>
    );
};

export default FilterMyTask;
