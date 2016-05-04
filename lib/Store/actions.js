'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setErrors = setErrors;
exports.update = update;
exports.setDefaultValue = setDefaultValue;
exports.getStatus = getStatus;
exports.getErrors = getErrors;
exports.getFormValue = getFormValue;
exports.updateSchema = updateSchema;
var VALUE = 'value';
var STATUS = 'status';
var STATE = 'state';
var ERRORS = 'errors';
var NOERRORS = [];

function setErrors(tree, path, errors) {
    var errorPath = [STATUS].concat(path).concat([ERRORS]);
    var errorsCursor = tree.select(errorPath);
    if (errors && errors.length && Array.isArray(errorsCursor.get())) {
        errorsCursor.splice([0, errorsCursor.get().length]);
        errorsCursor.concat(errors || []);
    } else {
        errorsCursor.set(errors || NOERRORS);
    }
}

/**
 * Update a value in the tree
 *
 * @param {Baobab} tree the tree
 * @param {Array<string>} path path's value to update
 * @param value value to set
 * @param {Array<string>} errors errors relative to the value
 */
function update(tree, path, value, errors) {
    var statusPath = [STATUS].concat(path);
    tree.set([VALUE].concat(path), value);
    tree.set(statusPath.concat([STATE]), 'dirty');
    setErrors(tree, path, errors);
}

function setDefaultValue(tree, path, value) {
    tree.set([VALUE].concat(path), value);
    tree.set([STATUS].concat(path).concat([STATE]), 'pristine');
}

function getStatus(tree, path) {
    return tree.get([STATUS].concat(path).concat([STATE]));
}

function getErrors(tree, path) {
    return tree.get([STATUS].concat(path).concat([ERRORS])) || NOERRORS;
}

function getFormValue(tree) {
    return tree.get(VALUE);
}

function updateSchema(tree, path, value) {
    var updatedPath = path.reduce(function (prev, val) {
        if (tree.get(prev).type === 'object') {
            return prev.concat(['properties', val]);
        } else if (tree.get(prev).type === 'array') {
            return prev.concat(['items']);
        }
        return prev.concat([val]);
    }, ['schema']);
    tree.set(updatedPath, value);
}