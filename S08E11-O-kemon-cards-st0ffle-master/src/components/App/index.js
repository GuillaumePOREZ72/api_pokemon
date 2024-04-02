import '../../assets/css/reset.css';
import './style.scss';
import SortFields from '../SortFields';
import Card from '../Card';
import Spinner from '../Spinner';
import Pagination from '../Pagination';
import { fetchTypes, fetchRarity, fetchData } from './apiFunctions.js';
import { useState, useEffect } from "react";

import './style.scss';

const App = () =>  {
    const [cards, setCards] = useState([]);
    const [apiUrl, setApiUrl] = useState('https://api.pokemontcg.io/v2/cards?pageSize=5');
    const [types, setTypes] = useState([]);
    const [rarities, setRarities] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isLoadingTypes, setIsLoadingTypes] = useState(true);
    const [isLoadingRarities, setIsLoadingRarities] = useState(true);

    const [search, setSearch] = useState('');
    const [type, setType] = useState('all');
    const [rarity, setRarity] = useState('all');
    const [orderBy, setOrderBy] = useState('name');

    const [pagination, setPagination] = useState({
        currentPage: 1,
        perPage: 5,
        totalCount: 0
    });

    generateUrl = () => {
        let url = 'https://api.pokemontcg.io/v2/cards?';
        url += 'pageSize=' + pagination.perPage;
        url += '&page=' + pagination.currentPage;
        url += '&orderBy=' + orderBy;

        if (search !== '' || type !== 'all' || rarity !== 'all') {

            let toAdd = '&q=';

            toAdd += search !== '' ? 'name:' + search + '*' : '';

            // Si on a déjà des paramètres dans l'URL (si la chaîne qu'on veut ajouter contient plus de caractères que '&q=')
            // on ajoute un espace avant d'ajouter les paramètres de recherche
            toAdd += url.length > 3 ? (type !== 'all' ? ' types:' + type : '') : (type !== 'all' ? 'types:' + type : '');
            toAdd += url.length > 3 ? (rarity !== 'all' ? ' rarity:' + rarity : '') : (rarity !== 'all' ? 'rarity:' + rarity : '');

            url += toAdd;
        }
        setApiUrl(url);
    };

    
    useEffect(() => {
        fetchTypes(setTypes, setIsLoadingTypes);
        fetchRarity(setRarities, setIsLoadingRarities);
    }, []);

    useEffect(() => {
        generateUrl();
    }, [pagination]);
    
    useEffect(() => {
        setIsLoadingData(true);
        fetchData(setCards, setIsLoadingData, apiUrl, pagination, setPagination);
        
    }, [apiUrl]);


    

    return (    
        <>    
        {(isLoadingTypes || isLoadingRarities) && <Spinner />}
        {!isLoadingTypes && !isLoadingRarities && 
                <SortFields 
                types={types} 
                rarities={rarities} 
                search={search} 
                setSearch={setSearch}
                type={type}
                setType={setType}
                rarity={rarity}
                setRarity={setRarity}
                generateUrl={generateUrl}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                pagination={pagination}
                setPagination={setPagination}
            />
        }    
        {isLoadingData && <Spinner /> }
        {!isLoadingData &&

        
        <div className="cards-list">
            
        {cards.map(card => (
            <Card 
                key={card.id} 
                trendPrice={card.cardmarket ? card.cardmarket.prices.trendPrice : 'N/A'} 
                linkTrend={card.cardmarket  ? card.cardmarket.url : 'N/A'} 
                cardImg={card.images.large ? card.images.small : 'N/A'}
            />
            ))}
        </div>
        }

        {(pagination.totalCount > pagination.perPage && !isLoadingData) && 
            <Pagination
                pagination={pagination}
                setPagination={setPagination}
            />
        }
        </>
    );
}


export default App;