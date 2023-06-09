import {Button, DatePicker, Form} from 'antd';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {useState} from 'react';
import {styled} from 'styled-components';

const {RangePicker} = DatePicker;

interface Props {
    setParams?: any;
    needHours?: boolean;
}
export const Container = styled.div<{toggleClearFiled: boolean}>`
    .ant-select-clear {
        opacity: ${({toggleClearFiled}) => (toggleClearFiled ? 1 : 0)};
    }
    .ant-picker-clear {
        opacity: ${({toggleClearFiled}) => (toggleClearFiled ? 1 : 0)};
    }
`;
const FilterAnalystic = (props: Props) => {
    const [form] = Form.useForm();
    const {setParams, needHours} = props;
    const [toggleClearFiled, setToggleClearFiled] = useState(false);

    const rangePresets: {
        label: string;
        value: [Dayjs, Dayjs];
    }[] = [
        {label: '7 ngày qua', value: [dayjs().add(-7, 'd'), dayjs()]},
        {label: '14 ngày qua', value: [dayjs().add(-14, 'd'), dayjs()]},
        {label: '30 ngày qua', value: [dayjs().add(-30, 'd'), dayjs()]},
        {label: '90 ngày qua', value: [dayjs().add(-90, 'd'), dayjs()]},
    ];

    return (
        <Form
            form={form}
            name="basic"
            onFinish={(values) => {
                console.log('values', values);
                setParams(values);
            }}
            autoComplete="off"
        >
            <Container
                toggleClearFiled={toggleClearFiled}
                className="grid grid-cols-7 gap-3 mb-10"
            >
                <Form.Item
                    name="date_range"
                    valuePropName="startDate"
                    className="!h-[40px] col-span-4"
                >
                    <RangePicker
                        className="!h-[40px]"
                        placeholder={[
                            'Thời gian bắt đầu',
                            'Thời gian kết thúc',
                        ]}
                        presets={rangePresets}
                        format={`YYYY/MM/DD ${needHours ? 'HH:mm' : ''}`}
                        style={{
                            backgroundColor: '#f5f5f5',
                            width: '100%',
                        }}
                        showTime={needHours}
                        allowClear
                        onChange={() => {
                            setToggleClearFiled(true);
                        }}
                    />
                </Form.Item>

                <Form.Item>
                    <div className="flex gap-3">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="!h-[40px] col-span-1"
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            className="!h-[40px] bg-blue-500 text-white col-span-1"
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

export default FilterAnalystic;
