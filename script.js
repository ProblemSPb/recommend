let inputTag = document.getElementById("input1");

inputTag.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        validateForm();
    }
});

function validateForm() {
    let input = document.getElementById("input1").value;
    let goal;

    if (input == "") {
        alert("Set at least one goal for your personal development.")
    } else {
        goal = input;

        callGoodreadsAPI(goal);
        callGoogleSearchAPI(goal);

        document.getElementById("submit1").innerHTML = "re-start";
        document.getElementById("submit1").setAttribute( "onClick", "reloadPage();" );

        removeElement("hint_text");
        showlElement("google-search-container")
        showGoodreads();

    }
}

function reloadPage() {
    location.reload();
}

// hide element from the page
function removeElement(arg) {
    let element = document.getElementById(arg);

    element.remove();
}

// show hidden elements
function showlElement(arg) {
    let element = document.getElementById(arg);

    element.removeAttribute("hidden");
}

function showGoodreads() {
    let element = document.getElementById("goodread-container");
    if(window.getComputedStyle(element).display === "none") {
        element.style.display = "flex";
    };
}

// returns Goodreads books per user's input
function callGoodreadsAPI(goal) {
    // remove any extra spaces in the beginning and end of user input
    goal = goal.trim();
    // replace spaces with %20 for the URL
    goal = goal.replaceAll(' ', '%20');

    let URL = "https://goodreads-books.p.rapidapi.com/search?q=public%20speech&page=1";
    URL = "https://goodreads-books.p.rapidapi.com/search?q=" + goal + "&page=1";

    fetch(URL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "goodreads-books.p.rapidapi.com",
            "x-rapidapi-key": "c60b70da79mshef98822fe0efea0p1abc63jsnda69cf942a1a"
        }
    })
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        document.getElementById("book1_link").href = data[0].url;
        document.getElementById("book1_img").src = data[0].smallImageURL;
        document.getElementById("book1_title").innerHTML = data[0].title + " by " + data[0].author;

        document.getElementById("book2_link").href = data[1].url;
        document.getElementById("book2_img").src = data[1].smallImageURL;
        document.getElementById("book2_title").innerHTML = data[1].title + " by " + data[1].author;;

        document.getElementById("book3_link").href = data[2].url;
        document.getElementById("book3_img").src = data[2].smallImageURL;
        document.getElementById("book3_title").innerHTML = data[2].title + " by " + data[2].author;;

      })
    .catch(err => {
        console.error(err);
    });
}

// returns Google Search results per user's input
function callGoogleSearchAPI(goal) {
    // remove any extra spaces in the beginning and end of user input
    goal = goal.trim();
    // replace spaces with + for the URL
    goal = goal.replaceAll(' ', '+');

    let URL = "https://google-search3.p.rapidapi.com/api/v1/search/q=coding+tutorial&num=5";
    URL = "https://google-search3.p.rapidapi.com/api/v1/search/q=" + goal + "+tutorial&num=5";

    fetch(URL, {
        "method": "GET",
        "headers": {
            "x-user-agent": "desktop",
            "x-proxy-location": "US",
            "x-rapidapi-host": "google-search3.p.rapidapi.com",
            "x-rapidapi-key": "c60b70da79mshef98822fe0efea0p1abc63jsnda69cf942a1a"
        }
    })
    .then((response) => {
        return response.json();
      })
      .then((data) => {

        document.getElementById("search_result1_link").innerHTML = data.results[0].title;
        document.getElementById("search_result1_descr").innerHTML = data.results[0].description;
        document.getElementById("search_result1_link").href = data.results[0].link;

        document.getElementById("search_result2_link").innerHTML = data.results[1].title;
        document.getElementById("search_result2_descr").innerHTML = data.results[1].description;
        document.getElementById("search_result2_link").href = data.results[1].link;

        document.getElementById("search_result3_link").innerHTML = data.results[2].title;
        document.getElementById("search_result3_descr").innerHTML = data.results[2].description;
        document.getElementById("search_result3_link").href = data.results[3].link;

      })
    .catch(err => {
        console.error(err);
    });
}

//TODO: 
// изменить дефолтовый алерт на что-то получше
// make a "wait" icon
// выбрать самые новые или популярные книги на Goodreads
// не показывать страницу с результатами, пока не вернутся результаты API calls