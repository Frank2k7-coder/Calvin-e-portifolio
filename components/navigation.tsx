export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur z-50 border-b border-border animate-in fade-in slide-in-from-top-2 duration-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold text-foreground transition-transform duration-500 hover:-translate-y-0.5">
         Calvin Nehemie
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#portfolio" className="text-sm text-foreground hover:text-accent transition">
            Gallery
          </a>
          <a href="#about" className="text-sm text-foreground hover:text-accent transition">
            About
          </a>
          <a href="#contact" className="text-sm text-foreground hover:text-accent transition">
            Contact
          </a>
        </div>
        <div className="md:hidden">
          <button className="text-foreground">Menu</button>
        </div>
      </div>
    </nav>
  )
}
