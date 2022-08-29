// Copright (c) 2022 Itz-fork

import { index_data } from "../lib/database.ts";

console.info("[+] Indexing data");

// Read cached data
console.log(" -> Reading cached data");
const methods = JSON.parse(await Deno.readTextFile("./cache/api_methods.json"));
const rfuncs = JSON.parse(await Deno.readTextFile("./cache/raw_functions.json"));

// Convert it to array
console.log(" -> Updaing the database");
await index_data(methods, rfuncs);
