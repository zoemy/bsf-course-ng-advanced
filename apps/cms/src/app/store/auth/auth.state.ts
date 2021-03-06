import { User } from '../../models';

export const authFeatureName = 'auth';
export interface AuthState {
  user: User;
  isLogged: boolean;
}

export const initalState: AuthState = {
  isLogged: true,
  user: {
    firstName: 'Belatrix user',
    lastName: 'From Store',
    description: 'default user form store',
    facebook: 'facebook',
    instagram: 'instagram',
    twitter: 'twitter',
    website: 'website',
    photoUrl:
      'https://m.media-amazon.com/images/S/aplus-media/mg/dbf4301f-af40-46f2-9a87-a99deddcd9a2._SL300__.jpg'
  }
};
