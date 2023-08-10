'use client';

import { useMediaQuery } from 'react-responsive';

const SCREEN_SIZE = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

export const useIsDesktop = () => {
  useMediaQuery({ minWidth: SCREEN_SIZE.lg });
};

export const useIsTablet = () => {
  return useMediaQuery({ minWidth: SCREEN_SIZE.xs, maxWidth: SCREEN_SIZE.lg });
};

export const useIsTabletAndBelow = () => {
  return useMediaQuery({ maxWidth: SCREEN_SIZE.lg });
};

export const useIsMobile = () => {
  return useMediaQuery({ maxWidth: SCREEN_SIZE.xs });
};

export const useIsMobileAndHigher = () => {
  return useMediaQuery({ minWidth: SCREEN_SIZE.xs });
};
