import Link from 'next/link'
import { Instagram, Facebook, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Videos', href: '#videos' },
  ]

  const socials = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:nehemie@example.com' },
  ]

  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold mb-4">Nehemie Calvin</h3>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              S5 student & photographer capturing authentic moments through the lens of science and artistry.
            </p>
            <div className="flex gap-3">
              {socials.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-background/70">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-accent transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>Portrait Photography</li>
              <li>Event Coverage</li>
              <li>Lifestyle Shoots</li>
              <li>Photo Editing</li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h4 className="font-semibold mb-4">Let's Work Together</h4>
            <p className="text-background/70 text-sm mb-6">
              Have a project in mind? I'd love to hear from you.
            </p>
            <Link
              href="#contact"
              className="inline-block px-6 py-3 bg-accent text-foreground font-semibold rounded-lg hover:opacity-90 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <p>&copy; {currentYear} Nehemie Calvin Photography. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition">Privacy Policy</a>
            <a href="#" className="hover:text-background transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
