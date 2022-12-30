import { createMachine, assign } from 'xstate';
import { emptyReport } from 'types/report';
import { MachineContext, MachineEvent, MachineState } from 'types/machine';

export const photosMachine = createMachine<MachineContext, MachineEvent, MachineState>({
  initial: 'Not started',
  context: { report: emptyReport },
  states: {
    'Not started': {
      on: {
        'START TRAVEL': 'Travel started',
      },
      entry: assign({ report: emptyReport }),
    },
    'Work started': {
      on: {
        'END WORK': 'Work ended',
      },
      entry: (ctx) => (ctx.report.workStarted = new Date()),
    },
    'Work ended': {
      on: {
        COMPLETE: 'Not started',
      },
      entry: (ctx) => (ctx.report.workEnded = new Date()),
    },
  },
});
