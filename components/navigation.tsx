export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur z-50 border-b border-border animate-in fade-in slide-in-from-top-2 duration-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold text-foreground transition-transform duration-500 hover:-translate-y-0.5">
         Ntihebuwayo Nehemie
        </div>
        
      <div className="hidden md:flex gap-8">
        <a href="#home" className="text-sm text-foreground hover:text-accent transition">
            Home
          </a>
         <a href="#about" className="text-sm text-foreground hover:text-accent transition">
            About
          </a>
          <a href="#services" className="text-sm text-foreground hover:text-accent transition">
            Services
          </a>
       
          <a href="#portfolio" className="text-sm text-foreground hover:text-accent transition">
            Gallery
          </a>
         
          <a href="#contact" className="text-sm text-foreground hover:text-accent transition">
            Contact
          </a>
           <a href="https://docs.google.com/document/d/e/2PACX-1vShTdYlp7HTkt6Z-szlYM8udhlb61s-QiU-_uMq8b4f6UzPWuz-2OQzpHncFvKYNi4xqRhY0WQRY7bi/pub" className="text-sm text-foreground hover:text-accent transition">
            Resume
          </a>
           <a href="https://docs.google.com/document/d/e/2PACX-1vTbm65Df-OiqmLUFR9MzvF87HO8-c0XljJytHh4ksdwhP3CHoS_3mVzTnfNeNwGNAHX9Kdc6jNehiZ3/pub?urp=gmail_link" className="text-sm text-foreground hover:text-accent transition">
            Recomendation
          </a>
          <a href="https://docs.google.com/document/d/e/2PACX-1vQbruMZOR_qmgnFCUyxbXSZu2r8pYbD6auWQvLCPWPUG8r8DGmKpm0VBwfRiouMYW4QGZjshwu57cX1/pub?urp=gmail_link" className="text-sm text-foreground hover:text-accent transition">
         Cover Letter
          </a>         
        </div>
        <div className="md:hidden">
          <button className="text-foreground">Menu</button>
        </div>
      </div>
    </nav>
  )
}
