import { postImage } from '../api/imageApi';
import type { ResultContainer } from '../api/httpClient/ResultContainer';
import type { TAgendaItem, TMeetup } from 'src/types';
import { postMeetup, putMeetup } from '../api/meetupsApi';

let lastMeetupId = 0;
/**
 * @return {Meetup}
 */
export function createMeetup(organizer: string): TMeetup {
  return {
    id: --lastMeetupId,
    title: '',
    description: '',
    imageId: undefined,
    image: undefined,
    date: +new Date().setUTCHours(0, 0, 0, 0),
    place: '',
    agenda: [],
    attending: false,
    organizing: true,
    organizer,
  };
}

let lastAgendaItemId = 0;
export function createAgendaItem(): TAgendaItem {
  return {
    id: --lastAgendaItemId,
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: undefined,
    description: undefined,
    speaker: undefined,
    language: undefined,
  };
}

export const saveMeetupWithImage = async (
  meetup: TMeetup,
  saveFn: (m: TMeetup) => Promise<ResultContainer<TMeetup>>,
  file?: File,
): Promise<ResultContainer<TMeetup>> => {
  if (!file) {
    return saveFn(meetup);
  }

  const imageResult = await postImage(file);
  const { image, id } = imageResult.success ? imageResult.data : { image: undefined, id: undefined };
  return saveFn({ ...meetup, image, imageId: id });
};

export const postMeetupWithImage = async (meetup: TMeetup, file?: File): Promise<ResultContainer<TMeetup>> => {
  return saveMeetupWithImage(meetup, postMeetup, file);
};

export const putMeetupWithImage = async (meetup: TMeetup, file?: File): Promise<ResultContainer<TMeetup>> => {
  return saveMeetupWithImage(meetup, putMeetup, file);
};
