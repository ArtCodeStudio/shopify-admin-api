import * as Options from '../options';

export interface ScriptTagBaseOptions {
    /**
     * Filters the result to script tags with the given src.
     */
    src?: string;
}

export interface ScriptTagGetOptions extends Options.FieldOptions {}
export interface ScriptTagCountOptions extends Options.ScriptTagBaseOptions {}
export interface ScriptTagListOptions extends Options.ScriptTagBaseOptions, Options.ListOptions, Options.DateOptions, Options.FieldOptions {}