"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { Link } from "@/lib/links";

export default function LinkList({ links }: { links: Link[] }) {
  // 데이터를 받기 전에는 모두 0회로 표시합니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Record<string, number>) =>
        // 받는 사이에 이미 누른 클릭이 있으면 그만큼 더해 둡니다.
        setCounts((prev) => {
          const merged = { ...data };
          for (const [id, n] of Object.entries(prev)) merged[id] = (merged[id] ?? 0) + n;
          return merged;
        }),
      )
      .catch((err) => console.error("클릭 수를 불러오지 못했습니다:", err));
  }, []);

  function handleClick(id: string) {
    // 화면에는 바로 +1 반영하고, 서버에는 페이지가 바뀌어도 요청이 끝나도록 keepalive로 보냅니다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch((err) => console.error("클릭 수를 저장하지 못했습니다:", err));
  }

  return (
    <nav className="mt-8 flex flex-col gap-4">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          title={link.title}
          url={link.url}
          count={counts[link.id] ?? 0}
          onClick={() => handleClick(link.id)}
        />
      ))}
    </nav>
  );
}
