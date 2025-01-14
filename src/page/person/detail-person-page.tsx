import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileInfo } from '../../components/page/detail-person/ProfileInfo';
import { MovieGrid } from '../../components/page/detail-person/MovieGrid';
import { Filmography } from '../../components/page/detail-person/Filmography';
import { Biography } from '../../components/page/detail-person/Biography';
import { apiGetPersonById } from '../../apis/personApi';
import { showError } from '../../util/ErrorToastifyRender';
import { Person } from '../../type/person/Person';
import Spinner from '../../components/shared/spinner';

const DetailPersonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [personDetail, setPersonDetail] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchPersonDetail = async () => {
      if (id) {
        const person = await apiGetPersonById(id);
        setPersonDetail(person);
        setLoading(false);
      } else {
        showError('Person ID is undefined');
      }
    };
    fetchPersonDetail();
  }, [id]);

  if (loading) {
    return <Spinner loading={true} alignStyle="flex justify-center items-center h-screen" />;
  }

  if (!personDetail) {
    return <div>No person details found.</div>;
  }

  const personalInfo = {
    profilePath: personDetail.profile_path,
    stageName: personDetail.name,
    knownFor: personDetail.known_for_department,
    gender: personDetail.gender === 1 ? 'Female' : 'Male',
    birthday: personDetail.birthday,
    placeOfBirth: personDetail.place_of_birth,
    alsoKnownAs: personDetail.also_known_as,
  };

  const knownForMovies = personDetail.movie_credits
    ? personDetail.movie_credits.cast.map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        year: movie.release_date.split('-')[0],
        role: movie.character || 'Unknown',
      }))
    : [];

  const biography = {
    name: personDetail.name,
    biography: personDetail.biography,
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
        <ProfileInfo personalInfo={personalInfo} />
        <div>
          <Biography name={biography.name} biography={biography.biography} />
          <MovieGrid movies={knownForMovies} />
          <Filmography movieCast={personDetail.movie_credits ? personDetail.movie_credits.cast : []} />
        </div>
      </div>
    </main>
  );
};

export default DetailPersonPage;
