import {Button, Form, Input, Select} from 'antd';
import useStatus from '../../../../hooks/useStatus';
import useUser from '../../../../hooks/useUser';
interface Props {
    projectOtpions?: any;
    statusOptions?: any;
    setValues?: any;
}
const FilterTask = (props: Props) => {
    const [form] = Form.useForm();
    const {statusOptions} = useStatus();
    const {projectOtpions, setValues} = props;
    const handleFilterOnChange = (input: any, option: any) => {
        return (option?.name ?? '').includes(input);
    };

    const handleFilterSort = (optionA: any, optionB: any) => {
        return (optionA?.name ?? '')
            .toLowerCase()
            .localeCompare((optionB?.name ?? '').toLowerCase());
    };

    const {users} = useUser();

    return (
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
                        filterSort={(optionA, optionB) =>
                            handleFilterSort(optionA, optionB)
                        }
                        options={statusOptions}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="!h-[40px]"
                    >
                        Tìm kiếm
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default FilterTask;
