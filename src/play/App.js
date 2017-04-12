import React from 'react';
import Container from '../index';
/* eslint-disable */
const formSchema = {
    title: 'Form Base',
    type: 'object',
    properties: {
        titleString: {
            type: 'string',
            value: 'www',
            required: true,
            errored: val => val === 'www' ? 'world wide web' : '',
            view: {
                title: 'This is a string'
            }
        },
        showNum: {
            type: 'boolean',
            value: false,
            index: -1,
            description: 'will toggle number input',
            view: {
                title: 'Number',
                type: function(props) {
                    return (
                        <select
                            value={props.value}
                            onChange={ev =>
                                props.onChange(eval(ev.target.value))}
                        >
                            <option value={true}>
                                true
                            </option>
                            <option value={false}>
                                false
                            </option>
                        </select>
                    );
                }
            }
        },
        num: {
            type: 'number',
            value: 4,
            index: -1,
            visible: (value, formValue) => formValue.showNum,
            view: {
                title: 'A number'
            }
        },
        myArray: {
            type: 'array',
            items: {
                type: 'object',
                value: {
                    key1: 100
                },
                properties: {
                    key1: {
                        type: 'number',
                        title: 'object number',
                        placeholder: 'number in obj',
                        errored: val => val > 100 ? 'too big' : ''
                    }
                },
                view: {
                    title: 'object array field title'
                }
            },
            view: {
                title: 'this is an array'
            }
        }
    }
};
/* eslint-enable */
const formData = {
    showNum: true,
    unknownKey: false,
    u: {
        a: 1,
        b: 3
    }
};
function stringify(obj) {
    return JSON.stringify(
        obj,
        (key, value) => {
            if (typeof value === 'function') {
                return value.toString();
            }
            return value;
        },
        '  '
    );
}

function parse(str) {
    return JSON.parse(str, (key, value) => {
        if (
            value &&
            typeof value === 'string' &&
            value.indexOf('function') === 0
        ) {
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
        // setDefaultWidgets({
        //     string: ""
        // });
    }
    schemaChange(event) {
        this.setState({
            schema: parse(event.target.value),
            editData: '',
            data: ''
        });
    }
    dataChange(event) {
        this.setState({
            data: parse(event.target.value)
        });
    }
    editDataChange(event) {
        this.setState({
            editData: event.target.value
        });
    }
    formChange(val) {
        this.setState({
            data: val,
            editData: stringify(val)
        });
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
        return (
            <div>
                <div style={styleForm}>
                    <Container
                        schema={this.state.schema}
                        value={this.state.data}
                        onChange={v => this.formChange(v)}
                    />
                </div>
                <h2>schema</h2>
                <textarea
                    defaultValue={stringify(this.state.schema)}
                    onBlur={v => this.schemaChange(v)}
                    style={styleLeft}
                />
                <h2>value</h2>
                <textarea
                    value={this.state.editData}
                    onChange={v => this.editDataChange(v)}
                    onBlur={v => this.dataChange(v)}
                    style={styleLeft}
                />
            </div>
        );
    }
}
export default App;
