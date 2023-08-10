import { ConfigProvider, ThemeConfig } from 'antd';

type ConfigLayoutProps = {
  children: React.ReactNode;
};

export const ConfigLayout: React.FC<ConfigLayoutProps> = (props) => {
  const { children } = props;

  const theme: ThemeConfig = {
    components: {
      Menu: {
        itemHeight: 36,
      },
    },
    token: { colorPrimary: '#00b96b', fontSize: 12, borderRadius: 4 },
  };

  return (
    <>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </>
  );
};
