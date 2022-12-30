export type Report = {
  travelStarted: Date | null;
  travelEnded: Date | null;
  workStarted: Date | null;
  workEnded: Date | null;
  isAborted: boolean;
};

export const emptyReport: Report = {
  travelStarted: null,
  travelEnded: null,
  workStarted: null,
  workEnded: null,
  isAborted: false,
};
