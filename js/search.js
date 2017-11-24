(function() {

  //function that get and return the search term from the form
  function getSearchTerm(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  //function that display the search results in our html page
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');
    if (results.length) { // Are there any results?
      var appendHTMLString = '';

      for (var i = 0; i < results.length; i++) {  //Loop through the results and append the string as HTML
        console.log(results[i]);
        var item = store[results[i].ref];
        appendHTMLString += '<h2>Search Results</h2> <ul>'
        appendHTMLString += '<li><a href="' + (item.Url != null? item.Url : '#') + '" target="_blank"><h3>' + item.Name + '</h3></a>';
        appendHTMLString += '<p>' + (item.Description != null ? item.Description: ' ') + '</p></li></ul>';
      }

      searchResults.innerHTML = appendHTMLString;
    } else {
        searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  var searchTerm = getSearchTerm('query');

  if (searchTerm) {
    //set the term value on the input box
    document.getElementById('search-input').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on.
    // a boost of 10 on name indicate matches on this field are more important.
    var index=0;
    var searchIndex = lunr(function () {
           this.ref('id')
           this.field('name', { boost: 10 })
           this.field('country')
           this.field('description')
           this.field('url')
           this.field('github')

           window.store.forEach(function (doc, index) {
              this.add({
                'id': index,
                'name': doc.Name,
                'country': doc.Country,
                'description':doc.Description,
                'url': doc.Url,
                'github': doc.Github

              })
              index++;
            }, this)
       });
      //lunar index performs the searc
      var results = searchIndex.search(searchTerm);
      displaySearchResults(results, window.store);
    }
})();
