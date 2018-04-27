import * as React from 'react';
import { render, Simulate } from 'react-testing-library';
import defaultViews from '../Comps/Views';
import Container, { setDefaultWidgets } from '../index';

describe('Update values', () => {
    beforeAll(() => {
        setDefaultWidgets(defaultViews as any);
    });

    test('Update simple field', () => {
        let val = undefined;
        const { container } = render(
            <Container
                schema={{ type: 'string' }}
                onChange={v => {
                    val = v;
                }}
                value={undefined}
            />
        );
        const input = container.querySelector('input')!;
        expect(val).toBeUndefined();
        input.value = 'Hello, World';
        Simulate.change(input);
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
            />
        );
        const input = container.querySelector('input')!;
        expect(val).toBeUndefined();
        input.checked = true;
        Simulate.change(input);
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
            />
        );
        const addButton = getByText('+');
        Simulate.click(addButton);
        expect(val).toEqual([undefined]);
        Simulate.click(addButton);
        expect(val).toEqual([undefined, undefined]);
        const inputs = container.querySelectorAll('input')!;
        // Create 2 elements
        inputs[0].value = 'One';
        Simulate.change(inputs[0]);
        inputs[1].value = 'Two';
        Simulate.change(inputs[1]);
        expect(val).toEqual(['One', 'Two']);
        // Remove first element
        Simulate.click(getByText('-'));
        expect(val).toEqual(['Two']);
        // Update *new* first element
        inputs[0].value = 'Two updated';
        Simulate.change(inputs[0]);
        expect(val).toEqual(['Two updated']);
        // Remove first element
        Simulate.click(getByText('-'));
        expect(val).toEqual([]);
    });
});
