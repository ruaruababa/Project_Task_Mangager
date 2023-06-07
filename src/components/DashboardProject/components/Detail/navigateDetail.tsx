import {Button} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';

const HeaderDetailProject = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    return (
        <div className="flex flex-row-reverse justify-between gap-3 mb-10">
            <div className="flex gap-2">
                {' '}
                <Button
                    type="primary"
                    className="text-white"
                    onClick={() => navigate(`/project/edit/${id}`)}
                    size="large"
                >
                    Chỉnh sửa dự án
                </Button>
            </div>

            <div className="">
                {' '}
                <div className="text-lg font-semibold">
                    <span
                        onClick={() => {
                            navigate('/');
                        }}
                        className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                    >
                        Trang chủ
                    </span>
                    {' / '}
                    <span
                        className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                        onClick={() => {
                            navigate('/project');
                        }}
                    >
                        Danh sách dự án
                    </span>{' '}
                    {' / '}
                    <span className="font-semibold">Chi tiết dự án</span>
                </div>
            </div>
        </div>
    );
};

export default HeaderDetailProject;
