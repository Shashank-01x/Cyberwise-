
import {NextUIProvider} from "@nextui-org/react";

import { ReactNode } from 'react';

export default function provider({children}: {children: ReactNode}) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}