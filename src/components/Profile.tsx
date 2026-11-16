type ProfileProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function Profile({ name, bio, imageUrl }: ProfileProps) {
  return (
    <section className="flex flex-col items-center text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        className="h-32 w-32 rounded-full border-2 border-gray-800 object-cover"
      />
      <h1 className="mt-6 text-xl font-bold">{name}</h1>
      <p className="mt-1 text-gray-600">{bio}</p>
    </section>
  );
}
