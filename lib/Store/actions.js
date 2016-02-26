'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.update = update;
exports.setDefaultValue = setDefaultValue;
exports.getStatus = getStatus;
exports.getErrors = getErrors;
exports.getFormValue = getFormValue;
exports.setErrors = setErrors;
var VALUE = 'value';
var STATUS = 'status';
var STATE = 'state';
var ERRORS = 'errors';
var NOERRORS = [];

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
    if (errors) {
        tree.set(statusPath.concat([ERRORS]), errors);
    }
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

function setErrors(tree, path, errors) {
    var statusPath = [STATUS].concat(path);
    tree.set(statusPath.concat([ERRORS]), errors);
}