import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Coffee, Calendar as CalIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Le mie prenotazioni — Borgo Cultura" }] }),
  component: Account,
});

type Prenotazione = {
  id: string; check_in: string; check_out: string; ospiti: number;
  camera: string; colazione: boolean; note: string | null; stato: string;
};

function Account() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<Prenotazione[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("prenotazioni").select("*").order("check_in", { ascending: false }).then(({ data, error }) => {
      if (error) toast.error(error.message);
      else setItems(data as Prenotazione[]);
      setFetching(false);
    });
  }, [user]);

  async function cancella(id: string) {
    const { error } = await supabase.from("prenotazioni").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setItems(items.filter(i => i.id !== id));
    toast.success("Prenotazione annullata");
  }

  if (loading || !user) return <div className="mx-auto max-w-3xl px-4 py-20">Caricamento…</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-accent">Area riservata</span>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Le mie prenotazioni</h1>
          <p className="mt-2 text-muted-foreground text-sm">Ciao {user.email}</p>
        </div>
        <Link to="/prenota"><Button>Nuova prenotazione</Button></Link>
      </div>

      <div className="mt-10 space-y-4">
        {fetching ? <p className="text-muted-foreground">Caricamento…</p> :
          items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center">
              <CalIcon className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-muted-foreground">Non hai ancora prenotazioni.</p>
              <Link to="/prenota"><Button className="mt-4">Prenota ora</Button></Link>
            </div>
          ) : items.map(p => (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-6 shadow-card flex flex-wrap gap-6 justify-between items-center">
              <div>
                <div className="font-display text-2xl capitalize">{p.camera}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {format(new Date(p.check_in), "d MMM", { locale: it })} → {format(new Date(p.check_out), "d MMM yyyy", { locale: it })}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-2.5 py-1">{p.ospiti} ospiti</span>
                  {p.colazione && <span className="rounded-full bg-accent/20 text-accent-foreground px-2.5 py-1 flex items-center gap-1"><Coffee className="h-3 w-3" /> Colazione inclusa</span>}
                  <span className="rounded-full bg-primary/10 text-primary px-2.5 py-1 capitalize">{p.stato.replace("_", " ")}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => cancella(p.id)}>Annulla</Button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
