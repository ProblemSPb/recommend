let test;

function validateForm() {
    let input = document.getElementById("input1").value;
    let goal;

    if (input == "") {
        alert("Set at least one goal for your personal development.")
    } else {
        goal = input;
        test = goal;
        document.getElementById("goal1").innerHTML = goal;
        print();

        callGoodreadsAPI(goal);
    }
}

function print() {
    console.log(test);
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
      })
    .catch(err => {
        console.error(err);
    });
}