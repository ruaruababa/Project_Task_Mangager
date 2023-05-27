import {Select} from 'antd';

interface Props {
    name: string;
    holder?: string;
    options: any;
}

const SelectProject = (props: Props) => {
    const {holder, options} = props;

    return (
        <Select
            className="w-full"
            size={'large'}
            showSearch
            placeholder={holder || 'Chọn tag'}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
                (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={options}
        />
    );
};

export default SelectProject;
