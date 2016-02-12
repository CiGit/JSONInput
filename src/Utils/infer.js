export function infer(value) {
    switch (typeof value) {
    case 'number':
        return {
            type: 'number'
        };
    case 'string':
        return {
            type: 'string'
        };
    case 'boolean':
        return {
            type: 'boolean'
        };
    case 'object':
        return {
            type: Array.isArray(value) ? 'array' : 'object'
        };
    default:
        return {
            type: 'string'
        };
    }
}
