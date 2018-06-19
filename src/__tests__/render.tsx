import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import Container, { setDefaultWidgets } from '../index';
import defaultViews from '../Comps/Views';
import { Schema } from '../../typings/jsoninput';

it('renders a fallback view', () => {
  const { container, unmount } = render(
    <Container schema={{ type: 'number' }} onChange={() => {}} />,
  );
  expect(container.firstChild).toMatchSnapshot();
  unmount();
});
describe('Render fields with default values', () => {
  beforeAll(() => {
    setDefaultWidgets(defaultViews as any);
  });
  afterEach(cleanup);
  function renderDefault(schema: Schema) {
    return new Promise(resolve => {
      const { container, unmount } = render(
        <Container schema={schema} onChange={resolve} />,
      );
      expect(container.firstChild).toMatchSnapshot();
      unmount();
    }).then(v => {
      expect(v).toEqual(schema.value);
      return v;
    });
  }
  test('Default string', () => {
    return renderDefault({ type: 'string', value: 'String value' });
  });
  test('Default number', () => {
    return renderDefault({ type: 'number', value: 4 });
  });
  test('Default boolean', () => {
    return renderDefault({ type: 'boolean', value: false });
  });
  test('Default object', () => {
    const schema: Schema = { type: 'object', value: { a: 1 } };
    return renderDefault(schema).then(v => expect(v).not.toBe(schema.value));
  });
  test('Default array', () => {
    const schema: Schema = { type: 'array', value: ['string'] };
    return renderDefault(schema).then(v => expect(v).not.toBe(schema.value));
  });
  test('Default tuple', () => {
    const schema: Schema = {
      type: 'array',
      value: [undefined, undefined],
      items: [
        { type: 'string', value: 'Hello' },
        { type: 'number', value: 42 },
      ],
    };
    return new Promise(resolve => {
      render(<Container schema={schema} onChange={resolve} />);
    }).then(v => expect(v).toEqual(['Hello', 42]));
  });
  test('Composite values', () => {
    return new Promise(resolve => {
      render(
        <Container
          schema={{
            type: 'object',
            properties: {
              arrayProp: {
                type: 'array',
                value: [{}],
                items: {
                  type: 'object',
                  properties: {
                    ap: {
                      type: 'string',
                      value: 'key string',
                    },
                  },
                },
              },
              numberProps: {
                value: 1,
              },
            },
          }}
          onChange={resolve}
        />,
      );
    }).then(v =>
      expect(v).toEqual({
        arrayProp: [{ ap: 'key string' }],
        numberProps: 1,
      }),
    );
  });
});

describe('Handle the unknown', () => {
  beforeAll(() => {
    setDefaultWidgets(defaultViews as any);
  });
  test('Null', () => {
    const { container } = render(
      <Container
        schema={{
          type: ['null'],
        }}
        onChange={() => {}}
      />,
    );
    expect(container.firstChild).toMatchSnapshot('Undefined view null');
  });
  test('Unknown', () => {
    const { container } = render(
      <Container
        schema={{
          type: 'unknown' as any,
        }}
        onChange={() => {}}
      />,
    );
    expect(container.firstChild).toMatchSnapshot('Undefined view unknow');
  });
  test('Inference', () => {
    const container = document.createElement('div');
    const schema = {};
    render(
      <Container
        schema={schema}
        value={{
          number: 1,
          string: '',
          boolean: false,
          array: [],
          object: {},
        }}
        onChange={() => {}}
      />,
      { container, baseElement: container },
    );
    expect(container.firstChild).toMatchSnapshot();
    let form: Container;
    render(
      <Container
        schema={schema}
        ref={f => (form = f!)}
        value={{
          // *Wrong* types
          number: '1',
          string: 3,
          boolean: 'false',
          array: {},
          object: [],
        }}
        onChange={() => {}}
      />,
      { container, baseElement: container },
    );
    // No errors after new value
    expect(form!.validate()).toHaveLength(0);
  });
  test("Doesn't send update if value didn't change", () => {
    const schema = {};
    const container = document.createElement('div');
    const onChange = jest.fn();
    for (let i = 0; i < 10; i++) {
      render(<Container schema={schema} value={i} onChange={onChange} />, {
        container,
        baseElement: container,
      });
    }
    expect(onChange).not.toBeCalled();
  });
  test("Doesn't send update for same input", () => {
    const schema = {};
    const value = { a: 1 };
    const container = document.createElement('div');
    const onChange = jest.fn();
    for (let i = 0; i < 10; i++) {
      render(<Container schema={schema} value={value} onChange={onChange} />, {
        container,
        baseElement: container,
      });
    }
    expect(onChange).not.toBeCalled();
  });
  test('Render a specified view', () => {
    const { container } = render(
      <Container
        schema={{ type: 'number', view: { type: 'arrowNumber' } }}
        onChange={() => {}}
      />,
    );
    expect(container.querySelectorAll('[type="number"]').length).toBe(1);
  });
  test('Render a component', () => {
    const text = "I'm a dummy component";
    const { getByText } = render(
      <Container
        schema={{
          type: 'string',
          view: {
            type: () => {
              return <div>{text}</div>;
            },
          },
        }}
        onChange={() => {}}
      />,
    );
    expect(() => getByText(text)).not.toThrow();
  });
  test('Render a multiple type', () => {
    const { container } = render(
      <Container
        schema={{
          type: ['null', 'string', 'number'],
        }}
        onChange={() => {}}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
