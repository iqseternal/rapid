import { classnames } from '@rapid/libs-web/common';
import { useRefresh, useReactive } from '@rapid/libs-web/hooks';
import { Button, Input, Space, Card, Dropdown, message } from 'antd';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocStore } from '@/features';
import { produce } from 'immer';
import { InnerExtensionNames } from '@/plats/extensions';

import IMessage from '@/components/IMessage';

import styles from './index.module.scss';

const FlexRowCenter = (props: HTMLAttributes<HTMLDivElement>) => <div {...props} className={classnames('w-full h-full flex justify-center', props.className)} />;
const FullSize = (props: HTMLAttributes<HTMLDivElement>) => <div {...props} className={classnames('w-full h-full', props.className)} />;
const FullSizeWidth = (props: HTMLAttributes<HTMLDivElement>) => <div {...props} className={classnames('w-full', props.className)} />;

interface StyleBlockProps {
  title?: string;
  subTitle?: string;

  children?: ReactNode;

  className?: string;
}

const StyleBlock: FC<StyleBlockProps> = (props) => {

  return (
    <FullSizeWidth
      className={classnames(props.className, styles.styleBlock)}
      style={{
        textAlign: 'center',
      }}
    >
      <FullSizeWidth
        style={{
          color: cssVars.primaryTextColor,
          margin: '10px 0'
        }}
      >
        <Space>
          {props.title}
          <span
            style={{
              color: cssVars.secondaryTextColor
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
  )
}

export const Skin = memo(() => {
  const navigate = useNavigate();
  const refresh = useRefresh();

  const [state] = useReactive({
    name: 1
  })

  return (
    <FullSize
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

      <div>
        <Button
          onClick={() => {
            rApp.extension.activatedExtension(InnerExtensionNames.ThemeExtension, {});
          }}
        >
          启用主题插件
        </Button>
        <Button
          onClick={() => {
            rApp.extension.deactivatedExtension(InnerExtensionNames.ThemeExtension, {});
          }}
        >
          禁用主题插件
        </Button>
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
            backgroundColor: cssVars.primaryBackgroundColor,
            color: cssVars.primaryTextColor
          }}
        >
          1 级背景
        </div>
        <div
          style={{
            backgroundColor: cssVars.secondaryBackgroundColor,
            color: cssVars.secondaryTextColor
          }}
        >
          2 级背景
        </div>
        <div
          style={{
            backgroundColor: cssVars.thirdBackgroundColor,
            color: cssVars.placeholderTextColor
          }}
        >
          3 级背景
        </div>
        <div
          style={{
            backgroundColor: cssVars.fourthBackgroundColor
          }}
        >
          4 级背景
        </div>
      </StyleBlock>

      <StyleBlock title='文字颜色'>
        <div
          style={{
            backgroundColor: cssVars.secondaryBackgroundColor,
            color: cssVars.primaryTextColor
          }}
        >
          主要文本
        </div>
        <div
          style={{
            backgroundColor: cssVars.secondaryBackgroundColor,
            color: cssVars.secondaryTextColor
          }}
        >
          次要文本
        </div>
        <div
          style={{
            backgroundColor: cssVars.secondaryBackgroundColor,
            color: cssVars.placeholderTextColor
          }}
        >
          <Space>
            placeholder

            <Input placeholder='placeholder' style={{ width: '250px' }}></Input>
          </Space>
        </div>
        <div
          style={{
            backgroundColor: cssVars.secondaryBackgroundColor,
            color: cssVars.placeholderTextColor,
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
              style={{ color: cssVars.successMessageColor }}
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
              style={{ color: cssVars.warningMessageColor }}
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
              style={{ color: cssVars.errorMessageColor }}
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
  )
})


export default Skin;
