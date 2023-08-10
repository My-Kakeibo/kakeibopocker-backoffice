import { atom } from 'recoil';

export const toggleSideBarState = atom<boolean>({
  key: 'toggleSideBar',
  default: false,
});
