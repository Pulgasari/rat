// @rat/compiler

export interface CompileOptions {
  filename? : string;                  // decides the mode (.rat / .rat.js) and names the component
  mode?     : 'component' | 'module';  // overrides the filename
  runtime?  : string;                  // import specifier of the runtime, default '@rat/runtime'
  styles?   : Record<string, (code: string, context: { filename: string }) => string>; // preprocessors per <style lang>
  tag?      : string;                  // .rat.js: the template tag compiled as markup, default 'html'
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
export function compileComponent (source: string, options?: CompileOptions): CompileResult;
export function compileModule    (source: string, options?: CompileOptions): CompileResult;
export function parse            (source: string, options?: { blocks?: boolean, filename?: string, offset?: number }): Fragment;

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
}

export type Node = Element | Expression | For | If | Switch | Text;

export interface Fragment {
  type     : 'Fragment';
  children : Node[];
  scripts  : { instance: Code[], module: Code[] };
  styles   : Code[];
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
  svg        : boolean;
  tag        : string;
}

export interface Attribute {
  type  : 'Attribute';
  names : string[];                    // more than one for a prop group (a|b)
  value : { kind: 'true' }
        | { kind: 'string', value: string }
        | { kind: 'expression' } & Code
        | { kind: 'template', parts: (string | Code)[] };
}

export interface Spread extends Code { type: 'Spread'; }

export interface Expression extends Code { type: 'Expression'; }

export interface Text {
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
