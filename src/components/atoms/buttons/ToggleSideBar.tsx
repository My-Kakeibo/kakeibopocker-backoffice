import { useIsMobile, useIsTabletAndBelow } from '@/utils/mediaQuery';
import { toggleSideBarState } from '@/utils/store/toggleRecoil';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

type ToggleSideBarProps = object;

export const ToggleSideBar: React.FC<ToggleSideBarProps> = () => {
  const [toggle, setToggle] = useRecoilState(toggleSideBarState);

  const isTableAndBelow = useIsTabletAndBelow();
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isTableAndBelow) {
      setToggle(true);
    } else if (isMobile) {
      setToggle(false);
    } else {
      setToggle(false);
    }
  }, [isTableAndBelow, isMobile]);

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <>
      <Button
        type="text"
        icon={toggle ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setToggle(!toggle)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </>
  );
};
