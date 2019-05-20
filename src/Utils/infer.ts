export default function infer(value?: {} | undefined | null) {
  switch (typeof value) {
    case 'number':
      return 'number';
    case 'string':
      return 'string';
    case 'boolean':
      return 'boolean';
    case 'object':
      return Array.isArray(value) ? 'array' : 'object';
    default:
      return 'string';
  }
}
