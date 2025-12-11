import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const CoinPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`,
        );
        setCoin(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoin();
  }, [id]);

  if (!coin) return <h1 className="loading">Loading...</h1>;

  return (
    <div className="coin-app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Crypto Tracker</h1>
          </div>
          <button className="back-button" onClick={() => navigate("/")}>
            To-Home
          </button>
        </div>
      </header>

      <div className="coin-detail">
        <div className="coin-header">
          <div className="coin-title">
            <img src={coin.image.large} alt={coin.name} />
            <div>
              <h1>{coin.name}</h1>
              <p className="symbol">{coin.symbol.toUpperCase()}</p>
            </div>
            <div className="coin-price">
              <p className="price">
                <h2 className="price">
                  NPR{" "}
                  {(coin.market_data.current_price.usd * 133).toLocaleString()}
                </h2>
              </p>
              <p> Rank: #{coin.market_cap_rank}</p>
            </div>
          </div>

          <div className=" price-change">
            <p>
              <b>24h Change:</b>{" "}
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p>
              <b>7 Day Change:</b>{" "}
              {coin.market_data.price_change_percentage_7d.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="market-detail" style={{ marginTop: "2rem" }}>
          <h2>Market Details</h2>

          <p>
            <b>Market Cap:</b> $
            {coin.market_data.market_cap.usd.toLocaleString()}
          </p>

          <p>
            <b>Fully Diluted Valuation:</b> $
            {coin.market_data.fully_diluted_valuation.usd.toLocaleString()}
          </p>

          <p>
            <b>24h Volume:</b> $
            {coin.market_data.total_volume.usd.toLocaleString()}
          </p>

          <p>
            <b>Circulating Supply:</b>
            {coin.market_data.circulating_supply.toLocaleString()}
          </p>

          <p>
            <b>Total Supply:</b>
            {coin.market_data.total_supply?.toLocaleString() || "N/A"}
          </p>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <h2>About {coin.name}</h2>

          <p className="about"
            dangerouslySetInnerHTML={{
              __html: coin.description.en?.substring(0, 500) + "...",
            }}
          />
        </div>

        <div style={{ marginTop: "2rem" }}>
          <h2>Additional Info</h2>

          <p>
            <b>All-Time High (ATH):</b> ${coin.market_data.ath.usd}
          </p>
          <p>
            <b>All-Time Low (ATL):</b> ${coin.market_data.atl.usd}
          </p>

          <p>
            <b>Sentiment Score:</b> {coin.sentiment_votes_up_percentage}%
          </p>

          <p>
            <b>Developer Activity (Stars):</b> {coin.developer_data.stars}
          </p>

          <p>
            <b>Community Score:</b> {coin.community_score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
