import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  icon: string
}

export function Aside({ children, icon }: Props) {
  return (
    <div className="px-4 py-2 border border-stone-500 dark:border-stone-300 rounded-lg grid grid-cols-12 items-center">
      <div className="col-span-1 text-3xl">{icon}</div>
      <div className="col-span-11">{children}</div>
    </div>
  )
}
