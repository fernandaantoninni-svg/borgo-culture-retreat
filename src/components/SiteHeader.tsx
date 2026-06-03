import { Link } from "@tanstack/react-router";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/storia", label: "La Nostra Storia" },
  { to: "/prenota", label: "Prenota" },
  { to: "/luoghi", label: "Cosa Vedere" },
  { to: "/contatti", label: "Contatti" },
];

export function SiteHeader() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-12">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-xl tracking-tight">Borgo Cultura</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="text-foreground/70 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link to="/account"><Button variant="ghost" size="sm">Area Riservata</Button></Link>
              <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>Esci</Button>
            </>
          ) : (
            <Link to="/auth"><Button size="sm">Accedi / Registrati</Button></Link>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="flex flex-col px-4 py-3 gap-3">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-1 text-sm">
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/account" onClick={() => setOpen(false)} className="py-1 text-sm">Area Riservata</Link>
                <button onClick={() => supabase.auth.signOut()} className="py-1 text-sm text-left">Esci</button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="py-1 text-sm">Accedi / Registrati</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
