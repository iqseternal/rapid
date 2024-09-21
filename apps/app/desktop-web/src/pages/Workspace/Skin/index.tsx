import { makeVar, themeCssVarsSheet } from '@/themes';
import { classnames } from '@rapid/libs-web/common';
import { useRefresh, useReactive } from '@rapid/libs-web/hooks';
import { FlexRowCenter, FullSize, FullSizeWidth } from '@rapid/libs-web/styled';
import { Button, Input, Space, Card, Dropdown, message } from 'antd';
import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toPicket } from '@suey/pkg-utils';
import { useDocStore } from '@/features';
import { produce } from 'immer';
import { toMakeZustandHijack, useZustandHijack } from '@rapid/libs-web';

import IMessage from '@components/IMessage';
import AutoDropdownMenu from '@components/AutoDropdownMenu';

import Subfield from '@rapid/libs-web/components/Subfield';
import styles from './index.module.scss';

interface StyleBlockProps extends BaseProps {
  title?: string;
  subTitle?: string;
}

const StyleBlock: FC<StyleBlockProps> = (props) => {

  return <FullSizeWidth
    className={classnames(props.className, styles.styleBlock)}
    style={{
      textAlign: 'center',
    }}
  >
    <FullSizeWidth
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
    </FullSizeWidth>

    {props.children}

    <FullSizeWidth
      style={{
        height: '30px'
      }}
    />
  </FullSizeWidth>
}

export default function Skin() {
  const navigate = useNavigate();
  const refresh = useRefresh();





  const [state] = useReactive({
    name: 1
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
        window.open('https://www.baidu.com', '_blank', 'top=500,left=200,frame=true,nodeIntegration=no');
      }}
    >
      open
    </div>

    <StyleBlock>

      <Button
        onClick={() => {

        }}
      >
        append
      </Button>
    </StyleBlock>

    <StyleBlock>
      <span>{state.name}</span>

      <Button
        onClick={() => (state.name++)}
      >
        加
      </Button>
    </StyleBlock>

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

    <StyleBlock title='reducer'>
      <Button
        onClick={() => {

        }}
      >
        改变他
      </Button>
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
      </Space>
    </StyleBlock>

  </FullSize>



}
