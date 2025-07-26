import { ReactNode } from "react"

interface SectionHeaderProps {
  title: string | ReactNode
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ title, subtitle, centered = true, className = "" }: SectionHeaderProps) {
  return (
    <div className={`space-y-4 md:space-y-6 mb-12 md:mb-16 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}