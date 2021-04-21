import { genres } from '$common/utils';

export const menus = [
  {
    name: 'title',
    type: 'text',
    placeholder: 'Enter Title',
    title: 'Title',
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
  { name: 'composer', type: 'text', placeholder: 'Composer Name', title: 'Composer' },
  { name: 'releaseDate', type: 'date', placeholder: 'Release Date', title: 'Release Date' },
  { name: 'songWriter', type: 'text', placeholder: 'Enter Song Writer(s)', title: 'Song Writer(s)' },
  { name: 'recordLabel', type: 'text', placeholder: 'Enter Record Label', title: 'Record Label' },
];
