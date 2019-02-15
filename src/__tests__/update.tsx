import * as React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import defaultViews from '../Comps/Views';
import Container, { setDefaultWidgets } from '../index';
import Input from '../Comps/Views/Input';

describe('Update values', () => {
  beforeAll(() => {
    setDefaultWidgets(defaultViews);
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
    fireEvent.change(input, { target: { value: 'Hello, World' } });
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
    fireEvent.click(input);
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
    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(addButton);
    expect(val).toEqual(['Hello', undefined]);
    const inputs = container.querySelectorAll('input')!;
    // Create 2 elements
    fireEvent.change(inputs[0], { target: { value: 'One' } });
    fireEvent.change(inputs[1], { target: { value: 'Two' } });
    expect(val).toEqual(['One', 'Two']);
    // Remove first element
    fireEvent.click(getByText('-'));
    expect(val).toEqual(['Two']);
    // Update *new* first element
    fireEvent.change(inputs[0], { target: { value: 'Two updated' } });
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
    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '' } });
    expect(val).toBe(undefined);

    fireEvent.change(input, { target: { value: '4.2e1' } });
    expect(val).toBe(42);

    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(val).toBe('Hello');

    fireEvent.change(input, { target: { value: '' } });
    expect(val).toBe(undefined);
  });
});
