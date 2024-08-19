import { Flex, combinationStyled } from '@rapid/libs-web/styled';

import { logoUrl } from '@/assets';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function Logo(props: BaseProps & { size?: number;src?: string;onClick?: () => void; }) {

  const size = props.size ?? 20;
  const src = props.src ?? logoUrl;


  return <Flex {...props} style={{ width: size + 'px', height: size + 'px' }} onClick={props.onClick}>
    <Image src={src} />
  </Flex>
}
