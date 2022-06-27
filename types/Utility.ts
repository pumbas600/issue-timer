import React from 'react';

export type Component<T = {}> = React.FC<T & { children?: React.ReactNode }>;
