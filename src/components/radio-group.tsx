import { Label } from "@/src/components/label"
import { cn } from "@/src/util/cn"
import * as RadixRadioGroup from "@radix-ui/react-radio-group"
import { motion } from "motion/react"
import { tv, type VariantProps } from "tailwind-variants"

const root = tv({
  base: "group flex w-fit max-w-md flex-col gap-[--radio-group-gap]",
  variants: {
    layout: {
      default: [
        "[--radio-group-gap:theme(spacing.6)]",
        "[--radio-group-item-gap:theme(spacing.2)]",
      ],
      compact: [
        "[--radio-group-gap:theme(spacing.3)]",
        "[--radio-group-item-gap:theme(spacing.1)]",
      ],
    },
  },
})

interface RadioGroupProps
  extends Omit<RadixRadioGroup.RadioGroupProps, "children">,
    VariantProps<typeof root> {
  layout?: "default" | "compact"
  items: Array<{
    label: string
    value: string
    description?: string
    children?: React.ReactNode
  }>
}

export const RadioGroup = ({ items, layout = "default", ...props }: RadioGroupProps) => {
  return (
    <RadixRadioGroup.Root className={root({ layout })} {...props}>
      {items.map(({ label, value, description }) => {
        return (
          <Label htmlFor={value} key={value} className="group cursor-pointer">
            <RadixRadioGroup.Item
              id={value}
              value={value}
              className={cn(
                "relative cursor-pointer ring-gray-200 transition-all",
                "aspect-square h-[0.875rem] rounded-full ring-[0.09375rem]",
                "data-[state=checked]:ring-purple-800"
              )}
            >
              <RadixRadioGroup.Indicator asChild>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={cn(
                    "absolute inset-0 before:rounded-full",
                    "before:absolute before:inset-0.5 before:bg-purple-800"
                  )}
                />
              </RadixRadioGroup.Indicator>
            </RadixRadioGroup.Item>

            <div className="flex flex-col">
              <span className="font-medium opacity-80 hover:opacity-100">{label}</span>
              {description && (
                <span className="text-sm text-word-secondary">{description}</span>
              )}
            </div>
          </Label>
        )
      })}
    </RadixRadioGroup.Root>
  )
}
