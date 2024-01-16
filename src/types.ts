export type TMeetup = {
  id: number;
  title: string;
  description: string;
  imageId?: number;
  image?: string;
  date: number;
  organizer: string;
  place: string;
  agenda: TAgendaItem[];
  attending: boolean;
  organizing: boolean;
};

export type TAgendaItem = {
  id: number;
  startsAt: string;
  endsAt: string;
  type: TAgendaItemType;
  title?: string;
  description?: string;
  speaker?: string;
  language?: string;
};

export type TAgendaItemType =
  | 'registration'
  | 'opening'
  | 'talk'
  | 'break'
  | 'coffee'
  | 'closing'
  | 'afterparty'
  | 'other';

export type TAgendaDict = { [k in TAgendaItemType]: string };

export type TUser = {
  id: number;
  email: string;
  fullname: string;
  avatar: string;
};

export type TImageDto = { id?: number; image?: string };
