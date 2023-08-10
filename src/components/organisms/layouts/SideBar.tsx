import { DashboardOutlined, CalendarOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SideBarProps = object;

export const SideBar: React.FC<SideBarProps> = () => {
  const pathname = usePathname();

  const getActivedKey = () => {
    const foundIndex = mockdata.findIndex((item) => item.href === pathname);

    return String(foundIndex + 1);
  };

  return (
    <>
      <Layout.Sider collapsedWidth={0} breakpoint="sm">
        <div style={{ padding: '0 .5rem' }}>
          <Typography.Title
            level={4}
            style={{
              color: '#ffffff',
              height: '64px',
              margin: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '.5rem',
            }}
          >
            Pocket Kakeibo
          </Typography.Title>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[getActivedKey()]}
            items={mockdata.map((item, index) => {
              return {
                key: index + 1,
                ...item,
                label: <Link href={item.href}>{item.label}</Link>,
              };
            })}
          />
        </div>
      </Layout.Sider>
    </>
  );
};

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

const mockdata: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    href: '/backoffice',
  },
  { icon: <CalendarOutlined />, label: 'Calendar', href: '/backoffice/calendar' },
  { icon: <UsergroupAddOutlined />, label: 'Users', href: '/backoffice/users' },
];
