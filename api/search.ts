// Copyright (c) 2022 Itz-fork

import { Router } from "https://deno.land/x/oak/mod.ts";
import { search_api_methods, search_raw_functions } from "../lib/database.ts";

// Router
const Searchrouter = new Router();

// Home route
Searchrouter.get("/", async (ctx) => {
    ctx.response.body = {
        status: "alive",
        developer: "https://github.com/Itz-fork",
        repo: "https://github.com/Itz-fork/BetterPyroDocs"
    };
});

// Search for api methods
Searchrouter.get("/search/methods/:q", async (ctx) => {
    const query = ctx.params.q;
    ctx.response.body = await search_api_methods(query);
    // Headers
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.headers.set("Cache-Control", "max-age=604800");
    ctx.response.headers.set("Age", "259200");
    return ctx.response.body;
});

// Search for raw functions
Searchrouter.get("/search/raw/:q", async (ctx) => {
    const query = ctx.params.q;
    ctx.response.body = await search_raw_functions(query);
    // Headers
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.headers.set("Cache-Control", "max-age=604800");
    ctx.response.headers.set("Age", "259200");
    return ctx.response.body;
});

export default Searchrouter;
