import { cn } from "@/src/util/cn"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import Avatar from "boring-avatars"

export function AvatarPreview({
  name,
  src = null,
  size = "base",
}: {
  name?: string
  size?: "xs" | "sm" | "base" | "lg" | "xl"
  src: string | null | undefined
}) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex shrink-0 rounded-full",
        size === "xs" && "size-5",
        size === "sm" && "size-6",
        size === "base" && "size-10",
        size === "lg" && "size-14",
        size === "xl" && "size-20"
      )}
    >
      <AvatarPrimitive.Image
        src={src!}
        alt={`${name}'s profile image`}
        className={cn("size-full rounded-full object-cover object-center")}
      />
      <AvatarPrimitive.Fallback>
        <div className="aspect-square size-full rounded-full centered">
          <Avatar
            name={name}
            colors={["#5b1d99", "#0074b4", "#00b34c", "#ffd41f", "#fc6e3d"]}
            variant="marble"
          />
        </div>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
