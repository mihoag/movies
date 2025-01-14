import default_avatar from '../../../../assets/default_avatar.jpg';
import { UserScore } from '../../../shared/UserScore';
import { Avatar, AvatarFallback, AvatarImage } from '../../../shared/avatar';
import { ResponseProfileDTO } from '../../../../type/profile/ResponseProfileDTO';

export const HeaderProfile: React.FC<{ profile: ResponseProfileDTO }> = ({ profile }) => {
  const calculateAverageScore = () => {
    if (profile.ratings.length === 0) return 0;
    const totalScore = profile.ratings.reduce((acc, rating) => acc + rating.score, 0);
    return totalScore / profile.ratings.length;
  };

  const averageScore = calculateAverageScore();

  return (
    <div
      className="relative p-10"
      style={{
        backgroundImage:
          'url(https://www.themoviedb.org/assets/2/v4/account_pipes/pink-37bff5abbba8578bee5e51fc0115cf819c4918f4f6dfe3804737eb5f9b84f2a0.svg), linear-gradient(to bottom right,rgb(52, 57, 71),rgb(35, 36, 90))', // Image + Gradient
        backgroundSize: 'cover', // Ensures the image covers the whole background
        backgroundPosition: 'center', // Centers the background image
        // Blends the gradient and image together
      }}
    >
      <div className="flex items-start gap-8">
        <Avatar className="w-32 h-32 border-4 border-white">
          {profile.profile == null ? (
            <AvatarImage src={default_avatar} alt="User" />
          ) : (
            <AvatarImage src={profile.profile} alt="User" />
          )}
          <AvatarFallback>MH</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-white text-3xl font-bold mb-2">{profile.username}</h1>
            <p className="text-gray-300">Member since {profile.createdAt}</p>
          </div>
          <div className="flex  gap-8">
            <div className="flex justify-content-center align-center text-white gap-4">
              <div className="relative w-16 h-16 mb-2">
                <UserScore score={Math.round(averageScore * 10)} />
              </div>
              <p className="text-[15px] mt-2 font-semibold">
                Average
                <br />
                Movie Score
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
