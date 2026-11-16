export type Link = {
  id: string;
  title: string;
  url: string;
};

// id는 클릭 수를 저장하는 키입니다. 한 번 정하면 바꾸지 마세요.
export const links: Link[] = [
  { id: "github", title: "GitHub", url: "https://github.com/" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
  { id: "blog", title: "Blog", url: "https://example.com/" },
];
