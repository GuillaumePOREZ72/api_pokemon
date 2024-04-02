# S08E11 - O'kemon cards

## Objectifs

Notre client est un collectioneur de cartes. On souhaite créer une application qui permet de lister les cartes pokémon avec leur prix sur le marché.

## Instructions

Après avoir pris connaissance du projet, voici ce que tu devras faire:

- Appelle [cette API](https://docs.pokemontcg.io/) pour charger les données des cartes
- Affiche chaque carte avec son prix sur le marché (trendPrice)
  - :warning: Certaines cartes n'ont pas de prix enregistré, vérifie bien que la carte dispose d'une propriété `cardmarket`. Si elle n'en a pas, affiche "N/A" à la place du prix.
- En cliquant sur le prix on est renvoyé sur la page du marché de la carte

- Mets en place un formulaire de recherche:
  - Par nom de carte
  - Par type
  - Par rareté
  - ordonner par: nom croissant / décroissant, prix croissant / prix décroissant, id croissant / id décroissant
  - Un bouton de validation, pour éviter d'envoyer trop de requêtes à l'API
  - Un bouton de réinitialisation pour remettre les filtres à zéro

### Générer une nouvelle URL

Maintenant qu'on connaît useEffect, on va l'utiliser pour gérer le chargement et le tri des données. Pour cela, on va devoir générer une nouvelle URL à chaque fois que l'utilisateur valide son formulaire.

Lis la documentation pour comprendre à quoi doit ressembler l'URL pour chaque filtre. 

Une URL est une chaîne, tu vas devoir concaténer plusieurs chaînes pour obtenir l'URL finale. Pour cela, on peut utiliser l'opérateur `+` pour concaténer des chaînes. 

<details>
  <summary>Exemple</summary>

```js
// L'URL de base sera toujours la même
let url = 'https://api.pokemontcg.io/v2/cards?';
// L'ordre aura toujours une valeur par défaut, on l'ajoute
url += '&orderBy=' + orderBy;

// Les autres options de recherche étant facultatives, on vérifie qu'elles ne sont pas vides avant de les ajouter à l'URL
if (search !== '' || type !== 'all' || rarity !== 'all') {
  // Si au moins un des champs de recherche n'est pas vide, on ajoute le paramètre "q" à l'URL
  let toAdd = '&q=';

  // Pour la recherche par nom, on ajoute le terme de recherche à la chaîne
  toAdd += search !== '' ? 'name:' + search + '*' : '';

  // On vérifie si on a déjà des paramètres dans la query 
  // (Si le nombre de caractères est supérieur à 3, c'est à dire qu'on a plus de caractères que '&q=')
  // Si on a déjà des paramètres, on ajoute un espace avant d'ajouter le prochain paramètre, sinon on ajoute le paramètre sans espace
  toAdd += url.length > 3 ? (type !== 'all' ? ' types:' + type : '') : (type !== 'all' ? 'types:' + type : '');
  toAdd += url.length > 3 ? (rarity !== 'all' ? ' rarity:' + rarity : '') : (rarity !== 'all' ? 'rarity:' + rarity : '');

  // On ajoute la query à l'URL
  url += toAdd;
}
```

</details>

Pour remplacer des caractères facultatifs, la documentation indique d'utiliser le caractère `*`. Par exemple, pour rechercher les cartes dont le nom contient "pika", on doit utiliser l'URL suivante:

`https://api.pokemontcg.io/v2/cards?q=name:pika*`

:warning: Les espaces servent à séparer les différents filtres de query. Si un champ de recherche contient un espace, l'API va interpréter le terme après l'espace comme un champ de recherche (par exemple pour la rareté `Hyper Rare`). Il faut donc remplacer les espaces dans les champs de recherche par des `*` pour éviter que l'URL ne soit malformée. 

Pour remplacer les espaces dans une chaîne par des `*` tu peux utiliser `string.replace(/\s/g, '*')` qui remplacera tous les espaces par des `*`. 

## Bonus - Spinner

Un composant Spinner est disponible dans le projet, il permet d'afficher un spinner de chargement.

Affiche ce spinner pendant le chargement des données, et cache le quand les données sont chargées.

## Bonus - Pagination

Mets en place un système de pagination. L'API peut renvoyer une grande quantité de résultats avec un maximum par page, et il est possible de demander une page spécifique ainsi que de voir le nombre de résultats totaux disponibles.
