declare module 'baobab-react/higher-order' {
    export const root: any;
    export const branch: any;
}
declare class Baobab {
    constructor(...args: {}[]);
}
declare module "baobab" {
    export default Baobab;
}

declare module 'react-pure-render/function' {
    export default function (args: {}[]): boolean
}
declare module 'jsonschema' {
    export class Validator {
        public attributes: { [key: string]: (...args: any[]) => any }
        public validate: (value: {} | void, schema: {}, options: { [option: string]: {} }) => any
    }
    export class SchemaError {
        constructor(message: string);
    }
}
declare module 'prop-types' {
    export default React.PropTypes;
}