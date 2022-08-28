// Copyright (c) 2022 Itz-fork
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.33-alpha/deno-dom-wasm.ts";

// Urls to original pyrogram docs
const method_docs_url = "https://docs.pyrogram.org/api/methods/";
const raw_funcs_url = "https://docs.pyrogram.org/telegram/functions/";

/**
 * @param url: url to fetch
 * @returns HTMLDocument
 */
async function fetch_html(url: string) {
    const raw = await (await fetch(url)).text();
    return new DOMParser().parseFromString(raw, "text/html");
}

/**
 * Scrapes methods and descriptions from https://docs.pyrogram.org/api/methods/
 * @returns object containing objects of methods
 */
async function scrape_methods() {
    // deno-lint-ignore prefer-const
    let methods_obj: Array<Record<string, unknown>> = [];
    const html = await fetch_html(method_docs_url);
    const sections = [
        "utilities",
        "messages",
        "chats",
        "users",
        "invite-links",
        "contacts",
        "password",
        "bots",
        "authorization",
        "advanced",
    ];
    for (const section of sections) {
        // Grabs every row in the table
        const rows = html?.getElementById(section)?.getElementsByTagName("tr");
        rows?.forEach((row) => {
            const cells = row.getElementsByTagName("td");
            methods_obj.push({
                name: cells[0].innerText,
                category: section,
                docs: `https://docs.pyrogram.org/api/methods/${
                    cells[0].getElementsByTagName("a")[0].getAttribute("href")
                }`,
                description: cells[1].innerText,
            });
        });
    }

    await Deno.writeTextFile("./cache/api_methods.json", JSON.stringify(methods_obj, null, 2));
}

/**
 * Scrapes info about raw functions from https://docs.pyrogram.org/telegram/functions/
 * @returns object containing list of raw functions
 */
async function scrape_raw_functions() {
    let raw_func_obj: Array<Record<string, unknown>> = [];
    const html = await fetch_html(raw_funcs_url);
    const all_funcs = html?.getElementsByClassName(
        "toctree-wrapper compound",
    )[0].getElementsByTagName("ul")[0].getElementsByClassName("toctree-l1");
    if (all_funcs) {
        for (const ftype of all_funcs) {
            const anchors = ftype.getElementsByTagName("a");
            let belongs_to = anchors[0].innerText;
            if (anchors.length > 1) {
                anchors.shift();
            }
            // Fetch each raw function page induvidually
            for (const link of anchors) {
                const page_url = `https://docs.pyrogram.org/telegram/functions/${
                    link.getAttribute("href")
                }`;
                const rfhtml = (await fetch_html(page_url))
                    ?.getElementsByClassName("py class")[0];
                const rfdesc = rfhtml?.getElementsByTagName("dd")[0];
                // Raw function details
                let preclassname = rfhtml?.getElementsByClassName(
                    "sig-prename descclassname",
                )[0].innerText?.slice(0, -1);
                let classname = rfhtml?.getElementsByClassName("sig-name descname")[0]
                    .innerText;
                raw_func_obj.push({
                    pre_class_name: preclassname,
                    class_name: classname,
                    category: belongs_to,
                    docs: page_url,
                    import_syntax: `from ${preclassname} import ${classname}`,
                    description: rfdesc?.getElementsByTagName("p")[0].innerText,
                    layer:
                        rfdesc?.getElementsByClassName("docutils literal notranslate")[0].innerText,
                    id: rfdesc?.getElementsByClassName("docutils literal notranslate")[1].innerText,
                });
            }
        }
    }
    await Deno.writeTextFile("./cache/raw_functions.json", JSON.stringify(raw_func_obj, null, 2));
}

await scrape_methods();
await scrape_raw_functions();
