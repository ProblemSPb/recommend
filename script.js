let inputTag = document.getElementById("input1");

inputTag.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        validateForm();
    }
});

// validate form; if empty -> show warning popup, if not empty -> process user's input
function validateForm() {
    let input = document.getElementById("input1").value;
    let goal;

    if (input == "") {
        // alert("Set at least one goal for your personal development.")
        cuteAlert({
            type: "warning",
            title: "Something is missing",
            message: "Set at least one goal for your personal development",
            buttonText: "Okay"
        })
    } else {
        goal = input;

        // shows Load Icon
        document.querySelector(".preload").style.display = "initial";

        sendingAPIrequests(goal);
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
    if (window.getComputedStyle(element).display === "none") {
        element.style.display = "flex";
    };
}


// Loader

const loader = document.querySelector(".preload");
const emoji = document.querySelector(".emoji");

const emojis = ["🕐", "🕜", "🕑", "🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢", "🕗", "🕣", "🕘", "🕤", "🕙", "🕥", "🕚", "🕦", "🕛", "🕧"];

const interval = 125;

const loadEmojis = (arr) => {
    setInterval(() => {
        emoji.innerText = arr[Math.floor(Math.random() * arr.length)];
    }, interval);
}

const init = () => {
    loadEmojis(emojis);
}
init();
// End of Loader



const goodReads = (goal) => {
    // remove any extra spaces in the beginning and end of user input
    goal = goal.trim();
    // replace spaces with %20 for the URL
    goal = goal.replaceAll(' ', '%20');

    // let URL = "https://goodreads-books.p.rapidapi.com/search?q=public%20speech&page=1";
    let URL = "https://goodreads-books.p.rapidapi.com/search?q=" + goal + "&page=1";

    return fetch(URL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "goodreads-books.p.rapidapi.com",
            "x-rapidapi-key": "c60b70da79mshef98822fe0efea0p1abc63jsnda69cf942a1a"
        }
    })
};

const google = (goal) => {
    // remove any extra spaces in the beginning and end of user input
    goal = goal.trim();
    // replace spaces with + for the URL
    goal = goal.replaceAll(' ', '+');

    let URL = "https://google-search3.p.rapidapi.com/api/v1/search/q=" + goal + "+tutorial";

    return fetch(URL, {
        "method": "GET",
        "headers": {
            "x-user-agent": "desktop",
            "x-proxy-location": "US",
            "x-rapidapi-host": "google-search3.p.rapidapi.com",
            "x-rapidapi-key": "c60b70da79mshef98822fe0efea0p1abc63jsnda69cf942a1a"
        }
    })
};

function sendingAPIrequests(goal) {

    // allSettled => to execute only when both requests are finished
    Promise.allSettled([goodReads(goal), google(goal)]).
        then(
            ([goodReadsResponse, googleResponse]) => {
                goodReadsResponse.value.json().then(json => {
                    if (json) {
                        console.log(json);

                        document.getElementById("book1_link").href = json[0].url;
                        document.getElementById("book1_img").src = json[0].smallImageURL;
                        document.getElementById("book1_title").innerHTML = json[0].title + " by " + json[0].author;

                        document.getElementById("book2_link").href = json[1].url;
                        document.getElementById("book2_img").src = json[1].smallImageURL;
                        document.getElementById("book2_title").innerHTML = json[1].title + " by " + json[1].author;

                        document.getElementById("book3_link").href = json[2].url;
                        document.getElementById("book3_img").src = json[2].smallImageURL;
                        document.getElementById("book3_title").innerHTML = json[2].title + " by " + json[2].author;
                    }
                });

                googleResponse.value.json().then(json => {
                    if (json) {
                        console.log(json);

                        document.getElementById("search_result1_link").innerHTML = json.results[0].title;
                        document.getElementById("search_result1_descr").innerHTML = json.results[0].description;
                        document.getElementById("search_result1_link").href = json.results[0].link;

                        document.getElementById("search_result2_link").innerHTML = json.results[1].title;
                        document.getElementById("search_result2_descr").innerHTML = json.results[1].description;
                        document.getElementById("search_result2_link").href = json.results[1].link;

                        document.getElementById("search_result3_link").innerHTML = json.results[2].title;
                        document.getElementById("search_result3_descr").innerHTML = json.results[2].description;
                        document.getElementById("search_result3_link").href = json.results[3].link;

                    }
                });

                // hiding elements that are not needed and showing new elements with request results
                document.getElementById("submit1").innerHTML = "re-start";
                document.getElementById("submit1").setAttribute("onClick", "reloadPage();");
                document.querySelector(".preload").style.display = "none";
                removeElement("hint-text");
                showlElement("google-search-container")
                showGoodreads();

            }
        );
}

// ctrl + OPT + F


//TODO: 
// make a nice "wait" icon
// refactoring, split js into separate files
// выбрать самые новые или популярные книги на Goodreads