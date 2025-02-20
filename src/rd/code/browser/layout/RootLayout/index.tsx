
import { Outlet, useLocation } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { UnlockTwoTone, UserAddOutlined } from '@ant-design/icons';

import { Button, Popover } from 'antd';

import Widget from '@components/Widget';

const I18nChangeLanguageWidget = memo(() => {

  return (

    <>
      <Widget
        icon='UnderlineOutlined'
      >


      </Widget>

      <Widget
        icon='UnlockTwoTone'
      >

      </Widget>

      <Popover
        placement='bottom'
        content={(
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '8px'
              }}
            >
              <a
                href='https://www.google.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button
                  type='primary'
                >
                  <UserAddOutlined />
                  加入我们
                </Button>
              </a>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '8px'
              }}
            >

              <a
                href='https://www.google.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button
                  type='primary'
                >
                  <UnlockTwoTone
                    twoToneColor='#52c41a'
                  />
                  立即加入
                </Button>
              </a>
            </div>
          </div>
        )}
      >
        <Widget
          icon='MacCommandFilled'
        />
      </Popover>
    </>
  )
})

/**
 * 根组件的布局, 让每一个页面都受控于 ReactRouter
 * 可以利用本组件为整个 App 添加动画等.
 */
const RootLayout = memo(() => {
  return <Outlet />
})

export default RootLayout;
