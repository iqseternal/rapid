import { Select, Button, Space, Card, Divider } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Subfield, SubfieldCloumn, SubfieldSpace } from '@components/Subfield';
import { FlexRowStart, FlexCloumnStart } from '@/styled';
import { Link } from 'react-router-dom';
import { isNotSpaceStr } from '@libs/judge';
import { useReactive } from '@/hooks';
import { printInfo, print, toColor } from '@suey/printer';
import { apiGet } from '@libs/request/request';
import { CONFIG } from '@rapid/config/constants';

import styled from 'styled-components';
import IconFont from '@components/IconFont';
import Logo from '@components/Logo';

import styles from './index.module.scss';
import Perpose from '@/layout/ReceptionLayout/Prepose';

export function getDownloadListForGithub() {
  const a = document.createElement('a');

  a.href = `https://github.com/iqseternal/rapid/releases/download/alpha-preview/rapid-1.0.0-alpha-preview-window-setup.exe`;
  a.target = '_blank';

  document.body.append(a);
  a.click();
  a.remove();
}

export default function Download() {
  const [state] = useReactive({
    program: CONFIG.PROJECT,
    version: '',
    platform: ''
  });

  const download = useCallback(() => {
    getDownloadListForGithub();
  }, []);

  return <div className={styles.download}>
    <FlexRowStart className={styles.board} style={{ marginBottom: '30px' }}>
      <Logo size={60} />
    </FlexRowStart>

    <Subfield style={{ alignItems: 'flex-start' }}>
      <SubfieldCloumn className={styles.board} size={1} gap='30px' style={{ alignItems: 'flex-start' }}>
        <h1>选择您想要下载的 {CONFIG.PROJECT} 版本</h1>
        <p>
          目前正在搭建整个应用程序的整体框架, 为后面的开发打造基础。<br />
          目前秉持着高可用, 高扩展的状态编写的代码。
        </p>
        <p>Electron, Electron-Vite, Electron-Store, Vue, TypeScript, Socket, Animate, AntDesignVue, Mousetrap, AutoAnimate, Pako, Pinia</p>
        <Link to={CONFIG.REPOSITORY.URL} target='_blank'>
          <IconFont type='CodeOutlined' />
          <span>&nbsp;源代码</span>
        </Link>
      </SubfieldCloumn>

      <SubfieldCloumn className={styles.board} size={1} gap='20px' style={{ alignItems: 'flex-start' }}>
        <SubfieldCloumn className='w-full' gap='10px' style={{ alignItems: 'flex-start' }}>
          <div>请选择你需要的程序:</div>
          <Select className='w-full' value={state.program} onChange={(value) => (state.program = value)} disabled />
        </SubfieldCloumn>

        <SubfieldCloumn className='w-full' gap='10px' style={{ alignItems: 'flex-start' }}>
          <div>请选择你需要的版本号:</div>
          <Select className='w-full' value={state.version} onChange={(value) => (state.version = value)} options={[{ label: 'v1.0.0', value: 'v1.0.0' }]} />
        </SubfieldCloumn>

        <SubfieldCloumn className='w-full' gap='10px' style={{ alignItems: 'flex-start' }}>
          <div>请选择你需要的平台安装程序:</div>
          <Select className='w-full' value={state.platform} onChange={(value) => (state.platform = value)} options={[{ label: 'win-x64', value: 'win-x64' }, { label: 'mac', value: 'mac' }]} />
        </SubfieldCloumn>

        <SubfieldCloumn className='w-full' style={{ alignItems: 'flex-start' }}>
          <h2>您即将下载:</h2>
          <p>{state.program}</p>
          <p>{state.version}</p>
          <p>{state.platform}</p>

          <Subfield className='w-full'>
            <SubfieldSpace />
            <Button type='primary' onClick={download}>立即下载</Button>
          </Subfield>
        </SubfieldCloumn>
      </SubfieldCloumn>
    </Subfield>
  </div>
}
