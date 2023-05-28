import {Button, DatePicker, Form, Input, Select} from 'antd';
interface Props {
    projectOtpions: any;
    statusOptions: any;
    setValues: any;
}
const FilterProject = (props: Props) => {
    const [form] = Form.useForm();
    const {projectOtpions, statusOptions, setValues} = props;
    const handleFilterOnChange = (input: any, option: any) => {
        return (option?.label ?? '').includes(input);
    };

    const handleFilterSort = (optionA: any, optionB: any) => {
        return (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase());
    };

    // const {data: projectFilterResponse} = useQuery({
    //     queryKey: ['filterProject', values],
    //     queryFn: () => filterProject(values),
    //     enabled: !!values,
    // });

    return (
        <Form
            form={form}
            name="basic"
            onFinish={(values) => {
                setValues({
                    ...values,
                    start_at: values?.start_at?.format('YYYY-MM-DD HH:mm'),
                    end_at: values?.end_at?.format('YYYY-MM-DD HH:mm'),
                });
                form.resetFields();
            }}
            autoComplete="off"
        >
            <div className="grid grid-cols-6 gap-3 mb-10">
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
                        filterSort={(optionA, optionB) =>
                            handleFilterSort(optionA, optionB)
                        }
                        options={statusOptions}
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
                        onChange={() => {}}
                        format={'YYYY/MM/DD HH:mm'}
                        style={{
                            backgroundColor: '#f5f5f5',
                            width: '100%',
                        }}
                        showTime
                    />
                </Form.Item>
                <Form.Item name="end_at" valuePropName="endDate">
                    <DatePicker
                        className="!h-[40px]"
                        placeholder="Ngày kết thúc"
                        onChange={() => {}}
                        format={'YYYY/MM/DD HH:mm'}
                        style={{
                            backgroundColor: '#f5f5f5',
                            width: '100%',
                        }}
                        showTime
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="!h-[40px]"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default FilterProject;
