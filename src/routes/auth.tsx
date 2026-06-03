import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Accedi — Borgo Cultura" }] }),
  component: Auth,
});

function Auth() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (user) navigate({ to: "/account" }); }, [user, navigate]);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl text-center">Area Riservata</h1>
      <p className="mt-2 text-center text-muted-foreground">Accedi o crea un account per prenotare.</p>

      <Tabs defaultValue="login" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Accedi</TabsTrigger>
          <TabsTrigger value="signup">Registrati</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><LoginForm /></TabsContent>
        <TabsContent value="signup"><SignupForm /></TabsContent>
      </Tabs>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error(error.message); else toast.success("Bentornato!");
  }
  return (
    <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
      <div><Label>Email</Label><Input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" /></div>
      <div><Label>Password</Label><Input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" /></div>
      <Button type="submit" disabled={loading} className="w-full">{loading ? "..." : "Accedi"}</Button>
    </form>
  );
}

function SignupForm() {
  const [nome, setNome] = useState(""); const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        emailRedirectTo: `${window.location.origin}/account`,
        data: { nome, telefono },
      },
    });
    setLoading(false);
    if (error) toast.error(error.message); else toast.success("Registrazione effettuata!");
  }
  return (
    <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
      <div><Label>Nome e Cognome</Label><Input required value={nome} onChange={e => setNome(e.target.value)} className="mt-1.5" /></div>
      <div><Label>Telefono</Label><Input value={telefono} onChange={e => setTelefono(e.target.value)} className="mt-1.5" /></div>
      <div><Label>Email</Label><Input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" /></div>
      <div><Label>Password</Label><Input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" /></div>
      <Button type="submit" disabled={loading} className="w-full">{loading ? "..." : "Crea account"}</Button>
    </form>
  );
}
