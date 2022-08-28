// Copyright (c) 2022 Itz-fork

import { MongoClient } from "https://deno.land/x/mongo@v0.31.0/mod.ts";
import { Config } from "../config.ts";

// Interfaces
interface ApiDBSchema {
    [name: string]: string;
}
interface RawFuncDBSchema {
    [name: string]: string;
}

// Mongodb client
const client = new MongoClient();
await client.connect(Config.mongodb_url);
const db = client.database("BetterPyroDocs");
const api_methods_col = db.collection<ApiDBSchema>("API_METHODS");
const raw_funcs_col = db.collection<RawFuncDBSchema>("RAW_FUNCTIONS");

// Index data
async function index_data(
    methods: Array<ApiDBSchema>,
    rfuncs: Array<RawFuncDBSchema>,
) {
    // Clean existing records
    await api_methods_col.deleteMany({});
    await raw_funcs_col.deleteMany({});

    await api_methods_col.insertMany(methods);
    await raw_funcs_col.insertMany(rfuncs);
}

// Search for the api methods
async function search_api_methods(query: string, results_limit = 10) {
    // deno-lint-ignore prefer-const
    let results: { [key: number]: ApiDBSchema } = {};
    const docs = await api_methods_col.aggregate([
        {
            "$search": {
                "index": "api_methods",
                "text": {
                    "query": `${query}`,
                    "path": ["description", "name"],
                },
            },
        },
        {
            $project: {
                _id: 0,
                name: 1,
                category: 1,
                docs: 1,
                description: 1,
                score: { $meta: "searchScore" },
            },
        },
        { $sort: { score: -1 } },
        { $limit: results_limit },
    ]);
    await docs.forEach((item: ApiDBSchema, index: number) => results[index] = item);
    return results;
}

// Search fot raw functions
async function search_raw_functions(query: string, results_limit = 10) {
    // deno-lint-ignore prefer-const
    let results: { [key: number]: RawFuncDBSchema } = {};
    const docs = await raw_funcs_col.aggregate([
        {
            "$search": {
                "index": "raw_functions",
                "text": {
                    "query": `${query}`,
                    "path": ["description", "class_name", "pre_class_name"],
                },
            },
        },
        {
            $project: {
                _id: 0,
                pre_class_name: 1,
                class_name: 1,
                category: 1,
                docs: 1,
                import_syntax: 1,
                description: 1,
                layer: 1,
                id: 1,
                score: { $meta: "searchScore" },
            },
        },
        { $sort: { score: -1 } },
        { $limit: results_limit },
    ]);
    await docs.forEach((item: RawFuncDBSchema, index: number) => results[index] = item);
    return results;
}

export { index_data,search_api_methods,search_raw_functions };
export type { ApiDBSchema,RawFuncDBSchema };