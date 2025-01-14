interface PersonalInfo {
  profilePath: string;
  stageName: string;
  knownFor: string;
  gender: string;
  birthday: string;
  placeOfBirth: string;
  alsoKnownAs: string[];
}

interface ProfileInfoProps {
  personalInfo: PersonalInfo;
}

const VITE_PROFILE_ACTOR = import.meta.env.VITE_PROFILE_ACTOR;

export function ProfileInfo({ personalInfo }: ProfileInfoProps) {
  return (
    <div className="">
      <img
        src={VITE_PROFILE_ACTOR + personalInfo.profilePath}
        className="w-full h-auto object-cover rounded-[10px] shadow-lg"
      />
      <h2 className="text-xl font-semibold mb-2 mt-6">Personal Info</h2>
      <dl className="grid gap-4">
        {Object.entries(personalInfo).map(([key, value]) => {
          if (key === 'profilePath') return null;
          return (
            <div key={key}>
              <dt className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
              <dd className="text-gray-600">{Array.isArray(value) ? value.join(', ') : value.toString()}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
