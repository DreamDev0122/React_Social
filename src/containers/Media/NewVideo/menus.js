import { genres } from '$common/utils';

export const menus = [
  {
    name: 'title',
    type: 'text',
    placeholder: 'Enter Title',
    title: 'Title',
  },
  {
    name: 'director',
    type: 'text',
    placeholder: 'Enter Director',
    title: 'Director',
  },
  {
    name: 'starring',
    type: 'text',
    placeholder: 'Enter Cast Names',
    title: 'Starring',
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
    name: 'productionCompany',
    type: 'text',
    placeholder: 'Enter Production Company',
    title: 'Production Company',
  },
  {
    name: 'startingDate',
    type: 'date',
    placeholder: 'Starting Date',
    title: 'Starting Date',
  },
];

export const descriptionMenu = {
  name: 'description',
  type: 'area',
  placeholder: 'Enter Description',
  title: 'Description'
};
