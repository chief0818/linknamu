type LinkCardProps = {
  title: string;
  url: string;
};

export default function LinkCard({ title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-xl border-2 border-gray-800 px-4 py-4 text-center font-medium transition hover:bg-gray-100"
    >
      {title}
    </a>
  );
}
