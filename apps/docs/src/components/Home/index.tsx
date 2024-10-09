import { FullSizeWidth, combinationStyled, maxScreenHeightStyle, maxViewHeightStyle } from '@rapid/libs-web/styled';
import { css } from 'styled-components';

import { ReactNode } from 'react';

const FeaturesSectionContainer = combinationStyled('section', FullSizeWidth, css`
  /* height: 100vh; */
  height: max-content;
  background: conic-gradient(from 90deg at -10% 100%, var(--rp-c-bg-mute) 0deg, var(--rp-c-bg-mute) 90deg, var(--rp-c-bg) 1turn);
  mix-blend-mode: multiply;
`);

const FeaturesSection = (props: {
  title: string;
  className?: string;
  children?: ReactNode;
}) => {
  const { title, ...realProps } = props;


  return <FeaturesSectionContainer {...realProps}>


  </FeaturesSectionContainer>
}

export function AfterFeatures() {


  return <FullSizeWidth
    style={{
      marginTop: '6rem'
    }}
  >
    <FeaturesSection title=''>
111
    </FeaturesSection>

  </FullSizeWidth>;
}
