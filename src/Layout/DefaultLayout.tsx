import {
    ApartmentOutlined,
    BellOutlined,
    FundProjectionScreenOutlined,
    OrderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Button, Layout, Menu, theme} from 'antd';
import React, {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Notification from '../components/Notification';
import useProfile from '../hooks/useProfile';
import {removeAccessToken} from '../utils/auth';

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

const items: MenuItem[] = [
    getItem('Quản lý dự án', '/project', <OrderedListOutlined />),
    getItem('Thống kê', '/task', <FundProjectionScreenOutlined />),
    getItem(' Quản lý người dùng', '/user', <UserOutlined />),
    getItem(' Phân quyền', '/role', <ApartmentOutlined />),
];

const avatarUrl = 'avatar.jpg';
const logoUrl = 'logo512.png';

const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const navigate = useNavigate();
    const {userProfile} = useProfile();

    const onClickMenu = (e: any) => {
        navigate(e.key);
        const key = e.key;
        console.log('key', e);
        const item = items?.find((item: any) => {
            item?.children.find((child: any) => child?.key === key);
        });
        console.log('item', item);
        // @ts-ignore
        navigate(item?.key);
    };
    const [isShow, setIsShow] = useState(false);
    const handleShowNotification = () => {
        setIsShow(!isShow);
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
                            <BellOutlined
                                style={{
                                    fontSize: 20,
                                }}
                                onClick={handleShowNotification}
                            />
                            {isShow && (
                                <div className="absolute z-30 bg-white shadow-lg rounded-md left-[-200px]">
                                    <Notification />
                                </div>
                            )}
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
