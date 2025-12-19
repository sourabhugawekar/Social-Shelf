
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import type { Adapter } from "next-auth/adapters";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL!;
const client = new MongoClient(uri);
export const clientPromise = client.connect();

export function CustomMongoDBAdapter(): Adapter {
  return MongoDBAdapter(clientPromise, {
    databaseName: "Social",
    collections: {
      Users: "user",
      Accounts: "accounts",
      Sessions: "sessions",
      VerificationTokens: "verification_tokens",
    },
  });
}
