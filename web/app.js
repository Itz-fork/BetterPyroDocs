function Get_Results() {
    const resp = fetch("http://localhost:8080/").then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json();
      })
}