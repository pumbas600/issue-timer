import { Children, Component, JSXElementConstructor, ReactElement, ReactNode } from 'react';

export function isReactElement(element: ReactNode): element is ReactElement {
    return typeof element === 'object';
}

export function isComponent(type: JSXElementConstructor<any> | string): type is JSXElementConstructor<any> {
    return type !== null && typeof type !== 'string';
}

export function mapChildren<TProps, TResult = void>(
    children: ReactNode | undefined,
    type: string,
    mapper: (child: ReactElement<TProps>, index?: number) => TResult,
) {
    Children.map(children, (child, index) => {
        if (!isReactElement(child) || !isComponent(child.type) || child.type.name !== type) return child;
        return mapper(child, index);
    });
}
