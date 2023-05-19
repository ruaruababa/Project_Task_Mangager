import {DatePicker} from 'antd';

interface Props {
    name: string;
    holder?: string;
}

const DatePickerCp = (props: Props) => {
    const {name, holder} = props;

    return <DatePicker name={name} placeholder={holder} />;
};

export default DatePickerCp;
