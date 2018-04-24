import * as React from 'react';
import immer from 'immer';

interface StoreProps {
    value?: {};
    schema: {};
    onValueChange: (value: {}) => void;
    children: (
        props: {
            dispatch: (
                action: (state: any, ...extraArgs: any[]) => void,
                ...args: any[]
            ) => void;
            schema: {};
            value: {};
            status: {};
        }
    ) => JSX.Element;
}
const FormContext = React.createContext<{
    value?: {};
    schema: {};
    status: {};
}>({
    value: undefined,
    schema: {},
    status: {},
});
export const FormConsumer = FormContext.Consumer;
export class Store extends React.Component<StoreProps> {
    state = {
        schema: {},
        value: {},
        status: {},
    };
    static getDerivedStateFromProps(
        nextProps: StoreProps,
        state: { schema: {}; value: {}; status: {} }
    ) {
        if (
            state.schema !== nextProps.schema ||
            state.value !== nextProps.value
        ) {
            return {
                value: nextProps.value,
                schema: nextProps.schema,
                status: {},
            };
        }
        return null;
    }
    dispatch = (
        action: (state: any, ...extraArgs: any[]) => void,
        ...args: any[]
    ) => {
        this.setState(prevState => {
            return (immer(action) as (state: any, ...extraArgs: any[]) => any)(
                prevState,
                ...args
            );
        });
    };
    shouldComponentUpdate(nextProps: any, nextState: any) {
        return this.state !== nextState;
    }
    componentDidUpdate(_prevProps: StoreProps, prevState: { value: {} }) {
        if (this.state.value !== prevState.value) {
            this.props.onValueChange(this.state.value);
        }
    }
    render() {
        return (
            <FormContext.Provider value={this.state}>
                {this.props.children({
                    ...this.state,
                    dispatch: this.dispatch,
                })}
            </FormContext.Provider>
        );
    }
}
