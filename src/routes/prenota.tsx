import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { CalendarIcon, Coffee } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/prenota")({
  head: () => ({
    meta: [
      { title: "Prenota — Borgo Cultura" },
      { name: "description", content: "Verifica disponibilità e prenota la tua camera al Borgo Cultura, Arezzo." },
    ],
  }),
  component: Prenota,
});

const camere = [
  { id: "classica", label: "Camera Classica — €120/notte" },
  { id: "superior", label: "Camera Superior — €165/notte" },
  { id: "suite", label: "Suite degli Ulivi — €230/notte" },
];

function Prenota() {
  const { user, loading } = useAuth();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [ospiti, setOspiti] = useState("2");
  const [camera, setCamera] = useState("classica");
  const [colazione, setColazione] = useState(true);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-20">Caricamento…</div>;

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Prenota il tuo soggiorno</h1>
        <p className="mt-3 text-muted-foreground">Per prenotare, accedi o crea un account gratuito.</p>
        <Link to="/auth"><Button className="mt-6">Accedi / Registrati</Button></Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkIn || !checkOut) { toast.error("Seleziona le date del soggiorno"); return; }
    if (checkOut <= checkIn) { toast.error("La data di check-out deve essere dopo il check-in"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("prenotazioni").insert({
      user_id: user!.id,
      check_in: format(checkIn, "yyyy-MM-dd"),
      check_out: format(checkOut, "yyyy-MM-dd"),
      ospiti: parseInt(ospiti),
      camera,
      colazione,
      note: note || null,
    });
    setSubmitting(false);
    if (error) { toast.error("Errore: " + error.message); return; }
    toast.success("Prenotazione inviata! Ti contatteremo a breve.");
    setCheckIn(undefined); setCheckOut(undefined); setNote("");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <span className="text-xs uppercase tracking-widest text-accent">Agenda</span>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Prenota il tuo soggiorno</h1>
      <p className="mt-3 text-muted-foreground">Inserisci le date e i dettagli — confermeremo entro 24 ore.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="grid gap-5 md:grid-cols-2">
          <DatePick label="Check-in" date={checkIn} setDate={setCheckIn} />
          <DatePick label="Check-out" date={checkOut} setDate={setCheckOut} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label>Ospiti</Label>
            <Select value={ospiti} onValueChange={setOspiti}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[1,2,3,4].map(n => <SelectItem key={n} value={String(n)}>{n} {n===1?"ospite":"ospiti"}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Camera</Label>
            <Select value={camera} onValueChange={setCamera}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {camere.map(c => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-4 cursor-pointer hover:bg-secondary transition">
          <Checkbox checked={colazione} onCheckedChange={(v) => setColazione(!!v)} className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-2 font-medium">
              <Coffee className="h-4 w-4 text-accent" /> Aggiungi colazione in casa
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Colazione italiana artigianale servita ogni mattina — €15 a persona / giorno.
            </p>
          </div>
        </label>

        <div>
          <Label>Note (opzionale)</Label>
          <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Richieste speciali, allergie…" className="mt-1.5" rows={3} />
        </div>

        <Button type="submit" disabled={submitting} size="lg" className="w-full">
          {submitting ? "Invio in corso…" : "Conferma prenotazione"}
        </Button>
      </form>
    </div>
  );
}

function DatePick({ label, date, setDate }: { label: string; date?: Date; setDate: (d?: Date) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("mt-1.5 w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: it }) : <span>Seleziona data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} locale={it} disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))} initialFocus className="p-3 pointer-events-auto" />
        </PopoverContent>
      </Popover>
    </div>
  );
}
