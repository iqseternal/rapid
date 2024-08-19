import { combinationCName } from '@libs/common';
import type { FC, ReactNode } from 'react';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FlexRowCenter } from '@rapid/libs-web/styled';
import styled from 'styled-components';
import styles from './index.module.scss';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


/**
 * 元素内容被加载动画包裹
 * @param props
 */
export default function LoadingContent(props: { loading: boolean;loadingText?: string;children?: ReactNode; }) {

  const {
    loading = true,
    loadingText = '加载中'
  } = props;

  if (loading) {
    return <LoadingContainer className={combinationCName(styles.fullSize)}>
      <Space>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        <span>{loadingText}</span>
      </Space>
    </LoadingContainer>
  }

  return <>{props.children}</>;
}
