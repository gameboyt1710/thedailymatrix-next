import { CryptoData } from '@/lib/data';

interface CryptoTableProps {
  crypto: CryptoData[];
}

export function CryptoTable({ crypto }: CryptoTableProps) {
  return (
    <div className="crypto-table-wrapper">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {crypto.map((coin, index) => {
            const change = parseFloat(coin.change24h);
            const isPositive = change > 0;
            const isNegative = change < 0;
            
            return (
              <tr key={coin.symbol}>
                <td className="rank">{index + 1}</td>
                <td className="name">
                  <span className="symbol">{coin.symbol}</span>
                  <span className="fullname">{coin.name}</span>
                </td>
                <td className="price">${coin.price.toLocaleString()}</td>
                <td className={`change ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`}>
                  {isPositive ? '▲' : isNegative ? '▼' : ''} {coin.change24h}%
                </td>
                <td className="market-cap">${coin.marketCap}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
