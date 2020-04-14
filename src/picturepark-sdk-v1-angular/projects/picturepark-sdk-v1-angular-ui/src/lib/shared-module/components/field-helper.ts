import {
  FieldBase,
  FieldBoolean,
  FieldDate,
  FieldDateTime,
  FieldDecimal,
  FieldGeoPoint,
  FieldLong,
  FieldMultiFieldset,
  FieldMultiRelation,
  FieldMultiTagbox,
  FieldSingleFieldset,
  FieldSingleRelation,
  FieldSingleTagbox,
  FieldString,
  FieldTranslatedString,
  FieldStringArray,
  FieldLongArray,
  FieldDateTimeArray,
  FieldDictionary,
  FieldDictionaryArray,
} from '@picturepark/sdk-v1-angular';

export default class FieldHelper {
  static isExportable(field: FieldBase): boolean {
    // do not use instanceof to avoid prototype chain check
    // for types like FieldDateTimeArray, FieldStringArray
    const fieldType = field.constructor;

    return (
      fieldType === FieldDateTime ||
      fieldType === FieldBoolean ||
      fieldType === FieldDate ||
      fieldType === FieldDecimal ||
      fieldType === FieldGeoPoint ||
      fieldType === FieldLong ||
      fieldType === FieldString ||
      fieldType === FieldTranslatedString
    );
  }

  static isReferencedField(field: FieldBase): boolean {
    const fieldType = field.constructor;
    return fieldType === FieldMultiTagbox || fieldType === FieldSingleTagbox || fieldType === FieldSingleFieldset;
  }

  static isTagBox(field: FieldBase): boolean {
    const fieldType = field.constructor;
    return fieldType === FieldMultiTagbox || fieldType === FieldSingleTagbox;
  }

  static isSingleFieldset(field: FieldBase): boolean {
    const fieldType = field.constructor;
    return fieldType === FieldSingleFieldset;
  }

  // Not supported field types (will be skipped on export )
  static isAllowedField(field: FieldBase): boolean {
    const fieldType = field.constructor;
    return !(fieldType === FieldMultiRelation || fieldType === FieldSingleRelation || fieldType === FieldMultiFieldset);
  }

  static isMappable(field: FieldBase): boolean {
    const fieldType = field.constructor;
    return (
      fieldType === FieldBoolean ||
      fieldType === FieldDate ||
      fieldType === FieldDateTime ||
      fieldType === FieldLong ||
      fieldType === FieldDecimal ||
      fieldType === FieldString ||
      fieldType === FieldGeoPoint
    );
  }

  static isTranslation(field: FieldBase): boolean {
    return field.constructor === FieldTranslatedString;
  }

  static getFieldName(field: FieldBase) {
    const fieldType = field.constructor;

    switch (fieldType) {
      case FieldBoolean:
        return 'FieldBoolean';
      case FieldDate:
        return 'FieldDate';
      case FieldDateTime:
        return 'FieldDateTime';
      case FieldDateTimeArray:
        return 'FieldDateTimeArray';
      case FieldDictionary:
        return 'FieldDictionary';
      case FieldDictionaryArray:
        return 'FieldDictionaryArray';
      case FieldDecimal:
        return 'FieldDecimal';
      case FieldGeoPoint:
        return 'FieldGeoPoint';
      case FieldLong:
        return 'FieldLong';
      case FieldLongArray:
        return 'FieldLongArray';
      case FieldSingleFieldset:
        return 'FieldSingleFieldset';
      case FieldMultiFieldset:
        return 'FieldMultiFieldset';
      case FieldSingleTagbox:
        return 'FieldSingleTagbox';
      case FieldMultiTagbox:
        return 'FieldMultiTagbox';
      case FieldString:
        return 'FieldString';
      case FieldStringArray:
        return 'FieldStringArray';
      case FieldTranslatedString:
        return 'FieldTranslatedString';
      case FieldSingleRelation:
        return 'FieldSingleRelation';
      case FieldMultiRelation:
        return 'FieldMultiRelation';
    }
    return '';
  }
}
