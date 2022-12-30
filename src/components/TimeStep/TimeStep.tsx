import { FC, memo, PropsWithChildren } from 'react';
import { DF } from 'utils/DateFormatter';
import styled from '@emotion/styled';

type Props = {
  value: Date;
};

const Wrapper = styled.div`
  border-radius: 1rem;
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 0 0 0.25rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
`;

const TimeStep: FC<PropsWithChildren<Props>> = ({ value, children }) => {
  return (
    <Wrapper>
      <div>{DF.formatTime(value)}</div>
      <div>{children}</div>
    </Wrapper>
  );
};

export default memo(TimeStep);
