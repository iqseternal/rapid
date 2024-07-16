import { FlexRowCenter, FullSize, FullSizeWidth, combinationStyled } from '@/styled';
import { combinationCName } from '@rapid/libs-web/common';
import { useShallowReactive, useReactive, useAutoState } from '@rapid/libs-web/hooks';
import { Button, Collapse, Input, theme, Space, Card, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginRoute } from '@pages/index/router';
import { useFadeOut } from '@/hooks';
import { makeVar, themeCssVarsSheet } from '@/themes';
import type { FC } from 'react';

import IMessage from '@rapid/libs-web/components/IMessage';
import Subfield from '@rapid/libs-web/components/Subfield';
import animationStyles from '@scss/common/animation.module.scss';
import commonStyles from '@scss/common/index.module.scss';
import styles from './index.module.scss';

import axios from 'axios';
import { DropdownMenu, DropdownMenuItem, DropdownSubMenu } from '@components/DropdownMenu';

interface StyleBlockProps extends BaseProps {
  title?: string;
  subTitle?: string;
}
const StyleBlock: FC<StyleBlockProps> = (props) => {

  return <div
    className={combinationCName(props.className)}
    style={{
      textAlign: 'center',

    }}
  >
    <div
      style={{
        color: makeVar(themeCssVarsSheet.primaryTextColor),
        margin: '10px 0'
      }}
    >
      <Space>
        {props.title}
        <span
          style={{
            color: makeVar(themeCssVarsSheet.secondaryTextColor)
          }}
        >
          {props.subTitle}
        </span>
      </Space>
    </div>

    {props.children}
    <div
      style={{
        height: '30px',
        width: '100%'
      }}
    />
  </div>
}

export default function Workbenches() {


  const navigate = useNavigate();

  const [state] = useShallowReactive({
    name: 1
  })

  const logout = () => useFadeOut(() => {
    navigate(loginRoute.meta.fullpath)
  })

  return <FullSize
    className={styles.workbenches}
    style={{
      textAlign: 'center',
      height: 'max-content'
    }}
  >

    <div
      onClick={() => {

        window.open('https://www.baidu.com', '_blank', 'top=500,left=200,frame=true,nodeIntegration=no')


      }}
    >


      open
    </div>


    <StyleBlock title='背景色色阶' subTitle='块'>
      <div
        style={{
          backgroundColor: makeVar(themeCssVarsSheet.primaryBackgroundColor),
          color: makeVar(themeCssVarsSheet.primaryTextColor)
        }}
      >
        1 级背景
      </div>
      <div
        style={{
          backgroundColor: makeVar(themeCssVarsSheet.secondaryBackgroundColor),
          color: makeVar(themeCssVarsSheet.secondaryTextColor)
        }}
      >
        2 级背景
      </div>
      <div
        style={{
          backgroundColor: makeVar(themeCssVarsSheet.thirdBackgroundColor),
          color: makeVar(themeCssVarsSheet.placeholderTextColor)
        }}
      >
        3 级背景
      </div>
      <div
        style={{
          backgroundColor: makeVar(themeCssVarsSheet.fourthBackgroundColor)
        }}
      >
        4 级背景
      </div>
    </StyleBlock>

    <StyleBlock title='文字颜色'>
      <div
        style={{
          backgroundColor: makeVar(themeCssVarsSheet.secondaryBackgroundColor),
          color: makeVar(themeCssVarsSheet.primaryTextColor)
        }}
      >
        主要文本
      </div>
      <div
        style={{
          backgroundColor: makeVar(themeCssVarsSheet.secondaryBackgroundColor),
          color: makeVar(themeCssVarsSheet.secondaryTextColor)
        }}
      >
        次要文本
      </div>
      <div
        style={{
          backgroundColor: makeVar(themeCssVarsSheet.secondaryBackgroundColor),
          color: makeVar(themeCssVarsSheet.placeholderTextColor)
        }}
      >
        <Space>
          placeholder

          <Input placeholder='placeholder' style={{ width: '250px' }}></Input>
        </Space>
      </div>
      <div
        style={{
          backgroundColor: makeVar(themeCssVarsSheet.secondaryBackgroundColor),
          color: makeVar(themeCssVarsSheet.placeholderTextColor),
          padding: '10px 0'
        }}
      >
        <Space
          style={{
            cursor: 'pointer'
          }}
        >
          Message类

          <div
            style={{ color: makeVar(themeCssVarsSheet.successMessageColor) }}
            onClick={() => {
              IMessage.success({
                duration: 1000,
                content: 'success'
              })
            }}
          >
            success
          </div>
          <div
            style={{ color: makeVar(themeCssVarsSheet.warningMessageColor) }}
            onClick={() => {
              IMessage.warning({
                duration: 1000,
                content: 'warning'
              })
            }}
          >
            warning
          </div>
          <div
            style={{ color: makeVar(themeCssVarsSheet.errorMessageColor) }}
            onClick={() => {
              IMessage.error({
                duration: 1000,
                content: 'error'
              })
            }}
          >
            error
          </div>
        </Space>
      </div>
    </StyleBlock>

    <StyleBlock title='按钮'>
      <Space>
        <Button type='primary'>2dfdafdfd</Button>
        <Button type='dashed'>2dfdafdfd</Button>
        <Button type='default'>2dfdafdfd</Button>
        <Button type='link'>2dfdafdfd</Button>
        <Button type='text'>2dfdafdfd</Button>
      </Space>
      <Space style={{ marginTop: '10px' }}>
        <Button type='primary' disabled>2dfdafdfd</Button>
        <Button type='dashed' disabled>2dfdafdfd</Button>
        <Button type='default' disabled>2dfdafdfd</Button>
        <Button type='link' disabled>2dfdafdfd</Button>
        <Button type='text' disabled>2dfdafdfd</Button>
      </Space>
    </StyleBlock>

    <StyleBlock title='卡片'>
      <FlexRowCenter>
        <Card style={{ width: '60%', textAlign: 'left' }}>
          111111111111111111111111111
        </Card>
      </FlexRowCenter>
    </StyleBlock>

    <StyleBlock title='下拉菜单'>
      <Space>
        <Dropdown
          arrow={true}
          // open={true}
          autoAdjustOverflow
          getPopupContainer={() => document.body}
          menu={{
            items: [
              {
                key: '0',
                label: '111111111111',
              },
              {
                type: 'divider',
              },
              {
                key: '1',
                label: '111111111111',
                children: [
                  {
                    key: '3-1',
                    label: '5d menu item',
                  },
                  {
                    key: '3-2',
                    label: '6th menu item',
                  },
                ],
              },
            ]
          }}
        >
          <span>
            下拉菜单
          </span>
        </Dropdown>

        <DropdownMenu

        >
          <span>
            文件菜单
          </span>
        </DropdownMenu>
      </Space>
    </StyleBlock>
  </FullSize>
}
