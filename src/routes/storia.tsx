import { createFileRoute } from "@tanstack/react-router";
import storiaImg from "@/assets/arezzo.jpg";

export const Route = createFileRoute("/storia")({
  head: () => ({
    meta: [
      { title: "La Nostra Storia — Borgo Cultura" },
      { name: "description", content: "Quindici anni di ospitalità sulle colline di Arezzo: la storia di Borgo Cultura." },
    ],
  }),
  component: Storia,
});

function Storia() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src={storiaImg} alt="Arezzo storica" className="absolute inset-0 h-full w-full object-cover" width={1280} height={960} />
        <div className="absolute inset-0 bg-hero" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-end px-4 pb-12 text-primary-foreground">
          <span className="text-xs uppercase tracking-widest text-white/80">Dal 2010</span>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">La nostra storia</h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-16 space-y-6 text-lg leading-relaxed text-foreground/85">
        <p>
          Borgo Cultura nasce nel <strong>2010</strong>, dal sogno di una famiglia aretina di restituire vita a un antico casolare di pietra abbandonato tra gli uliveti delle colline di <strong>Arezzo</strong>, nel cuore della <strong>Toscana</strong>.
        </p>
        <p>
          Dopo un restauro paziente, durato quasi due anni e svolto con maestranze locali, le mura cinquecentesche hanno ritrovato la loro voce: pavimenti in cotto, travi a vista, camini originali — e una sensibilità contemporanea fatta di lino, luce naturale e silenzio.
        </p>
        <p>
          Da <strong>quindici anni</strong> accogliamo viaggiatori da tutto il mondo: chi cerca pace, chi viene per l’arte, chi vuole semplicemente camminare scalzo nell’erba. La nostra posizione è un piccolo privilegio: siamo a soli <strong>15 minuti dal centro storico di Arezzo</strong>, raggiungibili facilmente in auto dalla A1 (uscita Arezzo), e a un’ora dalle principali mete toscane — Firenze, Siena, Cortona, il Chianti.
        </p>
        <p>
          Crediamo in un’ospitalità lenta e onesta. Conosciamo per nome i produttori del miele che servirete a colazione, gli artigiani che hanno fatto i nostri letti, i vignaioli delle bottiglie nella nostra cantina. Ogni ospite, per noi, diventa parte di questa piccola comunità.
        </p>
        <p className="font-display text-2xl text-primary pt-4 border-t border-border">
          Benvenuti a Borgo Cultura. Benvenuti a casa.
        </p>
      </article>
    </>
  );
}
