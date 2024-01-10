export const ViewType = { LIST: 'list', CALENDAR: 'calendar' } as const;
export const DateType = { PAST: 'past', FUTURE: 'future', ALL: 'all' } as const;
export const ParticipationType = { ATTENDING: 'attending', ORGANIZING: 'organizing', ALL: 'all' } as const;

export type TViewType = (typeof ViewType)[keyof typeof ViewType];
export type TDateType = (typeof DateType)[keyof typeof DateType];
export type TParticipationType = (typeof ParticipationType)[keyof typeof ParticipationType];

export const VIEW_DEFAULT = ViewType.LIST;
export const DATE_DEFAULT = DateType.ALL;
export const PARTICIPATION_DEFAULT = ParticipationType.ALL;

export const QueryKey = {
  DATE: 'date',
  PARTICIPATION: 'participation',
  VIEW: 'view',
  SEARCH: 'search',
};
