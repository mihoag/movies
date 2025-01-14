import { Tabs, TabsList, TabsTrigger } from '../../components/shared/tabs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { useState } from 'react';
import { useEffect } from 'react';

import Spinner from '../../components/shared/spinner';
import HeaderProfile from '../../components/page/profile/overview/header-profile';
import StaticSection from '../../components/page/profile/overview/statics';
import FavoriteSection from '../../components/page/profile/favorite/favorite-section';
import RatingSection from '../../components/page/profile/rating/rating-section';
import WatchListSection from '../../components/page/profile/watch/watchlist-section';
import { ResponseProfileDTO } from '../../type/profile/ResponseProfileDTO';
import { apiGetProfile } from '../../apis/profileApi';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken, refreshAccessToken, userInfo, updateTokens, updateAfterLogout } = useAuth();
  const [tab, setTab] = useState('overview');
  const [profile, setProfile] = useState<ResponseProfileDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const profileData = await apiGetProfile();
        setProfile(profileData);
      } catch (error) {
        console.error(error);
        updateAfterLogout();
        navigate('/tmdb-frontend/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [accessToken, refreshAccessToken, userInfo?.username, updateTokens, updateAfterLogout, navigate, tab]);

  if (loading) {
    return <Spinner alignStyle={'flex justify-center items-center my-12'} loading={true} />;
  }
  if (!profile) {
    return null;
  }

  return (
    <>
      {/* Profile Header */}
      <HeaderProfile profile={profile} />

      {/* Tabs */}
      <Tabs defaultValue="overview" className="px-8">
        <TabsList className="bg-transparent border-b border-gray-700 w-full justify-start rounded-none h-auto">
          <TabsTrigger
            onClick={() => setTab('overview')}
            value="overview"
            className="data-[state=active] data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setTab('favorite')}
            value="favorite"
            className="data-[state=active] data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none"
          >
            Favorite
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setTab('ratings')}
            value="ratings"
            className="data-[state=active] data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none"
          >
            Ratings
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setTab('watchlist')}
            value="watchlist"
            className="data-[state=active] data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none"
          >
            Watchlist
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Static Section */}
      {tab == 'overview' && <StaticSection profile={profile} />}
      {tab == 'favorite' && <FavoriteSection profile={profile} />}
      {tab == 'ratings' && <RatingSection profile={profile} />}
      {tab == 'watchlist' && <WatchListSection profile={profile} />}
    </>
  );
};

export default ProfilePage;
