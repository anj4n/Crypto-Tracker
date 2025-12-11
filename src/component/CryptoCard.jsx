import { formatNpr } from "../utils/FormatPrice";
import { formatMarketCap } from "../utils/FormatMarketCap";
import { Link } from "react-router-dom";

const CryptoCard = ({ crypto }) => {
  return (
    <Link to={`/coin/${crypto.id}`} style={{ textDecoration: "none" }}>
      <div className="crypto-card">
        <div className="crypto-header">
          <div className="crypto-info">
            <img src={crypto.image} alt="logo" />
            <div className="crypto-name">
              <h3>{crypto.name}</h3>
              <p className="symbol">{crypto.symbol.toUpperCase()}</p>
              <span className="rank">#{crypto.market_cap_rank}</span>
            </div>
          </div>
        </div>
        <div className="crypto-price">
          <p className="price">{formatNpr(crypto.current_price)}</p>
          <p
            className={`change ${crypto.price_change_percentage_24h >= 0 ? "positive " : "negative "} `}
          >
            {crypto.price_change_percentage_24h >= 0 ? "⬆️ " : "⬇️ "}{" "}
            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}
          </p>
        </div>

        <div className="coin-stats">
          <div className="stat">
            <span className="stat-label">Maket cap</span>
            <span className="stat-value">
              {formatMarketCap(crypto.market_cap)}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">volume</span>
            <span className="stat-value">
              {formatMarketCap(crypto.total_volume)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;
