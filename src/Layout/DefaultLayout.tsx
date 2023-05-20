import {
    ApartmentOutlined,
    FundProjectionScreenOutlined,
    OrderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Button, Layout, Menu, theme} from 'antd';
import React, {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
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
    getItem('Quản lý dự án', '/project', <FundProjectionScreenOutlined />),
    getItem('Danh sách task', '/task', <OrderedListOutlined />),
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
                    <img src={logoUrl} />
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
                    <div className="flex items-center gap-3 align-middle profile">
                        <img
                            src={avatarUrl}
                            alt={'User'}
                            className="w-10 h-10 rounded-full"
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
