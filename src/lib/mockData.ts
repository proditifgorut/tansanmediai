import { faker } from '@faker-js/faker';
import { Mic, Music, Headphones } from 'lucide-react';

export type ProjectType = 'tts' | 'music' | 'cover';

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  date: string;
  duration: string;
  icon: React.ElementType;
  color: string;
}

// Using multiple audio files to make generation feel more dynamic
const mockAudioUrls = [
  'https://ia802508.us.archive.org/28/items/cd_mozart-piano-sonatas_wolfgang-amadeus-mozart-lili-kraus/disc1/01.11-PianoSonataInC-MajorK.545-1.Allegro_sample.mp3',
  'https://ia800501.us.archive.org/11/items/cd_j-s-bach-the-two-part-inventions_glenn-gould/disc1/01.J.S.BachInventionNo.1InC-MajorBwv772_sample.mp3',
  'https://ia902606.us.archive.org/13/items/cd_beethoven-piano-sonatas_wilhelm-kempff/disc1/01.PianoSonataNo.8InC-MinorOp.13Pathetique-1.Grave-AllegroDiMoltoEConBrio_sample.mp3',
  'https://archive.org/download/test-mp3-file/test.mp3'
];

export const getRandomAudioUrl = (): string => {
  return faker.helpers.arrayElement(mockAudioUrls);
};

export interface Voice {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  age: 'Young' | 'Adult' | 'Mature';
  style: string;
  lang: string;
  sampleUrl: string;
}

export const allVoices: Voice[] = [
  // Indonesian Voices
  { id: 'budi', name: 'Budi', gender: 'Male', age: 'Adult', style: 'Professional', lang: 'id', sampleUrl: 'https://archive.org/download/test-mp3-file/test.mp3' },
  { id: 'wati', name: 'Wati', gender: 'Female', age: 'Adult', style: 'Friendly', lang: 'id', sampleUrl: 'https://ia800501.us.archive.org/11/items/cd_j-s-bach-the-two-part-inventions_glenn-gould/disc1/01.J.S.BachInventionNo.1InC-MajorBwv772_sample.mp3' },
  { id: 'joko', name: 'Joko', gender: 'Male', age: 'Young', style: 'Casual', lang: 'id', sampleUrl: 'https://archive.org/download/test-mp3-file/test.mp3' },
  { id: 'siti', name: 'Siti', gender: 'Female', age: 'Mature', style: 'Narrator', lang: 'id', sampleUrl: 'https://ia800501.us.archive.org/11/items/cd_j-s-bach-the-two-part-inventions_glenn-gould/disc1/01.J.S.BachInventionNo.1InC-MajorBwv772_sample.mp3' },
  { id: 'agus', name: 'Agus', gender: 'Male', age: 'Adult', style: 'Formal', lang: 'id', sampleUrl: 'https://archive.org/download/test-mp3-file/test.mp3' },
  // English Voices
  { id: 'sarah', name: 'Sarah', gender: 'Female', age: 'Young', style: 'Natural', lang: 'en', sampleUrl: 'https://ia902606.us.archive.org/13/items/cd_beethoven-piano-sonatas_wilhelm-kempff/disc1/01.PianoSonataNo.8InC-MinorOp.13Pathetique-1.Grave-AllegroDiMoltoEConBrio_sample.mp3' },
  { id: 'john', name: 'John', gender: 'Male', age: 'Adult', style: 'Professional', lang: 'en', sampleUrl: 'https://ia802508.us.archive.org/28/items/cd_mozart-piano-sonatas_wolfgang-amadeus-mozart-lili-kraus/disc1/01.11-PianoSonataInC-MajorK.545-1.Allegro_sample.mp3' },
  { id: 'emma', name: 'Emma', gender: 'Female', age: 'Adult', style: 'Cheerful', lang: 'en', sampleUrl: 'https://ia902606.us.archive.org/13/items/cd_beethoven-piano-sonatas_wilhelm-kempff/disc1/01.PianoSonataNo.8InC-MinorOp.13Pathetique-1.Grave-AllegroDiMoltoEConBrio_sample.mp3' },
  { id: 'david', name: 'David', gender: 'Male', age: 'Mature', style: 'Narrator', lang: 'en', sampleUrl: 'https://ia802508.us.archive.org/28/items/cd_mozart-piano-sonatas_wolfgang-amadeus-mozart-lili-kraus/disc1/01.11-PianoSonataInC-MajorK.545-1.Allegro_sample.mp3' },
];


export const generateMockProjects = (count: number): Project[] => {
  const types: ProjectType[] = ['tts', 'music', 'cover'];
  const icons = { tts: Mic, music: Music, cover: Headphones };
  const colors = { tts: 'text-blue-400', music: 'text-purple-400', cover: 'text-green-400' };

  return Array.from({ length: count }, () => {
    const type = faker.helpers.arrayElement(types);
    return {
      id: faker.string.uuid(),
      name: faker.lorem.words(3),
      type: type,
      date: faker.date.recent({ days: 30 }).toLocaleDateString(),
      duration: `${faker.number.int({ min: 1, max: 5 })}:${faker.number.int({ min: 10, max: 59 }).toString().padStart(2, '0')}`,
      icon: icons[type],
      color: colors[type],
    };
  });
};
