// @rat/compiler

export interface CompileOptions {
  filename? : string;                  // decides the mode (.rat / .rat.js) and names the component
  mode?     : 'component' | 'module';  // overrides the filename
  runtime?  : string;                  // import specifier of the runtime, default '@rat/runtime'
  styles?   : Record<string, (code: string, context: { filename: string }) => string>; // preprocessors per <style lang>
  tags?     : string[];                // .rat.js: template tags compiled as markup, default ['html', 'htx', 'rat']
}

export interface CompileResult {
  ast    : Fragment | ModuleAst;
  code   : string;
  css?   : string;
  names  : string[];                   // the reactive $names found
  scope? : string | null;              // the data-rat hash, when there is a <style>
}

export class CompileError extends SyntaxError {
  column   : number;
  filename : string;
  index    : number;
  line     : number;
  reason   : string;
}

export function compile          (source: string, options?: CompileOptions): CompileResult;
export function compileAsync     (source: string, options?: CompileOptions): Promise<CompileResult>;
export function compileComponent (source: string, options?: CompileOptions): CompileResult;
export function compileModule    (source: string, options?: CompileOptions): CompileResult;
export function loadStyles       (...langs: (string | string[])[]): Promise<unknown[]>;
export function parse            (source: string, options?: { blocks?: boolean, filename?: string, offset?: number, tolerant?: boolean }): Fragment;

/** the $ declarations of a script as written, token based: for tooling. */
export function declared         (code: string, offset?: number): { name: string, kind: 'signal' | 'computed', start: number, end: number, statement: number }[];

export function forOf  (code: string, offset?: number): string;
export function pipes  (code: string, offset?: number): string;
export function ranges (code: string, offset?: number, runtime?: string): string;
export function sugar  (code: string, offset?: number): string;
export function topics (code: string, offset?: number): string;

export default compile;

// ::: ast

export interface Code {
  code  : string;
  start : number;                      // offset in the file
  end?  : number;
}

export interface Range { start: number; end: number }

export type Node = Element | Expression | For | If | Switch | Text;

export interface Fragment extends Range {
  type     : 'Fragment';
  children : Node[];
  scripts  : { instance: Code[], module: Code[] };
  styles   : Code[];
  errors   : CompileError[];           // collected with tolerant: true, else the first one is thrown
  warnings : CompileError[];           // a closing tag that names another element
}

export interface ModuleAst {
  type      : 'Module';
  templates : Fragment[];
}

export interface Element {
  type       : 'Element';
  attributes : (Attribute | Spread)[];
  children   : Node[];
  classes    : string[];
  component  : boolean;
  id         : string | null;
  start      : number;
  end        : number;
  name       : Range;                  // the tag name as written
  openEnd    : number;                 // after the > of the open tag
  close      : (Range & { name: string }) | null;
  svg        : boolean;
  tag        : string;
}

export interface Attribute extends Range {
  type  : 'Attribute';
  nameEnd : number;
  names : string[];                    // more than one for a prop group (a|b)
  value : { kind: 'true' }
        | { kind: 'string', value: string }
        | { kind: 'expression' } & Code
        | { kind: 'template', parts: (string | Code)[] };
}

export interface Spread extends Code { type: 'Spread'; }

export interface Expression extends Code { type: 'Expression'; }

export interface Text extends Range {
  type  : 'Text';
  value : string;
}

export interface If {
  type     : 'If';
  branches : { test: Code, children: Node[] }[];
  fallback : Node[] | null;
}

export interface For {
  type     : 'For';
  children : Node[];
  fallback : Node[] | null;
  index    : string | null;
  item     : string;                   // a binding: name or destructuring pattern
  list     : Code;
}

export interface Switch {
  type     : 'Switch';
  cases    : { test: Code, children: Node[] }[];
  fallback : Node[] | null;
  subject  : Code;
}
