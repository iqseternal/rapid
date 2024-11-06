import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { Subfield, SubfieldSpace, SubfieldRow } from '@/components/Subfield';
import { FloatButton } from 'antd';
import { ReceptionScrollContainerContext } from '@/context';
import { useEventListener } from '@/hooks';

export default function DashLayout() {


  return <div id='dashboard'>

    <main>
      <Outlet></Outlet>
    </main>
  </div>
}
