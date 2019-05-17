import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import defaultViews from '../Comps/Views';
import Container, { setDefaultWidgets } from '../index';
import { WidgetProps } from '../../typings/types';

describe('Form functions', () => {
  beforeAll(() => {
    setDefaultWidgets(defaultViews as any);
  });
  afterEach(cleanup);
  test('Get current value', () => {
    const value = { a: 1, b: [{ c: 3 }] };
    let form: Container;
    render(
      <Container
        ref={f => (form = f!)}
        schema={{}}
        value={value}
        onChange={() => {}}
      />,
    );
    expect(form!.getValue()).toBe(value);
    expect(form!.validate()).toHaveLength(0);
  });
  test('Validate', () => {
    let form: Container;
    const { getByText } = render(
      <Container
        ref={f => (form = f!)}
        schema={{ type: 'string' }}
        value={1}
        onChange={() => {}}
      />,
    );
    expect(() => getByText('is not of a type(s) string')).toThrow();
    const validationResults = form!.validate();
    expect(() => getByText('is not of a type(s) string')).not.toThrow();
    expect(form!.validate()).toHaveLength(1);
    expect(validationResults[0].message).toBe('is not of a type(s) string');
  });
  test('View function', () => {
    const val = { something: 1, str: 'Hello' };
    render(
      <Container
        schema={{
          type: 'object',
          properties: {
            str: {
              type: 'string',
              view: {
                type: function(
                  props: WidgetProps.BaseProps<{}>,
                ) {
                  const updateVal = 'Hello, World';
                  expect(props.path).toEqual(['str']);
                  if (props.value === val.str) {
                    expect(props.formValue()).toEqual(val);
                    props.onChange(updateVal);
                  } else {
                    expect(props.formValue()).toEqual({
                      something: 1,
                      str: updateVal,
                    });
                  }
                  return <span>{String(props.value)}</span>;
                },
              },
            },
          },
        }}
        value={val}
        onChange={() => {}}
      />,
    );
  });
});
