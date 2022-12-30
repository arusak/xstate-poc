import { FC, memo } from 'react';

import { Flow } from 'types/flow';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

type Props = {
  onSelect: (flow: Flow) => void;
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChooseFlow: FC<Props> = ({ onSelect }) => {
  return (
    <Wrapper>
      <h1>Please select your workflow</h1>
      <Button onClick={() => onSelect('photos')}>Workflow with photo upload</Button>
      <Button onClick={() => onSelect('simple')}>Simple workflow</Button>
    </Wrapper>
  );
};

export default memo(ChooseFlow);
