import React from "react"

import { Breadcrumbs } from "@/src/components/breadcrumb"
import { cn } from "@/src/util/cn"
import { Link, useRouterState, type LinkProps } from "@tanstack/react-router"

type Crumbs = {
  current: string
  paths: Array<{
    label: string
    to: LinkProps["to"]
  }>
}

type PageLayoutProps = {
  title: React.ReactNode
  description?: React.ReactNode
  titleBadge?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
  crumbs: Crumbs
}

export function PageLayout(props: PageLayoutProps) {
  const pathname = useRouterState().location.pathname

  return (
    <article className="group h-full space-y-4 has-[[data-tabs]]:space-y-0">
      <div className="mb-4 mt-6 flex items-center justify-between">
        <Breadcrumbs.Root>
          <Breadcrumbs.List>
            <Breadcrumbs.Link asChild>
              <Link to="/">Home</Link>
            </Breadcrumbs.Link>

            {pathname !== "/" && <Breadcrumbs.Separator />}

            {props.crumbs.paths.map((c) => (
              <>
                <Breadcrumbs.Link asChild>
                  <Link to={c.to}>{c.label}</Link>
                </Breadcrumbs.Link>
                <Breadcrumbs.Separator />
              </>
            ))}
            <Breadcrumbs.Item>
              <Breadcrumbs.Page>{props.crumbs.current}</Breadcrumbs.Page>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs.Root>

        <div />
      </div>

      <header className="relative flex w-full flex-col gap-4 pb-6">
        <div className="flex w-full justify-between gap-4">
          <div className="flex flex-col gap-1">
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
