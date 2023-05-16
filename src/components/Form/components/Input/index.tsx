import {Form, Input} from 'antd';

interface Props {
    name: string;
    label: string;
    rules?: any;
    className?: string;
    placeholder?: string;
    type?: string;
}

const InputField = (props: Props) => {
    const {name, label, rules, className, placeholder, type} = props;
    return (
        <>
            <Form.Item
                name={name}
                label={label}
                rules={rules}
                className={className}
            >
                <Input
                    type={type}
                    placeholder={placeholder}
                    style={{
                        backgroundColor: '#f5f5f5',
                    }}
                />
            </Form.Item>
        </>
    );
};

export default InputField;
