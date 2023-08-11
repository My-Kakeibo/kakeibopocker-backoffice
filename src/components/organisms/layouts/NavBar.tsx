import { Header } from 'antd/es/layout/layout';
import { theme } from 'antd';

export default function NavBar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}></Header>
    </>
  );
}
