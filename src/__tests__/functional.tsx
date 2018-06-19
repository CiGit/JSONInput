import * as React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import defaultViews from '../Comps/Views';
import Container, { setDefaultWidgets } from '../index';

describe('Visibility', () => {
  beforeAll(() => {
    setDefaultWidgets(defaultViews as any);
  });
  afterEach(cleanup);
  test('Simple visibility', () => {
    let val: any = 'Hello';
    const container = document.createElement('div');
    render(
      <Container
        schema={{
          type: 'string',
          visible: () => {
            return false;
          },
        }}
        onChange={v => {
          val = v;
        }}
        value={val}
      />,
      { container, baseElement: container },
    );
    expect(container.firstChild).toMatchSnapshot('Nothing');
    expect(val).toBe('Hello');
    val = 'World';
    render(
      <Container
        schema={{
          type: 'string',
          visible: () => {
            return true;
          },
        }}
        onChange={v => {
          val = v;
        }}
        value={val}
      />,
      { container, baseElement: container },
    );
    expect(container.firstChild).toMatchSnapshot('Input visible');
    expect(val).toBe('World');
  });
  test('Toggle visibility', () => {
    let val: any = { val: 'Hello', visible: false };
    const { container } = render(
      <Container
        schema={{
          type: 'object',
          properties: {
            val: {
              type: 'string',
              visible: (val, formVal) => {
                return formVal.visible;
              },
            },
            visible: {
              type: 'boolean',
            },
          },
        }}
        onChange={v => {
          val = v;
        }}
        value={val}
      />,
    );
    const cbx = container.querySelector('input')!;
    fireEvent.change(cbx);
    expect(container.firstChild).toMatchSnapshot('Hello input invisible');
    expect(val).toEqual({ val: 'Hello', visible: false });
    // Toggle visibility
    cbx.checked = true;
    fireEvent.change(cbx);
    expect(container.firstChild).toMatchSnapshot('Hello input visible');
    expect(val).toEqual({ val: 'Hello', visible: true });
  });
  test('Hides throwing visibility function', () => {
    const { container } = render(
      <Container
        schema={{
          type: 'string',
          visible: () => {
            throw Error('...');
          },
        }}
        onChange={() => {}}
      />,
    );
    expect(container.firstChild).toMatchSnapshot('Nothing');
  });
});
describe('Errored', () => {
  beforeAll(() => {
    setDefaultWidgets(defaultViews as any);
  });
  test('"errored" is not a function', () => {
    const conError = spyOn(console, 'error'); // Hide error messages.
    expect(() =>
      render(
        <Container
          schema={{
            type: 'string',
            value: '',
            errored: undefined,
          }}
          onChange={() => {}}
        />,
      ),
    ).toThrowError('"errored" expects a function');
  });
  test('Error shown on change only', () => {
    const errorMessage = "I'm always wrong";
    const { container, getByText } = render(
      <Container
        schema={{
          type: 'string',
          errored: () => errorMessage,
        }}
        value=""
        onChange={() => {}}
      />,
    );
    // there is no error message
    expect(() => getByText(errorMessage)).toThrow();
    // throw a change event
    fireEvent.change(container.querySelector('input'));
    // Error is shown
    expect(() => getByText(errorMessage)).not.toThrow();
  });
  test('Error hides on change', () => {
    const errorMessage = "I'm not Empty";
    const { container, getByText } = render(
      <Container
        schema={{
          type: 'string',
          errored: val => (val ? errorMessage : ''),
        }}
        value=""
        onChange={() => {}}
      />,
    );
    const input = container.querySelector('input');
    expect(() => getByText(errorMessage)).toThrow();
    input.value = 'Something';
    fireEvent.change(input);
    expect(() => getByText(errorMessage)).not.toThrow();
    input.value = '';
    fireEvent.change(input);
    expect(() => getByText(errorMessage)).toThrow();
  });
});
