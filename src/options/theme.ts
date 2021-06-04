import { FieldOptions } from './base';

export interface ThemeListOptions extends FieldOptions {}

export interface ThemeGetOptions extends FieldOptions {}

export interface ThemeCreateOptions {
    src: string;
    name: string;
    role: 'main' | 'unpublished' | 'demo';
}
