import * as React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import defaultViews from '../Comps/Views';
import Container, { setDefaultWidgets } from '../index';

describe('Update values', () => {
  beforeAll(() => {
    setDefaultWidgets(defaultViews as any);
  });
  afterEach(cleanup);
  test('Update simple field', () => {
    let val = undefined;
    const { container } = render(
      <Container
        schema={{ type: 'string' }}
        onChange={v => {
          val = v;
        }}
        value={undefined}
      />,
    );
    const input = container.querySelector('input')!;
    expect(val).toBeUndefined();
    input.value = 'Hello, World';
    fireEvent.change(input);
    expect(val).toBe('Hello, World');
  });
  test('Update simple checkbox', () => {
    let val = undefined;
    const { container } = render(
      <Container
        schema={{ type: 'boolean' }}
        onChange={v => {
          val = v;
        }}
        value={undefined}
      />,
    );
    const input = container.querySelector('input')!;
    expect(val).toBeUndefined();
    input.checked = true;
    fireEvent.change(input);
    expect(val).toBe(true);
  });
  test('Update array field', () => {
    let val = undefined;
    const { container, getByText } = render(
      <Container
        schema={{ type: 'array', items: { type: 'string' } }}
        onChange={v => {
          val = v;
        }}
        value={undefined}
      />,
    );
    const addButton = getByText('+');
    fireEvent.click(addButton);
    expect(val).toEqual([undefined]);
    fireEvent.click(addButton);
    expect(val).toEqual([undefined, undefined]);
    const inputs = container.querySelectorAll('input')!;
    // Create 2 elements
    inputs[0].value = 'One';
    fireEvent.change(inputs[0]);
    inputs[1].value = 'Two';
    fireEvent.change(inputs[1]);
    expect(val).toEqual(['One', 'Two']);
    // Remove first element
    fireEvent.click(getByText('-'));
    expect(val).toEqual(['Two']);
    // Update *new* first element
    inputs[0].value = 'Two updated';
    fireEvent.change(inputs[0]);
    expect(val).toEqual(['Two updated']);
    // Remove first element
    fireEvent.click(getByText('-'));
    expect(val).toEqual([]);
  });

  test('Update a number with a string input', () => {
    let val;
    const { container } = render(
      <Container
        schema={{ type: 'number' }}
        onChange={v => {
          val = v;
        }}
        value={val}
      />,
    );
    const input = container.querySelector('input');

    input.value = '';
    fireEvent.change(input);
    expect(val).toBe(undefined);

    input.value = '4.2e1';
    fireEvent.change(input);
    expect(val).toBe(42);

    input.value = 'Hello';
    fireEvent.change(input);
    expect(val).toBe('Hello');

    input.value = '';
    fireEvent.change(input);
    expect(val).toBe(undefined);
  });
});
