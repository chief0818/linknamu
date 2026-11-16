import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인).");
}

// 개발 모드의 핫 리로드나 서버리스 재사용 시 연결이 계속 늘어나지 않도록 전역에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo._mongoClientPromise ??
  (globalForMongo._mongoClientPromise = new MongoClient(uri).connect());

export async function getClicksCollection() {
  const client = await clientPromise;
  // DB 이름은 URI 경로(/linknamu)에서 가져옵니다.
  return client.db().collection<{ _id: string; count: number }>("clicks");
}
