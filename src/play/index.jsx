import { render } from 'react-dom';
import React from 'react';
import Container from '../index.js';
/* eslint-disable */
const formSchema = {
    title: 'Form Base',
    type: 'object',
    properties: {
        titleString: {
            type: 'string',
            title: 'This is a string',
            defaultValue: 'www',
            required: true,
            errored: val => val === 'www' ? 'world wide web' : ''
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
/* eslint-enable */
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
function stringify(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'function') {
            return value.toString();
        }
        return value;
    }, '  ');
}

function parse(str) {
    return JSON.parse(str, (key, value) => {
        if (value && typeof value === 'string' && value.indexOf('function') === 0) {
            let tmpFn;
            eval(`tmpFn=${value}`); // eslint-disable-line no-eval
            return tmpFn;
        }
        return value;
    });
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: formSchema,
            data: formData,
            editData: formData
        };
    }
    schemaChange(event) {
        this.setState(Object.assign({}, this.state, {
            schema: parse(event.target.value)
        }));
    }
    dataChange(event) {
        this.setState(Object.assign({}, this.state, {
            data: parse(event.target.value)
        }));
    }
    editDataChange(event) {
        this.setState(Object.assign({}, this.state, {
            editData: parse(event.target.value)
        }));
    }
    formChange(val) {
        log(val);
        this.setState(Object.assign({}, this.state, {
            data: val,
            editData: val
        }));
    }
    render() {
        const styleLeft = {
            width: '45%',
            height: '300px'
        };
        const styleForm = {
            float: 'right',
            width: '50%'
        };
        const schemaChange = this.schemaChange.bind(this);
        const dataChange = this.dataChange.bind(this);
        const editDataChange = this.editDataChange.bind(this);
        const formChange = this.formChange.bind(this);
        return (<div>
                  <div style={ styleForm }>
                    <Container schema={ this.state.schema }
                               value={ this.state.data }
                               onChange={ formChange } />
                  </div>
                  <h2>schema</h2>
                  <textarea defaultValue={ stringify(this.state.schema) }
                            onBlur={ schemaChange }
                            style={ styleLeft } />
                  <h2>value</h2>
                  <textarea value={ stringify(this.state.editData) }
                            onChange={ editDataChange }
                            onBlur={ dataChange }
                            style={ styleLeft } />
                </div>);
    }
}

function mount() {
    render((
        <App />),
        document.getElementById('container')
    );
}

mount();
