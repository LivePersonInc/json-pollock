import Ajv from 'ajv';
import actionSchema from './schema/action.json';
import basicSchema from './schema/basic.json';
import styleSchema from './schema/style.json';
import buttonSchema from './schema/button.json';
import cardSchema from './schema/card.json';
import carouselSchema from './schema/carousel.json';
import carouselSelectSchema from './schema/carouselSelect.json';
import imagelSchema from './schema/image.json';
import linkPreviewSchema from './schema/linkPreview.json';
import mapSchema from './schema/map.json';
import richContentSchema from './schema/rich_content.json';
import templateSchema from './schema/template.json';
import textSchema from './schema/text.json';
import checkBoxSchema from './schema/checkbox.json';
import listSchema from './schema/list.json';
import checkListSchema from './schema/checklist.json';
import submitButtonSchema from './schema/submitButton.json';
import sectionSchema from './schema/section.json';
import sectionListSchema from './schema/sectionList.json';
import specialActionSchema from './schema/specialAction.json';
import buttonListSchema from './schema/buttonList.json';
import keyValuePairSchema from './schema/keyValuePair.json';
import displaySettingsSchema from './schema/displaySettings.json';
import accessibilityWeb from './schema/accessibilityWeb.json';
import scheduleSlot from './schema/scheduleSlot.json';
import keyValuePairList from './schema/keyValuePairList.json';

export default class SchemaValidator {

  jsonValidator: Ajv;

  constructor() {
    const ajv = new Ajv({ format: 'full', unknownFormats: 'ignore', verbose: true, logger: false });
    ajv.addSchema(actionSchema, 'action.json');
    ajv.addSchema(basicSchema, 'basic.json');
    ajv.addSchema(styleSchema, 'style.json');
    ajv.addSchema(buttonSchema, 'button.json');
    ajv.addSchema(checkBoxSchema, 'checkbox.json');
    ajv.addSchema(cardSchema, 'card.json');
    ajv.addSchema(carouselSchema, 'carousel.json');
    ajv.addSchema(carouselSelectSchema, 'carouselSelect.json');
    ajv.addSchema(imagelSchema, 'image.json');
    ajv.addSchema(linkPreviewSchema, 'linkPreview.json');
    ajv.addSchema(mapSchema, 'map.json');
    ajv.addSchema(richContentSchema, 'rich_content.json');
    ajv.addSchema(templateSchema, 'template.json');
    ajv.addSchema(textSchema, 'text.json');
    ajv.addSchema(listSchema, 'list.json');
    ajv.addSchema(checkListSchema, 'checklist.json');
    ajv.addSchema(submitButtonSchema, 'submitButton.json');
    ajv.addSchema(sectionSchema, 'section.json');
    ajv.addSchema(sectionListSchema, 'sectionList.json');
    ajv.addSchema(buttonListSchema, 'buttonList.json');
    ajv.addSchema(specialActionSchema, 'specialAction.json');
    ajv.addSchema(keyValuePairSchema, 'keyValuePair.json');
    ajv.addSchema(displaySettingsSchema, 'displaySettings.json');
    ajv.addSchema(accessibilityWeb, 'accessibilityWeb.json');
    ajv.addSchema(scheduleSlot, 'scheduleSlot.json');
    ajv.addSchema(keyValuePairList, 'keyValuePairList.json');

    this.jsonValidator = ajv.compile(richContentSchema);
  }

  validate(json) {
    const valid = this.jsonValidator(json);

    return {
      valid,
      errors: valid ? this.jsonValidator.errors : undefined,
    };
  }
}
