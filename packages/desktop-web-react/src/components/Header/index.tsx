import { FullSizeWidth } from '@/styled';
import { combinationCName } from '@rapid/libs/common';
import { windowClose, windowDevtool, windowMin, windowReduction, windowRelaunch } from '@/actions';
import { Subfield, SubfieldFixed } from '@rapid/libs/components/Subfield';
import { IS_WEB, IS_DEV } from '@rapid/config/constants';
import { makeVar, themeCssVarsSheet } from '@/themes';

import Widget from '@components/Widget';
import Logo from '@components/Logo';
import commonStyles from '@scss/common/index.module.scss';
import styles from './index.module.scss';

export interface HeaderProps extends BaseProps {
  // 是否是一个面板
  isPane?: boolean;
  // 是否是一个弹窗
  isDialog?: boolean;

  slots?: {

  }
}

export default function Header(props: HeaderProps) {
  const { isDialog = false, isPane = false, slots } = props;

  return <Subfield
    className={combinationCName(styles.header, commonStyles.appRegion, props.className)}
    onDoubleClick={() => windowRelaunch()}
  >
    <Subfield>
      <Logo />
    </Subfield>
    <Subfield>

    </Subfield>

    <Subfield>
      <div />
      <div />

      <SubfieldFixed className={commonStyles.appRegionNo} gap={1}>
        {!IS_WEB && <>
          {IS_DEV && <Widget icon='BugOutlined' tipText='开发者工具' onClick={() => windowDevtool(true)} />}
          <Widget icon='LineOutlined' tipText='最小化' onClick={() => windowMin()} />
          {!isDialog && !isPane && <Widget icon='BorderOutlined' tipText='还原' onClick={() => windowReduction()} />}
          <Widget icon='CloseOutlined' tipText='关闭' onClick={() => windowClose()} />
        </>}
      </SubfieldFixed>
    </Subfield>
  </Subfield>
}
