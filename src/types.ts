export const ViewType = { LIST: 'list', CALENDAR: 'calendar' } as const;
export const DateType = { PAST: 'past', FUTURE: 'future', ALL: 'all' } as const;
export const ParticipiantType = { ATTENDING: 'attending', ORGANIZING: 'organizing', ALL: 'all' } as const;

export type TViewType = (typeof ViewType)[keyof typeof ViewType];
export type TDateType = (typeof DateType)[keyof typeof DateType];
export type TParticipiantType = (typeof ParticipiantType)[keyof typeof ParticipiantType];

export const VIEW_DEFAULT = ViewType.LIST;
export const DATE_DEFAULT = DateType.ALL;
export const PARTICIPIANT_DEFAULT = ParticipiantType.ALL;
