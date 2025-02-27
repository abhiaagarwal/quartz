import { randomUUID } from "crypto"
import { JSX } from "preact/jsx-runtime"

export type JSResource = {
  loadTime: "beforeDOMReady" | "afterDOMReady"
  moduleType?: "module"
  spaPreserve?: boolean
  async?: boolean
} & (
  | {
      src: string
      contentType: "external"
    }
  | {
      script: string
      contentType: "inline"
    }
)

export function JSResourceToScriptElement(resource: JSResource, preserve?: boolean): JSX.Element {
  const scriptType = resource.moduleType ?? "application/javascript"
  const spaPreserve = preserve ?? resource.spaPreserve
  const async = resource.async ? "async" : null
  if (resource.contentType === "external") {
    return (
      <script
        key={resource.src}
        src={resource.src}
        type={scriptType}
        spa-preserve={spaPreserve}
        {...(async && { async: true })}
      />
    )
  } else {
    const content = resource.script
    return (
      <script
        key={randomUUID()}
        type={scriptType}
        spa-preserve={spaPreserve}
        dangerouslySetInnerHTML={{ __html: content }}
        {...(async && { async: true })}
      ></script>
    )
  }
}

export interface StaticResources {
  css: string[]
  js: JSResource[]
}
