import { Report } from 'types/report';

export type MachineContext = {
  report: Report;
};

export type MachineState = { context: MachineContext } & (
  | { value: 'Not started' }
  | { value: 'Travel started' }
  | { value: 'Travel ended' }
  | { value: 'Work started' }
  | { value: 'Work ended' }
  | { value: 'Task aborted' }
);

export type MachineStateName = MachineState['value'];

export type MachineEvent =
  | { type: 'START TRAVEL' }
  | { type: 'END TRAVEL' }
  | { type: 'START WORK' }
  | { type: 'END WORK' }
  | { type: 'ABORT TASK' }
  | { type: 'COMPLETE' };

export type MachineEventType = MachineEvent['type'];
