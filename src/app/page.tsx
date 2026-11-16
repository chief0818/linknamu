import LinkCard from "@/components/LinkCard";
import Profile from "@/components/Profile";

// 보여 주기용 더미 값입니다. 나중에 실제 내용으로 바꾸세요.
const profile = {
  name: "김개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  imageUrl: "/profile.jpg",
};

const links = [
  { title: "GitHub", url: "https://github.com/" },
  { title: "LinkedIn", url: "https://www.linkedin.com/" },
  { title: "Blog", url: "https://example.com/" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-12">
      <Profile {...profile} />
      <nav className="mt-8 flex flex-col gap-4">
        {links.map((link) => (
          <LinkCard key={link.title} {...link} />
        ))}
      </nav>
    </main>
  );
}
