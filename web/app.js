// Copyright (c) 2022 Itz-fork
// deno-lint-ignore-file require-await

const api_url = "https://betterpyrodocs.deno.dev/"

async function check_results(results) {
  for (let x in results) { return false; }
  return true;
}

async function parse_method_results(results_div, results) {
  if (await check_results(results)) {
    alert("Nothing found for your query!")
    return
  }
  results_div.innerHTML = ""
  for (const item of Object.values(results)) {
    results_div.innerHTML += `
    <div class="flex flex-grow card card-compact bg-base-300 m-2 opacity-80 max-w-sm min-w-full shadow-xl">
      <div class="card-body">
        <h2 class="card-title">${item.name}</h2>
        <h3><b>Category:</b> ${item.category}</h3>
        <h3><b>Description:</b><p>${item.description}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-sm btn-primary"><a href="${item.docs}" target="_blank">Docs ➜</a></button>
            </div>
    </div>
</div>`
  }
}

async function parse_raw_func_results(results_div, results) {
  if (await check_results(results)) {
    alert("Nothing found for your query!")
    return
  }
  results_div.innerHTML = ""
  for (const item of Object.values(results)) {
    results_div.innerHTML += `
    <div class="flex flex-grow card card-compact bg-base-200 m-2 opacity-80 max-w-sm min-w-full shadow-xl">
      <div class="card-body">
        <h2 class="card-title">${item.class_name}</h2>
        <h3><b>Category:</b> ${item.category}</h3>
        <h3><b>Importing:</b> <code>${item.import_syntax}</code></h3>
        <h3><b>Layer:</b> ${item.layer}</h3>
        <h3><b>ID:</b> ${item.id}</h3>
        <h3><b>Description:</b><p>${item.description}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-sm btn-primary"><a href="${item.docs}" target="_blank">Docs ➜</a></button>
            </div>
    </div>
</div>`
  }
}

async function Get_Results() {
  // Grab data from the form
  const query = document.getElementById("search_bar").value
  const is_methods = document.getElementById("is_methods").checked
  const is_raw_funcs = document.getElementById("is_raw_funcs").checked
  const results_div = document.getElementById("results")

  // Check if query is empty
  if (query === "") {
    alert("Give something to search!")
    return
  }

  // Show loading screen
  const la = document.getElementById("loading")
  la.style = "opacity: 1"

  // Fetch data and update the UI
  if (is_methods) {
    const results = await ((await fetch(`${api_url}search/methods/${query}`))).json()
    await parse_method_results(results_div, results)
  } else if (is_raw_funcs) {
    const results = await ((await fetch(`${api_url}search/raw/${query}`))).json()
    await parse_raw_func_results(results_div, results)
  } else {
    const results = await ((await fetch(`${api_url}search/methods/${query}`))).json()
    await parse_method_results(results_div, results)
  }

  la.style = "opacity: 0"
}