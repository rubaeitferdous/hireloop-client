import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const uri = process.env.BETTER_AUTH_DB_URI as string

// Prevent multiple MongoClient instances in development
declare global {
  var _mongoClient: MongoClient | undefined
}

let client: MongoClient
if (process.env.NODE_ENV === "production") {
  client = new MongoClient(uri)
} else {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri)
  }
  client = global._mongoClient
}

const db = client.db("hireloopdb")

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "employer", "admin"],
        required: false,
        defaultValue: "seeker",
        input: true,
      },
    },
  },
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        },
      }
    : {}),
})
