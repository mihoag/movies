import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CastSection } from '../../../components/page/detail-movie-page/CastSection';
import { SocialSection } from '../../../components/page/detail-movie-page/SocialSection';
import { FactsSidebar } from '../../../components/page/detail-movie-page/FactsSidebar';
import { ShowHeader } from '../../../components/page/detail-movie-page/ShowHeader';
import { apiGetMovieByTmdbId } from '../../../apis/movieApi';
import { showError } from '../../../util/ErrorToastifyRender';
import { Movie } from '../../../type/movie/Movie';
import Spinner from '../../../components/shared/spinner';
import { Recommendations } from '../../../components/page/detail-movie-page/Recommendations';
import { HistoryMovies } from '../../../components/page/detail-movie-page/HistoryMovie';
import { apiGetHistoryMovies, apiGetSimilarMovies } from '../../../apis/movieApi';

const DetailMoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [detailMovie, setDetailMovie] = useState<Movie>({} as Movie);
  const [loading, setLoading] = useState(true);
  const [historyMovies, setHistoryMovies] = useState<Movie[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchDetailMovie = async () => {
      if (id) {
        const detailedMovie = await apiGetMovieByTmdbId(id); // Fetch movie details using the id
        //console.log(detailedMovie);
        setDetailMovie(detailedMovie); // Set the movie details in the state

        try {
          const similarMovies = await apiGetSimilarMovies(parseInt(id, 10));
          setSimilarMovies(similarMovies);
        } catch (error) {
          console.error('Failed to fetch similar movies:', error);
        } finally {
          setLoading(false);
        }

        try {
          const recommendedMovies = await apiGetHistoryMovies();
          setHistoryMovies(recommendedMovies);
        } catch (error) {
          console.error('Failed to fetch recommended movies:', error);
          // Update history movies in local storage
          const historyMovies = JSON.parse(localStorage.getItem('historyMovies') || '[]');
          const updatedHistoryMovies = [...historyMovies.filter((movie: Movie) => movie.id !== detailedMovie.id)];
          localStorage.setItem('historyMovies', JSON.stringify(updatedHistoryMovies));
          setHistoryMovies(updatedHistoryMovies.filter((movie: Movie) => movie.id !== detailedMovie.id));
        } finally {
          setLoading(false);
        }

        setLoading(false); // Set loading
      } else {
        showError('Movie ID is undefined');
      }
    };
    fetchDetailMovie(); // Call the fetchDetailMovie function to fetch movie details
  }, [id]);

  if (loading) {
    return <Spinner loading={true} alignStyle="flex justify-center items-center h-screen" />;
  }

  return (
    <>
      <ShowHeader movieDetail={detailMovie} />
      <div className="max-w-[1300px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <CastSection cast={detailMovie.credits.cast} />
            <SocialSection reviews={detailMovie.reviews} />
            <Recommendations recommendations={similarMovies} />
            <HistoryMovies historyMovies={historyMovies} />
          </div>
          <FactsSidebar detailMovie={detailMovie} />
        </div>
      </div>
    </>
  );
};

export default DetailMoviePage;
