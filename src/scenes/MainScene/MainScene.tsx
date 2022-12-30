import { FC, memo } from 'react';
import { useMachine } from '@xstate/react';
import { Button } from '@mui/material';
import { TimeStep } from 'components/TimeStep';
import { StateMachine } from 'xstate';
import { MachineEventType, MachineStateName, MachineContext, MachineEvent, MachineState } from 'types/machine';
import styled from '@emotion/styled';
import { DF } from 'utils/DateFormatter';
import { intervalToDuration } from 'date-fns';

type Props = { machine: StateMachine<MachineContext, MachineState, MachineEvent> };

const buttonsData: Record<MachineStateName, { label: string; action: MachineEventType }[]> = {
  'Not started': [{ label: 'Start new travel', action: 'START TRAVEL' }],
  'Travel started': [{ label: 'End travel', action: 'END TRAVEL' }],
  'Travel ended': [
    { label: 'Abort task', action: 'ABORT TASK' },
    { label: 'Start work', action: 'START WORK' },
  ],
  'Work started': [{ label: 'End work', action: 'END WORK' }],
  'Work ended': [{ label: 'Confirm', action: 'COMPLETE' }],
  'Task aborted': [{ label: 'Start over', action: 'COMPLETE' }],
};

const MainScene: FC<Props> = ({ machine }) => {
  const [state, send] = useMachine(machine);
  const { context, value } = state;
  const { report } = context;

  const buttons = buttonsData[value as MachineStateName];

  const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;

  return (
    <Wrapper>
      <div>
        {report.travelStarted && <TimeStep value={report.travelStarted}>Travel start</TimeStep>}
        {report.travelEnded && <TimeStep value={report.travelEnded}>Travel end</TimeStep>}
        {report.workStarted && <TimeStep value={report.workStarted}>Work start</TimeStep>}
        {report.workEnded && <TimeStep value={report.workEnded}>Work end</TimeStep>}
      </div>

      {report.isAborted && <h1>Task is aborted</h1>}

      {state.matches('Not started') && <h1>You are ready to go</h1>}
      {state.matches('Work ended') && <h1>Task is complete</h1>}
      {state.matches('Travel started') && report.travelStarted && (
        <h1>Travelling: {DF.formatDuration(intervalToDuration({ start: report.travelStarted, end: new Date() }))}</h1>
      )}
      {state.matches('Travel ended') && <h1>You arrived</h1>}
      {state.matches('Work started') && report.workStarted && (
        <h1>Working: {DF.formatDuration(intervalToDuration({ start: report.workStarted, end: new Date() }))}</h1>
      )}

      <ButtonContainer>
        {buttons.map(({ action, label }) => (
          <Button key={label} onClick={() => send(action)}>
            {label}
          </Button>
        ))}
      </ButtonContainer>
    </Wrapper>
  );
};

export default memo(MainScene);
