import { Header } from 'antd/es/layout/layout';
import { Avatar, Dropdown, theme } from 'antd';
import { signOut } from 'next-auth/react';
import { LogoutOutlined } from '@ant-design/icons';

export default function NavBar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header style={{ padding: '.5rem 1.5rem', background: colorBgContainer }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Sign Out',
                  icon: <LogoutOutlined />,
                  style: {
                    width: 200,
                  },
                  onClick: () => signOut(),
                },
              ],
            }}
            placement="bottomRight"
          >
            <Avatar
              style={{
                backgroundColor: '#f56a00',
                verticalAlign: 'middle',
                cursor: 'pointer',
              }}
              size="default"
              gap={4}
            >
              U
            </Avatar>
          </Dropdown>
        </div>
      </Header>
    </>
  );
}
