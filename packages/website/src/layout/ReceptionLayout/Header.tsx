import type { FC } from 'react';
import { useState, forwardRef, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Subfield, SubfieldCloumn } from '@/components/Subfield';
import { FlexRowBetween, FlexRowStart, FullSizeWidth, MaxScreenHeight, combinationStyled, MaxScreenWidth, Flex } from '@rapid/libs-web/styled';
import { receptionRoutes } from '@/router/modules/reception';
import type { RadioChangeEvent } from 'antd';
import type { SelectCommonPlacement } from 'antd/es/_util/motion';
import { Space, Popover, TreeSelect, Drawer, ConfigProvider, Button } from 'antd';
import { MenuOutlined, SearchOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { LangMap, LangType } from '@/i18';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { combinationCName } from '@libs/common';
import { receptionMenuRoutes } from '@/router';
import type { RequiredRouteConfig } from '@/router/utils';
import { useReactive } from '@/hooks';
import { isArray, isDef, isUnDef } from '@suey/pkg-utils';
import { CONFIG } from '@rapid/config/constants';

import styled, { css } from 'styled-components';
import styles from './header.module.scss';

import IconFont from '@components/IconFont';
import Logo from '@components/Logo';


const NavContainer = combinationStyled('nav', FullSizeWidth, Flex);
const NavSubContianer = combinationStyled('div', FullSizeWidth, MaxScreenWidth, FlexRowBetween);

function Trademark({ onClick = () => {} }) {
  return <Space className={styles.trademark}>
    <Logo onClick={onClick} />

    <span onClick={onClick}>{CONFIG.PROJECT}</span>
  </Space>;
}

function MenuPane({ route }: { route: RequiredRouteConfig }) {
  if (!isDef(route.children) || route.children.length === 0) return <></>;

  return <Subfield gap={20} className={styles.subMenu}>
    <SubfieldCloumn className={styles.subMenuLeft}>
      {
        route.children.map(route => {
          return <div key={route.meta.fullPath} className={styles.subMenuItem}>
            <span>{route.meta.title}</span>
          </div>
        })
      }
    </SubfieldCloumn>
    <div className={styles.subMenuRight}>
      2333444
    </div>
  </Subfield>
}

/**
 * 子菜单项
 */
function Menu(props: { route: RequiredRouteConfig }) {
  const navigate = useNavigate();

  const content = <span
    className={styles.menuTitle}
    onClick={() => {
      navigate(props.route.meta.fullPath);
    }}
  >
    {props.route.meta.title}
  </span>;

  if (!isDef(props.route.children) || props.route.children.length === 0) return content;

  return <Popover
    mouseEnterDelay={1}
    overlayClassName={styles.receptionHeaderPopover}
    content={<MenuPane route={props.route} />}
  >
    {content}
  </Popover>
}

function Control() {
  return <Subfield className={styles.control} gap='15px' style={{ justifyContent: 'right' }}>
    <IconFont type='SearchOutlined' />
    <IconFont type='MenuOutlined' />
  </Subfield>;
}


export default function Header(props: BaseProps) {
  const navigate = useNavigate();

  return <NavContainer className={combinationCName(props.className, styles.receptionHeaderContainer)}>
    <NavSubContianer className={styles.receptionNavContainer}>
      <Trademark
        onClick={() => {
          navigate(receptionRoutes.meta.fullPath);
        }}
      />
      <Subfield className={styles.menu}>
        {receptionMenuRoutes.children?.map(child => <Menu route={child} key={child.meta.fullPath} />)}

        {/* <NavLink to='/reception/download'>Download</NavLink>
        <NavLink to='/reception/download'>Download</NavLink> */}
      </Subfield>
      <Control />
    </NavSubContianer>
  </NavContainer>
};

