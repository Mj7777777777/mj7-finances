# MJ7 Finances

Dépenses et revenus en FCFA, dans deux espaces : **Personnel** et **Activités** (MJ7 PLUGINS, prestations vidéo, prestations son… que tu peux renommer).
L'application s'installe sur Mac, Windows, iPhone et Android, et fonctionne hors connexion.

## Ce qu'elle fait
- Ajout d'une opération en quelques secondes (bouton « + », ou touche N sur ordinateur).
- Tableau de bord du mois avec scène 3D : une pile de pièces par catégorie de dépense. Tu la fais tourner, tu touches une pile pour voir le détail.
- Solde, revenus et dépenses en vue globale, Personnel, Activités ou par activité, et le résultat de chaque activité.
- Budgets mensuels par catégorie : alerte jaune à 80 %, rouge au-delà de 100 %.
- Opérations récurrentes (loyer, abonnements…) ajoutées toutes seules chaque mois.
- Recherche et filtres, modification et suppression.
- Export CSV (Excel) et PDF, sauvegarde et restauration d'un fichier.
- Code à 4 chiffres et Face ID / empreinte.
- Données d'exemple à activer pour tester (Réglages).

## Installer l'application
Ouvre le lien de l'application, puis :
- **iPhone** : dans Safari, bouton Partager, puis « Sur l'écran d'accueil ».
- **Android** : dans Chrome, menu ⋮, puis « Installer l'application ».
- **Windows** : dans Chrome ou Edge, icône d'installation à droite de la barre d'adresse.
- **Mac** : dans Chrome, icône d'installation dans la barre d'adresse ; dans Safari, menu Fichier, puis « Ajouter au Dock ».

## Synchroniser ordinateur et téléphone (facultatif, gratuit)
Sans synchro, les données restent sur chaque appareil. Pour les partager :

1. Crée un compte sur **supabase.com**, puis un nouveau projet (région la plus proche, par exemple Europe).
2. Dans le projet, ouvre **SQL Editor**, colle ce script et clique sur **Run** :

```sql
create table if not exists public.mj7_items (
  id text not null,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  kind text not null,
  data jsonb not null,
  updated_at bigint not null,
  deleted boolean not null default false,
  primary key (user_id, id)
);
alter table public.mj7_items enable row level security;
create policy "Mes données seulement" on public.mj7_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

3. Va dans **Authentication > Email Templates > Magic Link** et remplace le contenu par :
   `Ton code MJ7 Finances : {{ .Token }}`
   (l'app te demande un code à 6 chiffres plutôt qu'un lien).
4. Va dans **Project Settings > API** et copie l'**URL du projet** et la clé **anon public**.
5. Dans l'app, ouvre **Réglages > Synchronisation**, colle l'URL et la clé, puis **Enregistrer**.
6. Entre ton e-mail, touche **Recevoir le code**, tape le code reçu, puis **Se connecter**.
7. Fais pareil sur ton autre appareil, avec le même e-mail.

La clé « anon public » peut être vue sans risque : la règle de sécurité du script fait que chacun ne voit que ses propres données.

## Développement
```
npm install
npm run dev     # aperçu local
npm run build   # version à mettre en ligne (dossier dist)
```
