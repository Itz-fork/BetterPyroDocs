// Copright (c) 2022 Itz-fork

import { index_data } from "../lib/database.ts";

console.log("[+] Starting to index data");

// To share
let method_list = [];
let raw_func_list = [];

// Read cached data
console.log(" -> Reading cached data");
const methods = JSON.parse(await Deno.readTextFile("./cache/api_methods.json"));
const rfuncs = JSON.parse(await Deno.readTextFile("./cache/raw_functions.json"));

// Convert it to array
console.log(" -> Updaing the database");

await index_data(methods, rfuncs);
