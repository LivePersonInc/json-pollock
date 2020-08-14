/* eslint-disable global-require */
const allTemplates = [
  {
    types: ['web'],
    name: 'All Elements (Default)',
    description: 'A template with all available elements',
    content: require('./defaultContent.json'),
  },
  {
    types: ['web', 'fb'],
    name: 'Facebook',
    description: 'A simple vertical Facebook card, containing an image, a title, a subtitle and two buttons. Remember to whitelist all the included domains for this to work on your account!',
    content: require('./FbCard.json'),
  },
  {
    types: ['web', 'line'],
    name: 'LINE',
    description: 'A simple vertical Line card, containing an image, a title, a subtitle and a button. Remember to whitelist all the included domains for this to work on your account!',
    content: require('./lineCard.json'),
  },
  {
    types: ['web', 'rcs'],
    name: 'RCS Business Messaging',
    description: 'A simple vertical RBM card, containing an image, a title, a subtitle and two buttons. Remember to whitelist all the included domains for this to work on your account!',
    content: require('./RbmCard.json'),
  },
  {
    types: ['web', 'abc'],
    name: 'Apple Business Chat',
    description: 'A simple vertical ABC card, containing an image, a title, a subtitle and two buttons. Remember to whitelist all the included domains for this to work on your account!',
    content: require('./rcVerticalCardAbc.json'),
  },
];

export const defaultTemplate = allTemplates[0];

export default allTemplates;
