// Copyright (c) 2022 Itz-fork

import { Application } from "https://deno.land/x/oak@v11.0.0/mod.ts";
import Searchrouter from "./search.ts";
import { Config } from "../config.ts";

// oak app
const BPD_API = new Application();
const port = Config.port;

// Add search routes
BPD_API.use(Searchrouter.allowedMethods());
BPD_API.use(Searchrouter.routes());

BPD_API.addEventListener("listen", () => {
    console.log(`Listening on: localhost:${port}`);
});
await BPD_API.listen({ port });