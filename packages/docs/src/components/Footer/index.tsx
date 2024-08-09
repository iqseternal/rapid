
import { combinationStyled, FlexRowCenter, FullSizeWidth } from '@rapid/libs-web/styled';

import Subfield from '@rapid/libs-web/components/Subfield';

import React from 'react';

import styles from './index.module.scss';

export default function Footer() {



  return <FlexRowCenter className={styles.footer}>
    <Subfield>
      <FlexRowCenter>
        1
      </FlexRowCenter>
      <FlexRowCenter>
        2
      </FlexRowCenter>
      <FlexRowCenter>
        3
      </FlexRowCenter>
    </Subfield>
  </FlexRowCenter>;
}
