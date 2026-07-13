'use client'

export type View = 'scene' | 'gallery'

export function SiteHeader({
  view,
  onViewChange,
}: {
  view: View
  onViewChange: (view: View) => void
}) {
  return (
    <header className="relative z-30 flex items-center px-6 py-5 md:px-10">
      <div className="flex items-center gap-10">
        <span className="font-mono text-sm font-medium tracking-wide text-foreground">
          Budarina
        </span>
        <nav aria-label="Main" className="flex items-center gap-7">
          <button
            type="button"
            onClick={() => onViewChange('scene')}
            aria-current={view === 'scene' ? 'page' : undefined}
            className={`font-mono text-xs underline-offset-4 transition-colors hover:underline ${
              view === 'scene' ? 'text-foreground underline' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Scene
          </button>
          <button
            type="button"
            onClick={() => onViewChange('gallery')}
            aria-current={view === 'gallery' ? 'page' : undefined}
            className={`font-mono text-xs underline-offset-4 transition-colors hover:underline ${
              view === 'gallery' ? 'text-foreground underline' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Gallery
          </button>
        </nav>
      </div>
    </header>
  )
}
