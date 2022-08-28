// Copyright (c) 2022 Itz-fork

import { Router } from "https://deno.land/x/oak/mod.ts";
import { search_api_methods, search_raw_functions } from "../lib/database.ts";

// Router
const Searchrouter = new Router();

// Home route
Searchrouter.get("/", async (ctx) => {
    ctx.response.body = {
        status: "alive",
        developer: "https://github.com/Itz-fork"
    };
});

// Search for api methods
Searchrouter.get("/search/methods/:q", async (ctx) => {
    const query = ctx.params.q;
    ctx.response.body = await search_api_methods(query);
    ctx.response.headers.set('Access-Control-Allow-Origin', '*')
    return ctx.response.body;
});

// Search for raw functions
Searchrouter.get("/search/raw/:q", async (ctx) => {
    const query = ctx.params.q;
    ctx.response.body = await search_raw_functions(query);
    ctx.response.headers.set('Access-Control-Allow-Origin', '*')
    return ctx.response.body;
});

export default Searchrouter;
