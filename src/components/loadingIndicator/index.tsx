import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const LoadingIndicator: React.FC = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <Container>
      <th>
        {promiseInProgress && <Loader type="ThreeDots" color="#005271" />}
      </th>
    </Container>
  );
};

const Container = styled.tr`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LoadingIndicator;
