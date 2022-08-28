# STILL UNDER DEVELOPMENT

# Better Pyro Docs
**Simple & Easy-to-use** search engine to search for pyrogram api methods and raw functions


# What's in
- [API](#api)
- [Bot](#bot)
- [Web](#web)

## API
- **Directory:** [api](api)

- **About:** API to search for pyrogram's api methods and raw functions

- **Run with deno:**
    ```sh
    deno run --allow-net --allow-env api/main.ts
    ```

- **Search for**
    - Methods
        ```
        [GET] /search/methods/<query>
        ```
    - Raw functions
        ```
        [GET] /search/raw/<query>
        ```


## Bot
- **Directory:** [bot](bot)

- **About:** Telegram bot to search for pyrogram's api methods and raw functions using inline mode

- **Run with deno:**
    ```sh
    deno run --allow-net --allow-env bot/main.ts
    ```

- **Search for**
    - Methods
        ```
        !m <query>
        ```
    - Raw functions
        ```
        !r <query>
        ```


## Web
- **Directory:** [web](web)

- **About:** Website to search for pyrogram's api methods and raw functions using inline mode

- **Run:** Just open the [index.html](web/index.html)

- **Demo:** https://itz-fork.github.io/BetterPyroDocs


# Guides
- [Update cache](#update-cache)
- [Update database](#update-database)
- [Create search indexes](#create-search-indexes)

## Update cache
Update cached data lives inside [cache](cache) directory.

```sh
deno run --allow-net --allow-write lib/scraper.ts
```

## Update database
Updated mongodb database collections based on local cache

```sh
deno run --allow-net --allow-read --allow-env scripts/save_to_db.ts
```

## Create search indexes
You need to create 2 search indexes to make it work. First one for api methods and other one for raw functions

- Click on "Browse Collections"
- Navigate to search tab of the mongodb cluster
- Click on "CREATE INDEX" button
- Select "JSON Editor" and click on "Next" button
- Give "Index name"
    - `api_methods` - for api methods index
    - `raw_functions` - for raw functions index
- Copy and paste the following index definition to the json editor
    - For api methods index
    ```
    {
        "mappings": {
            "dynamic": false,
            "fields": {
                "name": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                }
            }
        }
    }
    ```
    - For raw functions index
    ```
    {
        "mappings": {
            "dynamic": false,
            "fields": {
                "class_name": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                }
            }
        }
    }
    ```


# Why?
The main goal of this project is to improve my web scraping skills, experiment with deno and mongodb atlas full text feature.