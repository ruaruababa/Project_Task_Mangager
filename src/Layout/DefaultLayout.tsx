import {
    BellOutlined,
    FundProjectionScreenOutlined,
    OrderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Badge, MenuProps, Popover} from 'antd';
import {Button, Layout, Menu, theme} from 'antd';
import React, {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Notification from '../components/Notification';
import useProfile from '../hooks/useProfile';
import {removeAccessToken} from '../utils/auth';
import useSocket from '../hooks/useSocket';

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const avatarUrl = 'avatar.jpg';

const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const navigate = useNavigate();

    const items: MenuItem[] = [
        // getItem('Quản lý dự án', '/project', <OrderedListOutlined />),
        // getItem('Thống kê', '/statistic', <FundProjectionScreenOutlined />),
        // getItem(' Quản lý người dùng', '/user', <UserOutlined />),
        // getItem(' Phân quyền', '/role', <ApartmentOutlined />),
    ];

    const {userProfile} = useProfile();

    useSocket({
        callBack: () => {
            setUnreadNotifications(unreadNotifications + 1);
        }
    });

    const canViewStatistic = userProfile?.permissions?.includes(
        'statistical:project',
        'statistical:task',
    );

    const canManagerUser = userProfile?.permissions?.includes('user:view-any');
    const canManagerProject =
        userProfile?.permissions?.includes('project:view-any');
    const canManagerRole = userProfile?.permissions?.includes('role:view-any');
    if (canManagerProject) {
        items.push(
            getItem('Quản lý dự án', '/project', <OrderedListOutlined />),
        );
    }
    if (canViewStatistic) {
        items.push(
            getItem('Thống kê', '/statistic', <FundProjectionScreenOutlined />),
        );
    }
    if (canManagerUser) {
        items.push(getItem(' Quản lý người dùng', '/user', <UserOutlined />));
    }

    if (canManagerRole) {
        items.push(getItem(' Phân quyền', '/role', <UserOutlined />));
    }

    const onClickMenu = (e: any) => {
        navigate(e.key);
        const key = e.key;
        const item = items?.find((item: any) => {
            return item?.children.find((child: any) => child?.key === key);
        });
        console.log('item', item);
        // @ts-ignore
        navigate(item?.key);
    };

    const handleNotificationDialogOpen = (open: boolean) => {
        if (open) {
            setUnreadNotifications(0);
        }
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={280}
            >
                <div
                    style={{height: 32, margin: '20px 0px'}}
                    className="flex justify-center w-full"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <h3 className="text-xl text-red-500 cursor-pointer">
                        VSEC
                    </h3>
                    {/* <img src={logoUrl} /> */}
                </div>
                <Menu
                    onClick={onClickMenu}
                    theme="dark"
                    defaultSelectedKeys={['/']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="flex !bg-white header-container"
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <div className="left">
                        <h3>Dashboard</h3>
                    </div>
                    <div className="flex items-center gap-5 align-middle profile">
                        <div className="relative">
                            <Popover content={<Notification shouldRefetch={unreadNotifications > 0} />} trigger='click' afterOpenChange={handleNotificationDialogOpen}>
                                <a href='#'>
                                    <Badge count={unreadNotifications}>
                                        <BellOutlined
                                            style={{
                                                fontSize: 20,
                                            }}
                                        />
                                    </Badge>
                                </a>
                            </Popover>
                        </div>
                        <img
                            onClick={() => {
                                navigate('/profile');
                            }}
                            src={userProfile?.avatar || avatarUrl}
                            alt={'User'}
                            className="w-10 h-10 rounded-full cursor-pointer"
                        />
                        <Button
                            size="small"
                            onClick={() => {
                                removeAccessToken();
                                window.location.reload();
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </Header>
                <Content style={{margin: '0 16px', marginTop: 20}}>
                    <div style={{minHeight: 1000}} className="px-20 py-10">
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Task Manager ©2023 Created by Pham Hai
                </Footer>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
