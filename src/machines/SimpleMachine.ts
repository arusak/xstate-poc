import { createMachine, assign } from 'xstate';
import { emptyReport } from 'types/report';
import { MachineContext, MachineEvent, MachineState } from 'types/machine';

export const simpleMachine = createMachine<MachineContext, MachineEvent, MachineState>(
  {
    predictableActionArguments: true,
    initial: 'Not started',
    context: { report: { ...emptyReport } },
    states: {
      'Not started': {
        on: {
          'START TRAVEL': 'Travel started',
        },
        entry: ['resetReport'],
      },
      'Travel started': {
        on: {
          'END TRAVEL': 'Travel ended',
        },
        entry: (ctx) => (ctx.report.travelStarted = new Date()),
      },
      'Travel ended': {
        on: {
          'START WORK': 'Work started',
          'ABORT TASK': 'Task aborted',
        },
        entry: (ctx) => (ctx.report.travelEnded = new Date()),
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
      'Task aborted': {
        on: {
          COMPLETE: 'Not started',
        },
        entry: (ctx) => (ctx.report.isAborted = true),
      },
    },
  },
  {
    actions: {
      resetReport: assign(() => ({
        report: { ...emptyReport },
      })),
    },
  },
);
