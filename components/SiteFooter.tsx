import { Container } from "@/components/Container";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50/50 pb-28 sm:pb-12 pt-12">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="font-medium text-stone-900">Ozonated</p>
            <p className="text-sm text-stone-600">
              Luxury spa care and clinical wellness in East London.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Contact</p>
            <div className="space-y-1 text-sm text-stone-600">
              <p>36 Jarvis Road, Berea</p>
              <p>East London, South Africa</p>
              <p>060 775 8011</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Hours</p>
            <div className="space-y-1 text-sm text-stone-600">
              <p>Mon–Fri: 9am–5pm</p>
              <p>Saturday: 9am–12pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Connect</p>
            <a
              href="mailto:info@ozonatedel.co.za"
              className="block text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              info@ozonatedel.co.za
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Ozonated Health & Wellness Center. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
