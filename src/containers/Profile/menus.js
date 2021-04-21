import { genres } from '$common/utils';

export const menus = [
  {
    name: 'fullName',
    type: 'text',
    placeholder: 'Enter Full Name',
    title: 'Full Name',
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter Email',
    title: 'Email',
  },
  {
    name: 'phoneNumber',
    type: 'text',
    placeholder: 'Enter Phone Number',
    title: 'Phone Number',
  },
  {
    name: 'genre',
    type: 'select',
    placeholder: 'Enter Genre',
    title: 'Genre',
    options: genres,
    isMulti: true,
  },
];

export const descriptionField = {
  name: 'description',
  type: 'area',
  placeholder: 'Biography',
  title: 'Description',
};

export const socials = [
  { name: 'fb', type: 'social', placeholder: 'Enter Facebook Link', icon: 'fb' },
  { name: 'instagram', type: 'social', placeholder: 'Enter Instagram Link', icon: 'instagram' },
  { name: 'yt', type: 'social', placeholder: 'Enter Youtube Link', icon: 'yt' },
  { name: 'twitter', type: 'social', placeholder: 'Enter Twitter Link', icon: 'twitter' },
];
