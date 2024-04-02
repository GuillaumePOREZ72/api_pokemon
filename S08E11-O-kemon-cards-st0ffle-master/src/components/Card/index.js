import '../../assets/css/reset.css';
import './style.scss';

const Card = ({
    lowPrice,
    trendPrice,
    linkTrend,
    cardImg
}) =>  {
    return (   
        <div className="card">	
            <img className="card__picture" src={cardImg} />
            <div className="card__mask"></div>
            <a target="_blank" href={linkTrend} className="card__price">
                <span className="price trendPrice">{trendPrice} $</span>
            </a>
        </div>
    );
}


export default Card;

