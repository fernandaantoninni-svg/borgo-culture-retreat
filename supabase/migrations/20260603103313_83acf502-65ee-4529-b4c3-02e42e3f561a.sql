
-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT,
  telefono TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Auto create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, telefono)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'nome', NEW.raw_user_meta_data->>'telefono');
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Reservations
CREATE TABLE public.prenotazioni (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  ospiti INT NOT NULL DEFAULT 2,
  camera TEXT NOT NULL,
  colazione BOOLEAN NOT NULL DEFAULT false,
  note TEXT,
  stato TEXT NOT NULL DEFAULT 'in_attesa',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prenotazioni TO authenticated;
GRANT ALL ON public.prenotazioni TO service_role;
ALTER TABLE public.prenotazioni ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own prenotazioni select" ON public.prenotazioni FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own prenotazioni insert" ON public.prenotazioni FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own prenotazioni update" ON public.prenotazioni FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own prenotazioni delete" ON public.prenotazioni FOR DELETE TO authenticated USING (auth.uid() = user_id);
