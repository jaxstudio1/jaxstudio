// Browser shim for `undici`.
//
// @vercel/blob's client-upload handler does `import { fetch } from "undici"`
// (and pulls in Headers). undici is Node-only and drags in `node:*` builtins
// that webpack can't bundle for the browser — which is why next.config.ts
// previously aliased undici to `false`. But that left `fetch` undefined, so
// client-side Blob uploads threw `(0, S.fetch) is not a function`.
//
// This shim maps the names @vercel/blob needs onto the native browser globals.
// It's aliased in for the CLIENT bundle only; the server keeps real undici.
const g = globalThis

export const fetch = (...args) => g.fetch(...args)
export const Headers = g.Headers
export const Request = g.Request
export const Response = g.Response
export const FormData = g.FormData
export const File = g.File
export const Blob = g.Blob
export const FileReader = g.FileReader

export default { fetch, Headers, Request, Response, FormData, File, Blob, FileReader }
