import { ValidationError } from 'jsonschema/lib';
import { set, get, unset, setWith } from 'lodash-es';

const VALUE = 'value';
const STATUS = 'status';
const STATE = '$$$state';
const ERRORS = '$$$errors';
const NO_ERRORS: string[] = [];

function setErrors(state: any, path: string[] = [], errors: string[]) {
  const errorPath = [STATUS].concat(path).concat([ERRORS]);
  setWith(state, errorPath, errors, Object);
}
export function setValidationErrors(
  state: any,
  path: string[] = [],
  errors: ValidationError[],
) {
  const errorMap = new Map<string, string[]>();
  // Collect each error associated with a given path
  errors.forEach(error => {
    const errors = errorMap.get(error.property) || [];
    errors.push(error.message); // Add new error
    errorMap.set(error.property, errors);
  });
  setErrors(state, path, NO_ERRORS);
  errorMap.forEach((value, key) => {
    setErrors(
      state,
      path.concat(
        key
          .split(/\.|\[|\]/)
          .filter(x => x !== '')
          .slice(1),
      ),
      value,
    );
  });
}

/**
 * Update a value in the tree
 *
 * @param state the tree
 * @param path path's value to update
 * @param value value to set
 * @param errors errors relative to the value
 */
export function update(
  state: any,
  path: string[] = [],
  value: {},
  errors: ValidationError[],
) {
  const statusPath = [STATUS].concat(path);
  set(state, [VALUE].concat(path), value);
  setWith(state, statusPath.concat([STATE]), 'dirty', Object);
  setValidationErrors(state, path, errors);
}

export function setDefaultValue(state: any, path: string[] = [], value: {}) {
  update(state, path, value, []);
  setWith(state, [STATUS].concat(path).concat([STATE]), 'pristine', Object);
}

/**
 * Unset given path
 * @param state the tree
 * @param path path to value
 */
export function destroy(state: any, path: string[] = []) {
  try {
    unset(state, [STATUS].concat(path));
  } catch (e) {
    // Maybe already destroyed
  }
}

// GETTERS, DO NOT USE with a dispatcher

export function getErrors(state: any, path: string[] = []) {
  return get(state, [STATUS].concat(path).concat([ERRORS])) || NO_ERRORS;
}
