export function SiteHeader() {
  return (
    <header className="relative z-30 flex items-center justify-between px-6 py-5 md:px-10">
      <div className="flex items-center gap-10">
        <span className="font-mono text-sm font-medium tracking-wide text-foreground">
          Budarina
        </span>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          <a href="#" className="font-mono text-xs text-foreground underline-offset-4 hover:underline">
            Home
          </a>
          <a href="#" className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            Destinations
          </a>
          <a href="#" className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            Community
          </a>
        </nav>
      </div>
      <button
        type="button"
        className="rounded-sm bg-primary px-4 py-1.5 font-mono text-xs text-primary-foreground transition-opacity hover:opacity-85"
      >
        Configure
      </button>
    </header>
  )
}
