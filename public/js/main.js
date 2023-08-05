 // Function to handle the form submission
function handleSearchFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    const city = document.getElementById("city").value; // Get the city input value
    const searchResultsDiv = document.getElementById("searchResults");
  
    // Call the API to fetch attractions for the given city
    apiGet("geoname", `name=${city}`)
      .then((data) => {
        // Render the attractions in the searchResultsDiv
        if (data) {
          // If data is available, check if attractions are found
          if (data.length > 0) {
            let attractionsHtml = "";
            data.forEach((attraction) => {
              attractionsHtml += `
                <div class="attraction-card">
                  <h2>${attraction.name}</h2>
                  <p>${attraction.address ? attraction.address : ""}</p>
                  <p>Rating: ${attraction.rate ? attraction.rate : "N/A"}</p>
                  ${
                    attraction.preview && attraction.preview.source
                      ? `<img src="${attraction.preview.source}" alt="${attraction.name}" width="200">`
                      : ""
                  }
                </div>
              `;
            });
            searchResultsDiv.innerHTML = attractionsHtml;
          } else {
            // No attractions found
            searchResultsDiv.innerHTML = "<p>No attractions found for the given city.</p>";
          }
        } else {
          // Data is null or empty
          searchResultsDiv.innerHTML = "<p>No attractions found for the given city.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching attractions:", error);
        searchResultsDiv.innerHTML = "<p>Error fetching attractions.</p>";
      });
  }
  
  // Function to call the OpenTripMap API
  function apiGet(method, query) {
    // Your implementation for making the API request goes here
    const apiKey = "5ae2e3f221c38a28845f05b60b5231fc51d88e682aeffd09427cf61d";
    const apiUrl = `https://api.opentripmap.com/0.1/en/places/${method}?apikey=${apiKey}&${query}`;
  
    return fetch(apiUrl)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching attractions:", error);
        throw error;
      });
  }
  