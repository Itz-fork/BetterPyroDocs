export const Config = {
    mongodb_url: Deno.env.get("MONGODB_URL") ?? "",
    // API
    port: Number(Deno.env.get("OAK_PORT")) || 8080,
    // Bot
    bot_token: Deno.env.get("BOT_TOKEN") ?? "",
    index_on_start: Deno.env.get("INDEX_ON_START")?.toLowerCase() === "true" ? true : false,
};
