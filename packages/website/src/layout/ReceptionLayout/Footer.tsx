import { Space } from 'antd';
import { Link } from 'react-router-dom';
import { PhoneFilled } from '@ant-design/icons';
import { Subfield, SubfieldCloumn } from '@/components/Subfield';
import {
  FlexRowAround, FlexRowStart, FlexColumn, FlexRowBetween,
  combinationStyled, AppAdapter,
  MaxScreenWidth,
  FullSizeWidth
} from '@rapid/libs-web/styled';
import { useTranslation } from 'react-i18next';

import styles from './footer.module.scss';

import Logo from '@components/Logo';
import IconFont from '@components/IconFont';

const FooterContainer = combinationStyled('footer', FullSizeWidth, AppAdapter);
const FooterSubContainer = combinationStyled('div', FullSizeWidth, MaxScreenWidth);

export default function Footer() {

  return <FooterContainer className={styles.receptionFooterContainer}>
    <FooterSubContainer className={styles.receptionSubContainer}>
      <Subfield>
        {/* <Logo size={40} /> */}
      </Subfield>

      <Subfield style={{ alignItems: 'flex-start', marginTop: '30px' }}>
        <SubfieldCloumn className={styles.footerOptions}>
          <h3>快速开始</h3>

          <Link to='https://www.peterx.cn/#term-651' target='_blank'>Peterx</Link>
          <Link to='https://www.nerdfonts.com/font-downloads' target='_blank'>Nerdfonts</Link>
        </SubfieldCloumn>

        <SubfieldCloumn className={styles.footerOptions}>
          <h3>开发</h3>

          <Link to='https://nestjs.com/' target='_blank'>Nestjs</Link>
          <Link to='https://www.electronjs.org/docs/latest/tutorial/quick-start' target='_blank'>Electron</Link>
          <Link to='https://crawlee.dev/api/jsdom-crawler/class/JSDOMCrawler' target='_blank'>Crawlee</Link>
          <Link to='https://developer.huawei.com/consumer/cn/codelabsPortal/home' target='_blank'>ArkTs</Link>
        </SubfieldCloumn>

        <SubfieldCloumn className={styles.footerOptions}>
          <h3>推荐</h3>

          <Link to='https://code.visualstudio.com/' target='_blank'>工具 (code)</Link>
          <Link to='https://learn.microsoft.com/zh-cn/docs/' target='_blank'>微软文档</Link>
          <Link to='https://docs.chocolatey.org/en-us/getting-started' target='_blank'>Chocolatey</Link>
        </SubfieldCloumn>

        <SubfieldCloumn className={styles.footerOptions}>
          <h3>链接</h3>

          <Link to='https://github.com/iqseternal' target='_blank'>
            <IconFont type='GithubOutlined' />
            <span>&nbsp;Github&nbsp;</span>
          </Link>
          <Link to='https://iqseternal.github.io/suey-rocketry/en/' target='_blank'>
            <IconFont type='RocketOutlined' />
            <span>&nbsp;Rocktry</span>
          </Link>
          <Link to='https://github.com/iqseternal/suey-rokcetry' target='_blank'>
            <IconFont type='PrinterOutlined' />
            <span>&nbsp;Printer&nbsp;</span>
          </Link>
        </SubfieldCloumn>
      </Subfield>

      <Subfield style={{ marginTop: '30px', borderTop: '1px solid rgba(0, 0, 0, .2)', paddingTop: '50px' }}>
        <SubfieldCloumn gap='30px' style={{ alignItems: 'flex-start' }}>
          <Space size={25}>
            <Link to='#'>隐私</Link>
            <Link to='#'>Cookie</Link>
            <Link to='#'>关于本站</Link>
          </Space>

          <Space direction='vertical'>
            <div>欢迎访问</div>
            <div>上述内容</div>
          </Space>
        </SubfieldCloumn>
        <div>

        </div>
      </Subfield>

      <Subfield style={{ marginTop: '30px' }}>
        <div />
        <Space>
          <Link to='https://beian.miit.gov.cn/' target='_blank'>蜀ICP备2021032446号-2</Link>
          <span>
            &nbsp;
          </span>
        </Space>
        <div />
      </Subfield>
    </FooterSubContainer>
  </FooterContainer>
}
