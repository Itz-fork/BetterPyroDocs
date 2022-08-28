// Copyright (c) 2022 Itz-fork
// NOT OPTIMIZED
// deno-lint-ignore-file require-await

import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.10.1/mod.ts";

import { Config } from "../config.ts";
import { handle_errors } from "./errors.ts";
import {
    ApiDBSchema,
    index_data,
    RawFuncDBSchema,
    search_api_methods,
    search_raw_functions,
} from "../lib/database.ts";

// Bot instance
const BetterPyroDocsBot = new Bot(Config.bot_token);
BetterPyroDocsBot.catch(handle_errors);

// Start command
BetterPyroDocsBot.on("message:text", async (ctx) => {
    await ctx.reply(
        `
Hi, I'm <b>Better Pyro Docs Bot</b>!

I can help you to search and get information about pyrogram api methods and raw functions inline!
  `,
        {
            reply_markup: new InlineKeyboard()
                .switchInlineCurrent("Quick Search ⚡").row()
                .switchInline("Search for errors 🔎"),
            parse_mode: "HTML",
        },
    );
});

// Inline search
async function prepare_method_text(marr: { [key: number]: ApiDBSchema }) {
    let msg_list = [];
    for (const [index, mtd] of Object.entries(marr)) {
        msg_list.push(
            {
                type: "article",
                id: `betterpyrodocs-method-${index}`,
                title: mtd.name,
                input_message_content: {
                    message_text: `
<b>➭ Method:</b> <a href="${mtd.docs}">${mtd.name}</a>
<b>➭ Category:</b> <a href="https://docs.pyrogram.org/api/methods/#${mtd.category}">${mtd.category}</a>
<b>➭ Description:</b> <code>${mtd.description}</code>

<b><a href="${mtd.docs}">Read Docs!</a></b>
`,
                    parse_mode: "HTML",
                    disable_web_page_preview: true,
                },
                url: mtd.docs,
                description: mtd.description,
            },
        );
    }
    return msg_list;
}

async function prepare_rf_results(rarr: { [key: number]: RawFuncDBSchema }) {
    let msg_list = [];
    for (const [index, mtd] of Object.entries(rarr)) {
        msg_list.push(
            {
                type: "article",
                id: `betterpyrodocs-raw-${index}`,
                title: mtd.class_name,
                input_message_content: {
                    message_text: `
<b>➭ Method:</b> <a href="${mtd.docs}">${mtd.class_name}</a>
<b>➭ Category:</b> <a href="https://docs.pyrogram.org/api/methods/#${mtd.category}">${mtd.category}</a>
<b>➭ Import it:</b> <code>${mtd.import_syntax}</code>
<b>➭ Layer:</b> <code>${mtd.layer}</code>
<b>➭ ID:</b> <code>${mtd.id}</code>
<b>➭ Description:</b> <code>${mtd.description}</code>

<b><a href="${mtd.docs}">Read Docs!</a></b>
`,
                    parse_mode: "HTML",
                    disable_web_page_preview: true,
                },
                url: mtd.docs,
                description: mtd.description,
            },
        );
    }
    return msg_list;
}

BetterPyroDocsBot.inlineQuery(/[a-z|A-Z]+/, async (ctx) => {
    const typed = ctx.inlineQuery.query.split(/ (.*)/, 2);
    const stype = typed[0];

    let query = typed[0];
    if (typed.length > 1) {
        query = typed[1];
    }

    // Validate query length before searching
    if (query.length <= 3) {
        await ctx.answerInlineQuery(
            [],
            {
                cache_time: 5,
                switch_pm_text: "Need more than 3 characters to search!",
                switch_pm_parameter: "start",
            },
        );
        return;
    }

    let sresults;
    if (stype === "m") {
        sresults = await prepare_method_text(await search_api_methods(query));

        await ctx.answerInlineQuery(
            // @ts-ignore Fuck this!
            sresults,
            {
                cache_time: 10,
                switch_pm_text: `Found ${sresults.length} results!`,
                switch_pm_parameter: "start",
            },
        );
    } else if (stype === "r") {
        sresults = await prepare_rf_results(await search_raw_functions(query));
        await ctx.answerInlineQuery(
            // @ts-ignore Fuck this!
            sresults,
            {
                cache_time: 10,
                switch_pm_text: `Found ${sresults.length} results!`,
                switch_pm_parameter: "start",
            },
        );
    } else {
        sresults = (await prepare_method_text(await search_api_methods(query))).concat(
            await prepare_rf_results(await search_raw_functions(query)),
        );

        await ctx.answerInlineQuery(
            // @ts-ignore Fuck this!
            sresults,
            {
                cache_time: 10,
                switch_pm_text: `Found ${sresults.length} results!`,
                switch_pm_parameter: "start",
            },
        );
    }
});

// Start functions
// console.log("[+] Indexing telegram erros list");
// await index_data();
console.log("[+] Starting the bot");
await BetterPyroDocsBot.start();
