import { useEffect, useRef } from 'react';

import { AfterFeatures } from '../src/components/Home';
import Footer from '../src/components/Footer';

import Theme from 'rspress/theme';

// 以下展示所有的 Props
const Layout = () => {

  return (
    <Theme.Layout
      /* Home 页 Hero 部分之前 */
      beforeHero={<div />}
      /* Home 页 Hero 部分之后 */
      afterHero={<div />}
      /* Home 页 Features 部分之前 */
      beforeFeatures={<div />}
      /* Home 页 Features 部分之后 */
      afterFeatures={<AfterFeatures />}

      /* 正文页 Footer 部分之前 */
      beforeDocFooter={<hr />}
      /* 正文页 Footer 部分之后 */
      afterDocFooter={<div />}

      /* 正文页最前面 */
      beforeDoc={<div style={{ width: '1.5rem' }} />}
      /* 正文页最后面 */
      afterDoc={<div style={{ width: '1.5rem' }} />}
      /* 文档内容前面 */
      beforeDocContent={<div />}
      /* 文档内容后面 */
      afterDocContent={<div />}
      /* 导航栏之前 */
      beforeNav={<div />}
      /* 左上角导航栏标题之前 */
      beforeNavTitle={<span />}
      /* 左上角导航栏标题之后 */
      afterNavTitle={<div style={{ width: '3rem' }} />}
      /* 导航栏右上角部分 */
      afterNavMenu={<div />}
      /* 左侧侧边栏上面 */
      beforeSidebar={<div />}
      /* 左侧侧边栏下面 */
      afterSidebar={<div />}
      /* 右侧大纲栏上面 */
      beforeOutline={<div />}
      /* 右侧大纲栏下面 */
      afterOutline={<div />}


      /* 整个页面最顶部 */
      top={<div />}
      /* 整个页面最底部 */
      bottom={<Footer />}
    />
  );
}

export default {
  ...Theme,
  Layout,
};

export * from 'rspress/theme';
