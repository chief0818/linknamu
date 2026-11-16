type LinkCardProps = {
  title: string;
  url: string;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ title, url, count, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-xl border-2 border-gray-800 px-16 py-4 text-center font-medium transition hover:bg-gray-100"
    >
      {title}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-normal text-gray-500">
        {count.toLocaleString()}회
      </span>
    </a>
  );
}
