import { cn } from "@/src/util/cn"

type FieldsetProps = {
  legend: string
  description: string[]
  children: React.ReactNode
}

export function Fieldset({ legend, description, children }: FieldsetProps) {
  return (
    <fieldset
      className={cn(
        'gap-y-2 [--fieldset-checkbox-offset:1.625rem] [grid-template-areas:"legend_form"_"desc_form"]',
        "relative grid grid-cols-[minmax(0,2fr),minmax(0,3fr)] grid-rows-[min-content,minmax(0,1fr)] gap-x-16"
      )}
    >
      <legend className="contents text-base font-medium text-word-primary [grid-area:legend]">
        {legend}
      </legend>

      <div
        className={cn(
          "flex flex-col gap-y-[inherit] text-sm font-normal text-word-secondary [grid-area:desc]"
        )}
      >
        {description.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="flex w-full max-w-prose flex-col gap-4 [grid-area:form]">
        {children}
      </div>
    </fieldset>
  )
}
