import { buttonVariants, type ButtonProps } from "@/src/components/button"
import { useFieldControl } from "@/src/components/field"
import { Spinner } from "@/src/components/spinner"
import { cn } from "@/src/util/cn"
import * as RadixSelect from "@radix-ui/react-select"
import { TickCircle } from "iconsax-react"
import { ChevronsUpDown } from "lucide-react"

export function Select({
  id,
  items,
  prefix,
  className,
  placeholder = "Selecione",
  triggerVariant = "secondary",
  triggerSize = "base",
  loading = false,
  position = "popper",
  ...props
}: Pick<
  RadixSelect.SelectProps,
  "defaultValue" | "onValueChange" | "value" | "disabled" | "name"
> & {
  id?: string
  prefix?: string
  triggerVariant?: ButtonProps["variant"]
  triggerSize?: ButtonProps["size"]
  className?: string
  loading?: boolean
  position?: "popper" | "fixed"
  placeholder?: string
  items: Array<{
    label: string
    description?: string
    disabled?: boolean
    value: string
  }>
}) {
  const control = useFieldControl({ element: "button", props: { id } })

  return (
    <RadixSelect.Root
      disabled={props.disabled}
      onValueChange={props.onValueChange}
      defaultValue={props.defaultValue}
      value={props.value}
    >
      <RadixSelect.Trigger
        {...control.props}
        aria-haspopup="listbox"
        aria-controls="select-listbox"
        disabled={props.disabled || loading}
        className={cn(
          "w-full",
          buttonVariants({
            size: triggerSize,
            variant: triggerVariant,
          }),
          className
        )}
      >
        <div className="mr-2 flex items-center gap-1.5">
          {prefix && <span className="text-word-secondary">{prefix}</span>}
          <RadixSelect.Value placeholder={placeholder} />
        </div>
        {loading ? (
          <Spinner size="sm" className="ml-auto" />
        ) : (
          <ChevronsUpDown size={14} className="ml-auto opacity-50" />
        )}
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          align="end"
          className={cn(
            "p-1",
            "border",
            "max-h-52",
            "z-select",
            "bg-white",
            "shadow-lg",
            "text-base",
            "rounded-lg",
            "min-w-[8rem]",
            "text-word-primary",
            "border-border-50",
            "overflow-y-auto",
            "data-[state=open]:animate-in",
            "data-[state=closed]:animate-out",
            loading && "pointer-events-none",
            position !== "fixed" && [
              "data-[state=closed]:zoom-out-95",
              "data-[state=open]:zoom-in-95",
              "data-[state=closed]:fade-out-0",
              "data-[state=open]:fade-in-0",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2",
              "data-[side=top]:slide-in-from-bottom-2",
            ],
            position === "popper" && [
              "min-w-[--radix-select-trigger-width]",
              "data-[state=closed]:zoom-out-95",
              "data-[state=open]:zoom-in-95",
            ]
          )}
          {...(position === "popper" && {
            position: "popper",
            sideOffset: 6,
          })}
        >
          <RadixSelect.Viewport>
            <RadixSelect.Group>
              {items.map((item) => (
                <RadixSelect.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className={cn(
                    "flex",
                    "p-1.5",
                    "gap-4",
                    "relative",
                    "font-medium",
                    "select-none",
                    "items-center",
                    "outline-none",
                    "rounded",
                    "text-word-primary",
                    "focus:bg-gray-50",
                    "[--menu-item-icon-color:theme(colors.gray.500)]",
                    "cursor-pointer",
                    // Disabled
                    "data-[disabled]:pointer-events-none",
                    "data-[disabled]:opacity-50"
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
                    {item.description && (
                      <span className="text-sm text-word-secondary">
                        {item.description}
                      </span>
                    )}
                  </div>
                  <RadixSelect.ItemIndicator className="ml-auto">
                    <TickCircle size={16} variant="Bold" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Group>
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
