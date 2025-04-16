import { Spinner } from "@/src/components/spinner"

export function PageLoader() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center text-word-secondary">
      <Spinner size="jumbo" />
    </div>
  )
}
