import {UserOutlined} from '@ant-design/icons';
import {Avatar, Popover} from 'antd';

const UserAvatar = (props: any) => {
    const {users} = props;
    return (
        <div className="flex items-center gap-2">
            {users.map((item: any) => {
                return (
                    <div className="text-lg font-semibold cursor-pointer hover:scale-125">
                        <Popover content={item?.name}>
                            <Avatar size="small" icon={<UserOutlined />} />
                        </Popover>
                    </div>
                );
            })}
        </div>
    );
};

export default UserAvatar;
