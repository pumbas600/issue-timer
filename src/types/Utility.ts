import React, { ForwardRefRenderFunction, ReactNode } from 'react';

export type Component<T = {}> = React.FC<T & { children?: ReactNode }>;

export type ForwardRefComponent<TRef, TProps = {}> = ForwardRefRenderFunction<TRef, TProps & { children?: ReactNode }>;
