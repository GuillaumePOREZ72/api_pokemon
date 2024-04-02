import '../../assets/css/reset.css';
import './style.scss';

const SortFields = ({
    types,
    rarities,
    search,
    setSearch,
    type,
    setType,
    rarity,
    setRarity,
    generateUrl,
    orderBy,
    setOrderBy,
    pagination,
    setPagination
}) => {
    const handleSubmitForm = (event) => {
        event.preventDefault();
        generateUrl();
    };

    const handleResetForm = (event) => {
        event.preventDefault();
        setSearch('');
        setType('all');
        setRarity('all');
        setOrderBy('name');
        setPagination({...pagination, currentPage: 1});
        generateUrl();
    };

    const handleChangeName = (event) => {
        // Pour les recherches contenant des espaces, on remplace les espaces par des * pour que l'API puisse les interpréter
        // Ne pas oublier de les remplacer par des espaces à l'affichage
        setSearch(event.target.value.replace(/\s/g, '*'));
    };

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleChangeRarity = (event) => {
        setRarity(event.target.value);
    };

    const handleChangeOrder = (event) => {
        setOrderBy(event.target.value);
    };

    return (
        <form className="sort-form" onSubmit={handleSubmitForm} onReset={handleResetForm}>
            <div className="sort-form__fields">
                    
                <fieldset className="sort-form__field">
                    <label htmlFor="sort-form__search">Carte</label>
                    <input type="text" id="sort-form__search" placeholder="Rechercher une carte" value={search.replace(/\*/g,' ')} onChange={handleChangeName} />
                </fieldset>
                
                <fieldset className="sort-form__field">
                    <label htmlFor="sort-form__type">Type</label>
                    <select name="sort-form__type" id="sort-form__type" onChange={handleChangeType} value={type}>
                        <option value="all">Tous</option>
                        {types.map((type, index) => (
                            // On anticipe l'entrée en API de nouveaux types contenant des espaces (même si pour le moment ça n'existe pas)
                            <option key={index} value={type.replace(/\s/g, '*')}>{type}</option>
                        ))}
                    </select>
                </fieldset>
                <fieldset className="sort-form__field">
                    <label htmlFor="sort-form__rarity">Rareté</label>
                    <select name="sort-form__rarity" id="sort-form__rarity" value={rarity} onChange={handleChangeRarity}>
                        <option value="all">Toutes</option>
                        {rarities.map((rarity, index) => (
                            // les raretés qui ont un espace dans leur nom doivent être réduites à un seul mot avec un caractère de remplacement pour la fin de chaîne
                            // ex: Rare Holo V => Rare*
                            <option key={index} value={rarity.replace(/\s/g, '*')}>{rarity}</option>
                        ))}
                    </select>
                </fieldset>
                <fieldset className="sort-form__field">
                    <label htmlFor="sort-order">Trier par</label>
                    <select name="sort-order" id="sort-order" value={orderBy} onChange={handleChangeOrder}>
                        <option value="name">nom (A - Z)</option>
                        <option value="-name">nom (Z - A)</option>
                        <option value="cardmarket.prices.trendPrice">Prix du marché (Croissant)</option>
                        <option value="-cardmarket.prices.trendPrice">Prix du marché (Décroissant)</option>
                        <option value="id">id (Croissant)</option>
                        <option value="-id">id (Décroissant)</option>
                    </select>
                </fieldset>
            </div>
            <div className="form-buttons">
                <button type="submit">{'>'} Valider</button>
                <button type="reset" className="sort-form__reset">{'>'} Réinitialiser</button>
            </div>
        </form>
    );
};

export default SortFields;