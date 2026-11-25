# MJ7 Finances

Dépenses et revenus en FCFA, dans deux espaces : **Personnel** et **Activités** (MJ7 PLUGINS, prestations vidéo, prestations son… que tu peux renommer).
L'application s'installe sur Mac, Windows, iPhone et Android, et fonctionne hors connexion.

## Ce qu'elle fait
- Ajout d'une opération en quelques secondes (bouton « + », ou touche N sur ordinateur).
- Tableau de bord du mois avec scène 3D : une pile de pièces par catégorie de dépense. Tu la fais tourner, tu touches une pile pour voir le détail.
- Solde, revenus et dépenses en vue globale, Personnel, Activités ou par activité, et le résultat de chaque activité.
- **Répartition du salaire** : saisis chaque mois les revenus du foyer (ton salaire, celui de ta femme, tes activités…), puis répartis-les dans des cases (loyer, nourriture, famille, enfants, argent de poche, épargne…) en FCFA ou en %. Reste à répartir, modèles prêts à l'emploi, « Reçu » qui enregistre le revenu, reprise automatique le mois suivant.
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

## Synchroniser ordinateur et téléphones (facultatif, gratuit)
Sans synchro, les données restent sur chaque appareil. Pour retrouver les mêmes chiffres sur ton ordinateur, ton téléphone et celui de ta femme :

> **Règle d'or : tous les appareils se connectent avec le MÊME e-mail et le MÊME mot de passe.** Chaque e-mail a ses propres données : si ta femme se connecte avec son e-mail à elle, elle aura un compte vide, séparé du tien.

### Étape A — Une seule fois, sur l'ordinateur (création du projet)

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

3. Va dans **Authentication > Sign In / Providers**, ouvre **Email** et **désactive « Confirm email »**, puis **Save**.
   (On se connecte avec un e-mail et un mot de passe : aucun e-mail n'est envoyé, donc pas de limite ni de code à attendre.)
4. Va dans **Project Settings > API** (ou **API Keys**) et copie l'**URL du projet** et la clé **anon public** (parfois appelée **publishable**).
5. Dans l'app, ouvre **Réglages > Synchronisation**, colle l'URL et la clé, puis **Enregistrer**.
6. Entre l'**e-mail du foyer** et choisis un **mot de passe** (8 caractères minimum), puis touche **Créer le compte (1re fois)**.
   Tes données déjà saisies sur l'ordinateur partent alors dans ton compte.

### Étape B — Sur ton téléphone
1. Ouvre le lien de l'application et installe-la (voir plus haut).
2. **Réglages > Synchronisation** : colle la même URL et la même clé (envoie-les-toi par WhatsApp depuis l'ordinateur), puis **Enregistrer**.
3. Entre **le même e-mail et le même mot de passe**, puis touche **Se connecter** (pas « Créer le compte »). Tes chiffres de l'ordinateur arrivent.

### Étape C — Sur le téléphone de ta femme
Exactement comme l'étape B : même URL, même clé, **même e-mail, même mot de passe**, puis **Se connecter**.

C'est fait une seule fois par appareil : ensuite chacun reste connecté.

**Si « E-mail non confirmé » s'affiche** : le compte a été créé avant de désactiver « Confirm email ». Dans Supabase, va dans **Authentication > Users**, supprime l'utilisateur, puis recrée le compte depuis l'app.

### Bon à savoir
- La synchro se fait toute seule quelques secondes après chaque saisie, et à chaque ouverture de l'app. Le badge en haut indique « Synchronisé ». Tu peux aussi forcer : **Réglages > Synchroniser maintenant**.
- Sans internet, tout marche quand même : les saisies partent au retour du réseau.
- Évitez de modifier **la même répartition du mois** sur deux téléphones exactement en même temps : c'est la dernière version enregistrée qui est gardée. Pour les dépenses, aucun souci : chaque opération est indépendante.
- Le code à 4 chiffres / Face ID reste propre à chaque téléphone : ta femme peut mettre le sien.

La clé « anon public » peut être vue sans risque : la règle de sécurité du script fait que chacun ne voit que ses propres données.

## Développement
```
npm install
npm run dev     # aperçu local
npm run build   # version à mettre en ligne (dossier dist)
```
