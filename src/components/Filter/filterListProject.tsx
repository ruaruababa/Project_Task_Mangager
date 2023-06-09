import {Button, DatePicker, Form, Input, Select} from 'antd';
import {useState} from 'react';
import {styled} from 'styled-components';
import useStatus from '../../hooks/useStatus';
interface Props {
    projectOtpions?: any;
    statusOptions?: any;
    setValues?: any;
    setPage?: any
    page?: any;
}
export const Container = styled.div<{toggleClearFiled: boolean}>`
    .ant-select-clear {
        opacity: ${({toggleClearFiled}) => (toggleClearFiled ? 1 : 0)};
    }
    .ant-picker-clear {
        opacity: ${({toggleClearFiled}) => (toggleClearFiled ? 1 : 0)};
    }
`;
const FilterListProject = (props: Props) => {
    const [form] = Form.useForm();
    const {setValues, page, setPage} = props;
    const {statusOptions} = useStatus();
    const [toggleClearField, setToggleClearField] = useState<any>(false);
    
    const handleFilterOnChange = (input: any, option: any) => {
        return (option?.label ?? '').includes(input);
    };

    return (
        <Form
            form={form}
            name="basic"
            onFinish={(values: any) => {
                if (page > 1) {
                    setPage(1)  
                }

                setValues({
                    ...values,
                    start_at: values?.start_at?.format('YYYY-MM-DD'),
                    end_at: values?.end_at?.format('YYYY-MM-DD'),
                });
            }}
            autoComplete="off"
        >
            <Container
                toggleClearFiled={toggleClearField}
                className="grid grid-cols-6 gap-3 mb-10"
            >
                <div className="col-span-2">
                    {' '}
                    <Form.Item name={'name'} className="!h-[40px]">
                        <Input
                            type="text"
                            className="!h-[40px]"
                            placeholder="Nhập tên dự án"
                        ></Input>
                    </Form.Item>
                </div>
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
                        onChange={(value) => {
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
                        format={'YYYY/MM/DD'}
                        style={{
                            backgroundColor: '#f5f5f5',
                            width: '100%',
                        }}
                        allowClear
                        onChange={(value) => {
                            setToggleClearField(true);
                        }}
                    />
                </Form.Item>
                <Form.Item name="end_at" valuePropName="endDate">
                    <DatePicker
                        className="!h-[40px]"
                        placeholder="Ngày kết thúc"
                        format={'YYYY/MM/DD'}
                        style={{
                            backgroundColor: '#f5f5f5',
                            width: '100%',
                        }}
                        allowClear
                        onChange={(value) => {
                            setToggleClearField(true);
                        }}
                    />
                </Form.Item>
                <Form.Item>
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
                            htmlType="button"
                            onClick={() => {
                                form.resetFields();
                            }}
                            className="!h-[40px] bg-blue-500 text-white"
                        >
                            Xoá bộ lọc
                        </Button>
                    </div>
                </Form.Item>
            </Container>
        </Form>
    );
};

export default FilterListProject;
