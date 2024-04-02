export async function fetchData(setCards, setIsLoadingData, apiUrl, pagination, setPagination) {
    const response = await fetch(apiUrl);
    const json = await response.json();
    setCards(json.data);
    setPagination({...pagination, totalCount: json.totalCount});
    setIsLoadingData(false);
}
// Private functions

export async function fetchTypes(setTypes, setIsLoadingTypes) {
    const response = await fetch("https://api.pokemontcg.io/v2/types");
    const json = await response.json();
    setTypes(json.data);
    setIsLoadingTypes(false);
}

export async function fetchRarity(setRarities, setIsLoadingRarities) {
    const response = await fetch("https://api.pokemontcg.io/v2/rarities");
    const json = await response.json();
    setRarities(json.data);
    setIsLoadingRarities(false);
}