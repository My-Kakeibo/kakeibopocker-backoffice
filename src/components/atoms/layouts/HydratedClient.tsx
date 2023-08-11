'use client';

import { Hydrate, HydrateProps } from '@tanstack/react-query';

export default function HydratedClient(props: HydrateProps) {
  const { children, ...rest } = props;

  return <Hydrate {...rest}>{children}</Hydrate>;
}
