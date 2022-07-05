import { Children, Component, JSXElementConstructor, ReactElement, ReactFragment, ReactNode } from 'react';

export function isReactElement(element: ReactNode): element is ReactElement {
    return typeof element === 'object';
}

export function isComponent(type: JSXElementConstructor<any> | string): type is JSXElementConstructor<any> {
    return type !== null && typeof type !== 'string';
}

export function childrenToArray<TProps = {}>(
    children: ReactNode | undefined,
    type?: (props: TProps) => ReactNode,
): ReactElement<TProps>[] {
    return Children.toArray(children)
        .filter((child) => isReactElement(child) && isComponent(child.type) && (!type || child.type.name === type.name))
        .map((child) => child as ReactElement<TProps>);
}

export function first<T>(array: T[], predicate: (value: T) => boolean): T | null {
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        if (predicate(value)) return value;
    }
    return null;
}

export function capitalise(str: string): string {
    if (str.length === 0) return str;
    return str[0].toUpperCase() + str.substring(1);
}
