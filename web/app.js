// deno-lint-ignore require-await
async function parse_method_results(results_div, results) {
  if (!results) {
    alert("Nothing found for your query!")
  }
  results_div.innerHTML = ""
  for (const [key, item] of Object.entries(results)) {
    let rs = `
    <div class="flex flex-grow card card-compact bg-base-200 m-2 opacity-80 max-w-sm min-w-full shadow-xl">
      <div class="card-body">
        <h2 class="card-title">${item.name}</h2>
        <h3><b>Category:</b> ${item.category}</h3>
        <h3><b>Description:</b><p>${item.description}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-sm btn-primary"><a href="${item.docs}" target="_blank">Docs ➜</a></button>
            </div>
    </div>
</div>`
    results_div.innerHTML += rs
  }
}

// deno-lint-ignore require-await
async function parse_raw_func_results(results_div, results) {
  if (!results) {
    alert("Nothing found for your query!")
  }
  results_div.innerHTML = ""
  for (const [key, item] of Object.entries(results)) {
    let rs = `
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
    results_div.innerHTML += rs
  }
}

async function Get_Results() {
  // Grab data from the form
  const query = document.getElementById("search_bar").value
  const is_methods = document.getElementById("is_methods").checked
  const is_raw_funcs = document.getElementById("is_raw_funcs").checked
  const results_div = document.getElementById("results")

  // Fetch data and update the UI
  if (is_methods) {
    const results = await ((await fetch(`https://betterpyrodocs.deno.dev/search/methods/${query}`))).json()
    await parse_method_results(results_div, results)
  } else if (is_raw_funcs) {
    const results = await ((await fetch(`https://betterpyrodocs.deno.dev/search/raw/${query}`))).json()
    await parse_raw_func_results(results_div, results)
  } else {
    const results = await ((await fetch(`https://betterpyrodocs.deno.dev/search/methods/${query}`))).json()
    await parse_method_results(results_div, results)
  }
}