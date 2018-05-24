import TextWidget from './TextWidget';
import ArrowNumberWidget from './ArrowNumberWidget';
import CheckboxWidget from './CheckboxWidget';
import ArrayWidget from './ArrayWidget';
import ObjectWidget from './ObjectWidget';
import SelectWidget from './SelectWidget';
import HashmapWidget from './HashmapWidget';

export default {
  string: TextWidget,
  number: TextWidget,
  boolean: CheckboxWidget,
  array: ArrayWidget,
  object: ObjectWidget,
  arrowNumber: ArrowNumberWidget,
  select: SelectWidget,
  hashmap: HashmapWidget,
};
