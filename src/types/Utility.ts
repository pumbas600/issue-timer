import React, { ForwardRefRenderFunction } from 'react';

export type Component<T = {}> = React.FC<T & { children?: React.ReactNode }>;

export type ForwardRefComponent<TRef, TProps = {}> = ForwardRefRenderFunction<
    TRef,
    TProps & { children?: React.ReactNode }
>;
