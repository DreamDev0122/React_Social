import { genres } from '$common/utils';

export const menus = [
  {
    name: 'artist',
    type: 'text',
    placeholder: 'Enter Artist Name',
    title: 'Artist',
  },
  {
    name: 'album',
    type: 'text',
    placeholder: 'Enter Album Title',
    title: 'Album',
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
    name: 'description',
    type: 'area',
    placeholder: 'Describe your track',
    title: 'Description',
  },
  {
    name: 'policy',
    type: 'checkbox',
    title: 'By uploading, you confirm that your sounds comply with our Terms of Use and you don\'t infringe anyone else\'s rights.'
  }
];

export const metamenus = [
  { name: 'publisher', type: 'text', placeholder: 'Publisher Name', title: 'Publisher' },
  { name: 'releaseDate', type: 'date', placeholder: 'Release Date', title: 'Release Date' },
  { name: 'recordLabel', type: 'text', placeholder: 'Enter Record Label', title: 'Record Label' },
  { name: 'location', type: 'text', placeholder: 'Enter Region', title: 'Region' },
  { name: 'country', type: 'text', placeholder: 'Enter Country', title: 'Country' },
];
