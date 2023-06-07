import {useNavigate} from 'react-router-dom';

interface Props {
    id?: string;
}

const HeaderCreateUpdateProject = (props: Props) => {
    const {id} = props;
    const navigate = useNavigate();
    return (
        <div className="mb-5">
            <div className="">
                <span
                    onClick={() => {
                        navigate('/');
                    }}
                    className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                >
                    Trang chủ /
                </span>{' '}
                <span
                    className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                    onClick={() => {
                        navigate('/project');
                    }}
                >
                    Danh sách dự án /
                </span>{' '}
                <span className="font-semibold">
                    {id ? ' Chỉnh sửa ' : 'Tạo '} dự án
                </span>
            </div>
        </div>
    );
};

export default HeaderCreateUpdateProject;
