import type { TagsEnum } from "@/src/util/http/tags"

export class HTTPError extends Error {
  tag: TagsEnum

  constructor(params: { tag: TagsEnum; message: string }) {
    super(params.message)

    this.name = "HTTPError"
    this.tag = params.tag

    Object.setPrototypeOf(this, HTTPError.prototype)
  }
}

export function isHTTPError(error?: unknown): error is HTTPError {
  return (
    typeof error === "object" && error !== null && "message" in error && "tag" in error
  )
}
