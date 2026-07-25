# Lupo — Direction artistique

**Concept : « La carte du loup »**

Le site ne réinvente rien : il prolonge à l'écran le langage déjà posé par le logo et
par la carte papier. Fond blanc, encre verte, prix en orange, ingrédients en
monospace, encadrés à coins ronds pour les *bizzi* et les *supp'*, feuille verte pour
le végétarien. Le loup du logo — tête qui hurle en haut, queue en bas — encadre la
page comme il encadre le mot LUPO.

---

## Sources

- **Logo officiel** (fourni par le client) — palette relevée au pixel, découpé en
  quatre assets réutilisables.
- **Carte papier officielle** (fournie par le client) — reprise intégralement :
  entrées, salade, pizze, bizzi, supp', mentions de bas de page.
- Photo intérieure Google Maps (janv. 2024) pour la description de la salle.
- Avis Google via RestaurantGuru, page Naofood pour la livraison.

## Palette — relevée sur le logo

| Rôle | Hex | Origine |
|---|---|---|
| Blanc | `#FFFFFF` | fond de la carte papier |
| Papier | `#FBFCFA` | section avis |
| Sauge | `#8EB19F` | le loup du logo |
| Sauge clair | `#D5E2DA` | filets, séparateurs |
| Sauge pâle | `#EEF4F0` | fond de la section « Le bizzo » |
| Orange | `#EA5B0C` | le mot LUPO, tous les prix, les suppléments |
| Vert foncé | `#384D2E` | la signature du logo, tous les titres |

Aucune autre couleur. Les trois teintes viennent littéralement du fichier logo
(comptage des pixels), pas d'une interprétation.

## Typographie

- **Fraunces** (variable, `SOFT` 60 / `WONK` 1) — titres uniquement. C'est le
  meilleur équivalent libre du serif épais et légèrement gouailleur employé sur la
  carte papier pour « entrées », « pizze », « bizzi ».
- **IBM Plex Mono** — absolument tout le reste : navigation, ingrédients, prix,
  paragraphes. La carte papier est intégralement en monospace, le site aussi.

Deux familles, pas une de plus.

## Assets logo (`assets/`)

Extraits du PNG fourni, fond rendu transparent, filtrage par teinte :

| Fichier | Usage |
|---|---|
| `logo-lupo.png` | lockup complet — pied de page, Open Graph |
| `lupo-seul.png` | wordmark orange seul — en-tête |
| `mot-lupo.png` | wordmark + signature — hero |
| `loup-tete.png` | tête qui hurle — en-tête, filigranes |
| `loup-queue.png` | queue — filigranes hero et « La maison » |

Ce sont des bitmaps. **À demander au client : le logo en SVG ou en AI/EPS**, pour un
rendu net sur tous les écrans et pour pouvoir recolorer le loup en CSS.

## Ouverture

Un rideau qui se lève en deux temps, ~2,4 s au total :

1. Panneau vert foncé plein écran. Le loup se dévoile par le bas (`clip-path`
   `inset(100% 0 0 0)` → `inset(0)`) en montant de 16 px — il se dresse pour hurler.
2. À 440 ms, le mot LUPO monte et apparaît. À 640 ms, un filet sauge se trace
   horizontalement. À 780 ms, la signature « pizza, bizzo & limoncello ».
3. À 1 450 ms, **double levée** : le panneau vert part vers le haut, le panneau sauge
   qui était dessous suit 130 ms plus tard. Le contenu du hero monte 170 ms après le
   départ du rideau, pour se poser juste derrière lui.

Aucun texte n'est rendu en webfont pendant l'ouverture — le loup et le mot LUPO sont
les PNG du logo, préchargés. Pas de FOUT, pas de saut.

Elle joue **à chaque chargement**, et la page repart toujours du haut. Trois choses
s'en assurent :

- `history.scrollRestoration = 'manual'` — déclaré en ligne dans le `<head>`, pas
  dans `script.js`, sinon le navigateur a déjà restauré la position au moment où le
  script s'exécute ;
- l'ancre éventuelle est retirée de l'URL (`replaceState`), pour qu'un rechargement
  depuis `#carte` ne saute pas à la carte ;
- `scrollTo(0, 0)` juste avant de verrouiller le scroll.

**Conséquence à connaître :** un lien profond vers une section (`…/#carte` partagé de
l'extérieur) ouvre désormais le hero avec l'animation, pas la section visée. C'est le
prix de « l'ouverture à chaque fois ».

Elle reste sautée si `prefers-reduced-motion` est actif, et s'interrompt au premier
clic ou à la première touche. Le scroll est verrouillé le temps du rideau, libéré dès
qu'il part.

## Motion

- Filigranes de loup en **translation** au scroll (parallaxe légère, `translate3d`).
- Apparitions : opacité + 18 px de translation Y, `cubic-bezier(.2,.6,.3,1)`.
- **Aucun `scale` sur les images.** `prefers-reduced-motion` coupe tout.

## Mobile

Testé à 390 px. Deux corrections après relecture :

- **Prix qui sortaient de l'écran.** Les noms longs (« chiffonade de mortadelle de
  Bologne », « burrata Laiterie Nantaise ») poussaient le prix hors cadre. Le nom
  peut désormais rétrécir et passer à la ligne (`flex:0 1 auto` + `min-width:0`), le
  filet pointillé disparaît sous 760 px et le prix reste collé à droite.
- **Monospace trop gros.** Sur 390 px l'IBM Plex Mono mangeait la largeur ; tailles
  réduites pour les ingrédients, le chapô et le lede.

Le bandeau s'empile verticalement sur mobile, sans ses séparateurs `·`.

---

## Contenu

### Repris tel quel de la carte papier
Entrées (7 lignes, 4,5 € à 10 €), salade à 15 €, huit pizze de 12,50 € à 16,50 €,
trois bizzi (8,50 € seul / 14 € en formule dessert & boisson, déjeuner uniquement,
au choix jambon / bonite / tofu au zaatar), cinq suppléments, et la mention
« prix nets, service compris, tableau des allergènes disponible à la caisse ».

Les mentions de suppléments propres à chaque pizza sont conservées : burrata sur la
Margarita et la Hot & spicy, verre de Nell sur la 4 fromages, chorizo sur le Bol
d'air breton.

### Dolci et boissons — sourcés ailleurs, sans prix
Ces deux sections manquent à la carte papier. Elles ont été reconstituées :

- **Dolci** — tiramisu et fondant au chocolat, présents sur la page de livraison et
  cités dans plusieurs avis Google (« un tiramisu cuit à la perfection »).
- **Boissons** — relevées sur l'ardoise « BOISSONS MAISON » lisible derrière le
  comptoir sur une photo du lieu. Pour commencer : limoncello spritz, Lupo spritz,
  Ginger Hemingway, Negroni, Picaros sour. Pour terminer : gin-to, limoncello,
  amaretto, mirtilla, grappa.
- **Vins nature** — les quatre bouteilles de la page de livraison, avec leur domaine.

**Aucun prix n'est publié sur ces trois listes**, et c'est délibéré : l'ardoise date
de janvier 2024, donc plus de deux ans. Le site affiche « prix du jour à l'ardoise »,
ce qui est à la fois vrai et fidèle au fonctionnement de la maison. Dès que le client
donne les tarifs, il suffit d'ajouter un `<span class="prix">` dans chaque `.ligne`,
comme sur les pizze.

Les noms de l'ardoise ont été relus sur agrandissement. Deux points à faire valider :
**Picaros sour** (même nom que la pizza, l'écriture est ambiguë) et **mirtilla**.

### Corrigé depuis la première version
Les prix trouvés en ligne (page de livraison) étaient **tous faux** — ils incluaient
une marge de plateforme. La carte papier fait foi. De même, la spécialité du midi
s'écrit **bizzo / bizzi**, pas « pizzo ».

### À confirmer avec le client
1. **Horaires précis.** La carte dit « tous les jours sur place et à emporter, samedi
   et dimanche dîner uniquement » — ce que le site reprend. Restent à valider les
   heures exactes : le site affiche lun–ven 12 h – 14 h et 18 h 30 – 22 h 30, samedi
   et dimanche 18 h 30 – 22 h 30.
2. **Les prix des dolci et des boissons.** Ces deux sections ne figurent pas sur la
   carte papier fournie ; leur contenu vient d'ailleurs (voir ci-dessous) et
   **aucun prix n'est affiché**. À compléter dès réception.
3. **Réservation en ligne.** Google renvoie vers laddition.com, lien introuvable.
   Le site pousse l'appel téléphonique en attendant.
4. **Mentions légales** : raison sociale, SIRET, RCS, TVA, directeur de la publication
   — champs `[à compléter]` dans `mentions-legales.html`.
5. **« 30 couverts »** est une estimation d'après les avis. À corriger si besoin.

## Photos

Les six photos de `photos/` viennent de la page Naofood et sont **en basse
définition** (256 × 256 px, 480 × 270 px pour le bizzo). Elles tiennent à la taille
d'affichage actuelle, pas au-delà.

**À demander au client :** la façade rue Dobrée, la salle et sa fresque, le comptoir
aux bocaux, 3 ou 4 pizze en lumière naturelle, un bizzo tenu à la main en cadrage
vertical pour le mobile.

## Fichiers

```
index.html            page unique
styles.css            DA complète
script.js             apparitions + parallaxe (vanilla, sans dépendance)
assets/               5 déclinaisons du logo, fond transparent
photos/               6 images basse définition, à remplacer
mentions-legales.html
confidentialite.html
robots.txt / sitemap.xml
```

Statique pur, aucune dépendance JS. Prêt à déployer sur Vercel.
Le domaine `lupo-nantes.fr` des balises canoniques et du sitemap est un placeholder.
