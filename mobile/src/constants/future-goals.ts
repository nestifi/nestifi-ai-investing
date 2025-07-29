import {
  carImageUri,
  weddingImageUri,
  dreamsImageUri,
  collegeImageUri,
  houseImageUri,
  travelImageUri
} from '@/constants/images';

export interface FutureGoal {
  id: number;
  name: string;
  image: string;
}

export const FUTURE_GOALS: FutureGoal[] = [
  {
    id: 0,
    name: 'College',
    image: collegeImageUri
  },
  {
    id: 1,
    name: 'Travel',
    image: travelImageUri
  },
  {
    id: 2,
    name: 'House',
    image: houseImageUri
  },
  {
    id: 3,
    name: 'Wedding',
    image: weddingImageUri
  },
  {
    id: 4,
    name: 'Dreams',
    image: dreamsImageUri
  },
  {
    id: 5,
    name: 'Car',
    image: carImageUri
  }
];
