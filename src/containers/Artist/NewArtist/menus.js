import { genres } from '$common/utils';

export const menus = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Enter Artist Name',
    title: 'Artist Name',
  },
  {
    name: 'genre',
    type: 'select',
    placeholder: 'Enter Genre',
    title: 'Genre',
    options: genres,
    isMulti: true,
  },
  {
    name: 'about',
    type: 'area',
    placeholder: 'Biography',
    title: 'About',
  },
  {
    name: 'phoneNumber',
    type: 'text',
    placeholder: 'Enter Phone Number',
    title: 'Phone Number',
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter Email Address',
    title: 'Email Address',
  },
  {
    name: 'policy',
    type: 'checkbox',
    title: 'By uploading, you confirm that your sounds comply with our Terms of Use and you don\'t infringe anyone else\'s rights.'
  }
];

export const metamenus = [
  { name: 'publisher', type: 'text', placeholder: 'Publlisher Name', title: 'Publish' },
 { name: 'releaseDate', type: 'date', placeholder: 'Release Date', title: 'Release Date' },
  { name: 'recordingLabel', type: 'text', placeholder: 'Recording Label', title: 'Record Label' },
  { name: 'region', type: 'text', placeholder: 'Enter Region', title: 'Region' },
  { name: 'country', type: 'text', placeholder: 'Enter Country Name', title: 'Country' },
  { name: 'fb', type: 'social', placeholder: 'Enter Facebook Link', icon: 'fb' },
  { name: 'instagram', type: 'social', placeholder: 'Enter Instagram Link', icon: 'instagram' },
  { name: 'yt', type: 'social', placeholder: 'Enter Youtube Link', icon: 'yt' },
  { name: 'twitter', type: 'social', placeholder: 'Enter Twitter Link', icon: 'twitter' },
];
