import { Header } from 'antd/es/layout/layout';
import { theme } from 'antd';

type NavBarProps = object;

export const NavBar: React.FC<NavBarProps> = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}></Header>
    </>
  );
};
