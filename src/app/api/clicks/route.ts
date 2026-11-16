import { NextResponse } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { links } from "@/lib/links";

export const dynamic = "force-dynamic";

const validIds = new Set(links.map((link) => link.id));

// 모든 링크의 클릭 수를 한 번에 반환: { github: 42, ... }
export async function GET() {
  const collection = await getClicksCollection();
  const docs = await collection.find({ _id: { $in: Array.from(validIds) } }).toArray();

  const counts: Record<string, number> = {};
  for (const id of Array.from(validIds)) counts[id] = 0;
  for (const doc of docs) counts[doc._id] = doc.count;

  return NextResponse.json(counts);
}

// 링크 하나의 클릭 수를 1 증가: body { id: "github" }
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = body?.id;
  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const collection = await getClicksCollection();
  const result = await collection.findOneAndUpdate(
    { _id: id },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: "after" },
  );

  return NextResponse.json({ id, count: result?.count ?? 1 });
}
