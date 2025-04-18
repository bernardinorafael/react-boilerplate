import React from "react"

import { Button } from "@/src/components/button"
import { cn } from "@/src/util/cn"
import { useNavigate, type LinkProps } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

type PageLayoutProps = {
  title: React.ReactNode
  description?: React.ReactNode
  titleBadge?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
  goBackLink?: {
    to: LinkProps["to"]
    label: string
  }
}

export function PageLayout(props: PageLayoutProps) {
  const navigate = useNavigate()

  return (
    <article className="group h-full space-y-4 has-[[data-tabs]]:space-y-0">
      <header className="relative flex w-full flex-col gap-4 pb-6">
        <div className="flex w-full justify-between gap-4">
          <div className="flex flex-col gap-1">
            {props.goBackLink && (
              <Button
                variant="link"
                className="self-start text-purple-800"
                onClick={() => navigate({ to: props.goBackLink?.to })}
              >
                <div className="flex items-center gap-1">
                  {props.goBackLink.label}
                  <ArrowRight size={14} className="stroke-[2.5px] text-word-secondary" />
                </div>
              </Button>
            )}

            <section className="flex items-center gap-2">
              <h2 className="truncate text-2xl font-semibold tracking-tight [&+*]:shrink-0">
                {props.title}
              </h2>

              <span className={cn(!props.titleBadge && "hidden")}>
                {props.titleBadge}
              </span>
            </section>

            <p className="text-base text-word-secondary">{props.description}</p>
          </div>

          {props.actions && (
            <div className="flex shrink-0 items-center gap-3 justify-self-end">
              {props.actions}
            </div>
          )}
        </div>
      </header>

      {props.children}
    </article>
  )
}
