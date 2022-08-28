export const Config = {
    mongodb_url: Deno.env.get("MONGODB_URL") ?? "",
    port: Number(Deno.env.get("OAK_PORT")) || 8080,
    bot_token: Deno.env.get("BOT_TOKEN") ?? ""
}