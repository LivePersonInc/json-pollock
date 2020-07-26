/* eslint-disable global-require */
const allTemplates = [
  {
    types: ['web'],
    name: 'All Elements (Default)',
    description: 'A template with all available elements',
    content: require('./defaultContent.json'),
  },
  {
    types: ['fb'],
    name: 'FB Carousel with Complex Cards',
    description: 'A Rich Content Message containing a Carousel with one vertical and one horizontal card. Each card contains a Button, Image, Map and Text component inside. Adjusted to run in FB. (s. comment for adjustments)',
    content: require('./rcCarouselComplex.json'),
  },
];

export const defaultTemplate = allTemplates[0];

export default allTemplates;
