export type Variant = 'primary' | 'secondary' | 'success' | 'danger';

export interface Shades {
    light: string;
    default: string;
    dark: string;
}

export interface Styles {
    bg: Shades;
    text: Shades;
    border: Shades;
}

export const Styles: Record<Variant, Styles> = {
    primary: {
        bg: {
            light: 'bg-sky-300',
            default: 'bg-sky-500',
            dark: 'bg-sky-700',
        },
        text: {
            light: 'text-sky-300',
            default: 'text-sky-500',
            dark: 'text-sky-700',
        },
        border: {
            light: 'border-sky-300',
            default: 'border-sky-500',
            dark: 'border-sky-700',
        },
    },
    secondary: {
        bg: {
            light: 'bg-gray-300',
            default: 'bg-gray-500',
            dark: 'bg-gray-700',
        },
        text: {
            light: 'text-gray-300',
            default: 'text-gray-500',
            dark: 'text-gray-700',
        },
        border: {
            light: 'border-gray-300',
            default: 'border-gray-500',
            dark: 'border-gray-700',
        },
    },
    success: {
        bg: {
            light: 'bg-emerald-300',
            default: 'bg-emerald-500',
            dark: 'bg-emerald-700',
        },
        text: {
            light: 'text-emerald-300',
            default: 'text-emerald-500',
            dark: 'text-emerald-700',
        },
        border: {
            light: 'border-emerald-300',
            default: 'border-emerald-500',
            dark: 'border-emerald-700',
        },
    },
    danger: {
        bg: {
            light: 'bg-red-300',
            default: 'bg-red-500',
            dark: 'bg-red-700',
        },
        text: {
            light: 'text-red-400',
            default: 'text-red-500',
            dark: 'text-red-700',
        },
        border: {
            light: 'border-red-300',
            default: 'border-red-500',
            dark: 'border-red-700',
        },
    },
};
export function merge(styles: (string | undefined)[]): string {
    return styles.filter(Boolean).join(' ');
}
