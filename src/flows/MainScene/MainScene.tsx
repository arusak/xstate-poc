import { FC, memo } from 'react';
import { useMachine } from '@xstate/react';
import { simpleMachine } from 'machines/SimpleMachine';
import { Button } from '@mui/material';
import { TimeStep } from 'components/TimeStep';
import { StateMachine } from 'xstate';
import { MachineEventType, MachineStateName } from 'types/machine';
import styled from '@emotion/styled';

type Props = { machine: StateMachine<any, any, any> };

const buttonsData: Record<MachineStateName, { label: string; action: MachineEventType }[]> = {
  'Not started': [{ label: 'Start new travel', action: 'START TRAVEL' }],
  'Travel started': [{ label: 'End travel', action: 'END TRAVEL' }],
  'Travel ended': [
    { label: 'Start work', action: 'START WORK' },
    { label: 'Abort task', action: 'ABORT TASK' },
  ],
  'Work started': [{ label: 'End work', action: 'END WORK' }],
  'Work ended': [{ label: 'Confirm', action: 'COMPLETE' }],
  'Task aborted': [{ label: 'Start over', action: 'COMPLETE' }],
};

const MainScene: FC<Props> = ({}) => {
  const [state, send] = useMachine(simpleMachine);
  const { context, value } = state;
  const { report } = context;

  const buttons = buttonsData[value as MachineStateName];

  const ButtonContainer = styled.div`
    margin: auto 0 0 0;
  `;

  const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `;

  return (
    <Wrapper>
      {report.workEnded && <TimeStep value={report.workEnded}>Work end</TimeStep>}
      {report.workStarted && <TimeStep value={report.workStarted}>Work start</TimeStep>}
      {report.travelEnded && <TimeStep value={report.travelEnded}>Travel end</TimeStep>}
      {report.travelStarted && <TimeStep value={report.travelStarted}>Travel start</TimeStep>}

      <ButtonContainer>
        {buttons.map(({ action, label }) => (
          <Button onClick={() => send(action)}>{label}</Button>
        ))}
      </ButtonContainer>
    </Wrapper>
  );
};

export default memo(MainScene);
