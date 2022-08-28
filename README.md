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
    ```
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
    ```
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


## Why?
The main goal of this project is to improve my web scraping skills, experiment with deno and mongodb atlas full text feature.