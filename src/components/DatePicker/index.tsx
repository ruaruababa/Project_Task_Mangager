import type {DatePickerProps} from 'antd';
import {DatePicker} from 'antd';

interface Props {
    name: string;
    holder?: string;
}

const DatePickerCp = (props: Props) => {
    const {name, holder} = props;
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return <DatePicker name={name} onChange={onChange} placeholder={holder}/>;
};

export default DatePickerCp;
