import RatingOverview from './rating-overview';
import GenreChart from './genre-chart';
import { ResponseProfileDTO } from '../../../../type/profile/ResponseProfileDTO';

const StaticSection: React.FC<{ profile: ResponseProfileDTO }> = ({ profile }) => {
  const totalFavorites = profile.favoriteList.length;
  const totalRatings = profile.ratings.length;
  const totalWatchlist = profile.watchlist.length;
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Stats</h2>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg mb-4">Total Favorite</h3>
          <div className="text-5xl font-bold text-pink-500">{totalFavorites}</div>
        </div>
        <div>
          <h3 className="text-lg mb-4">Total Ratings</h3>
          <div className="text-5xl font-bold text-pink-500">{totalRatings}</div>
        </div>
        <div>
          <h3 className="text-lg mb-4">Total Watchlist</h3>
          <div className="text-5xl font-bold text-pink-500">{totalWatchlist}</div>
        </div>
        <RatingOverview ratings={profile.ratings} />
        <GenreChart />
      </div>
    </div>
  );
};
export default StaticSection;
