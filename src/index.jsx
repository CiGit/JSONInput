import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import Container from './Comps/Container.jsx';

const formSchema = {
    title: 'Todo',
    type: 'object',
    properties: {
        titleString: {
            type: 'string',
            title: 'This is a string',
            required: true,
            errored: val => val === 'www' ? 'is not a password' : ''
        },
        showNum: {
            type: 'boolean',
            title: 'Number',
            defaultValue: false,
            description: 'will toggle number input'
        },
        num: {
            type: 'number',
            title: 'A number',
            defaultValue: 4,
            visible: (value, formValue) => formValue.showNum
        },
        myArray: {
            type: 'array',
            title: 'this is an array',
            items: {
                type: 'object',
                title: 'object array field title',
                defaultValue: {
                    key1: 100
                },
                properties: {
                    key1: {
                        type: 'number',
                        title: 'object number',
                        placeholder: 'number in obj',
                        errored: val => val > 100 ? 'too big' : ''
                    }
                }
            }
        }
    }
};
const log = function logger(e) {
    console.log(e); // eslint-disable-line no-console
};
const formData = {
    showNum: true,
    unknownKey: false,
    u: {
        a: 1,
        b: 3
    }
};

function mount(schema, onChange, data) {
    window.form = render((
        <Container schema={ schema }
                   value={ data }
                   onChange={ onChange } />),
        document.getElementById('container')
    );
}

mount(formSchema, log, formData);
window.unmount = function unmount() {
    unmountComponentAtNode(document.getElementById('container'));
};
window.mount = mount.bind(null, formSchema, log);
