const VALUE = 'value';
const STATUS = 'status';
const STATE = 'state';
const ERRORS = 'errors';
const NOERRORS = [];

/**
 * Update a value in the tree
 *
 * @param {Baobab} tree the tree
 * @param {Array<string>} path path's value to update
 * @param value value to set
 * @param {Array<string>} errors errors relative to the value
 */
export function update(tree, path, value, errors) {
    const statusPath = [STATUS].concat(path);
    tree.set([VALUE].concat(path), value);
    tree.set(statusPath.concat([STATE]), 'dirty');
    if (errors) {
        tree.set(statusPath.concat([ERRORS]), errors);
    }
}

export function setDefaultValue(tree, path, value) {
    tree.set([VALUE].concat(path), value);
    tree.set([STATUS].concat(path).concat([STATE]), 'pristine');
}

export function getStatus(tree, path) {
    return tree.get([STATUS].concat(path).concat([STATE]));
}

export function getErrors(tree, path) {
    return tree.get([STATUS].concat(path).concat([ERRORS])) || NOERRORS;
}

export function getFormValue(tree) {
    return tree.get(VALUE);
}

export function setErrors(tree, path, errors) {
    const statusPath = [STATUS].concat(path);
    tree.set(statusPath.concat([ERRORS]), errors);
}
