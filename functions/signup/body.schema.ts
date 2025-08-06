export default {
  type: "object",
  properties: {
    email: { type: "string" },
    name: { type: "string" },
    bio: { type: "string" },
    avatar: { type: "string" }
  },
  required: ["email", "name", "bio", "avatar"]
} as const;
