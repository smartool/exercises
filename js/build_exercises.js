const tree = document.createDocumentFragment();


if (document.title.split(" ")[0] == "Treasure") {
    var r = await axios.get("https://raw.githubusercontent.com/smartool/exercises/master/data/treasure_hunt.yml");
} else {
    var r = await axios.get("https://raw.githubusercontent.com/smartool/exercises/master/data/story_time.yml");
}




let json_data = jsyaml.loadAll(r.data);
let records = {};

for (let key of Object.keys(json_data)) {
    records[key] = json_data[key];
}

// console.log(document.title.split(" ")[0])


const data = records[0]["exercises"]



const level_part = document.createElement("div")
level_part.setAttribute("class", "container px-4")
level_part.setAttribute("style", "margin-top: 20px")

var main_content = document.createElement("div")
main_content.setAttribute("id", "main")
main_content.setAttribute("class", "container px-4")

const exercises_amount = Object.keys(data).length



function show_answer(x, answer_key) {
    x.innerHTML = answer_key;
    if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
    }
}

function choose_level() {
    main_content.innerHTML = ""
    let level = select_level.options[select_level.selectedIndex].text
    for (var exercise_id = 0; exercise_id < exercises_amount; exercise_id++) {
        let level_from_db = data[exercise_id]["level"]
        if (level == "All levels") {
            build_exercise(exercise_id)
        } else if (level_from_db.length == 5) {
            var levels = level_from_db.split("/")
            if (level == levels[0] || level == levels[1]) {
                build_exercise(exercise_id)
            }
        } else if (level == level_from_db || level_from_db == "All levels") {
             
                build_exercise(exercise_id)
            
        }
        
    }
}




var form_level = document.createElement("div")
form_level.setAttribute("class", "float-end")
form_level.innerHTML = "Level:"

var select_level = document.createElement("select")
select_level.setAttribute("name", "level")
select_level.setAttribute("id", "level")
// select_level.setAttribute("style", "margin: 12px 16px; ")
select_level.setAttribute("class", "form-select")

var array_levels = ["A1", "A2", "B1", "B2", "All levels"]

for (const ind in array_levels) {
    let option = document.createElement("option")
    option.setAttribute("value", array_levels[ind])
    option.innerHTML = array_levels[ind]
    select_level.appendChild(option)
}


// var levels = document.getElementById("level")
let level_button = document.createElement("input")
level_button.setAttribute("type", "button")
// choose_button.setAttribute("onclick", "choose_level()")
level_button.setAttribute("value", "Choose")

level_button.setAttribute("class", "btn btn-outline-primary btn-sm")

level_button.onclick = function() {
    choose_level();
};

form_level.appendChild(select_level)
form_level.appendChild(level_button)


level_part.append(form_level)


function build_exercise(exercise_id) {
    var task_title = document.createElement("h3");
    task_title.setAttribute("style", "margin-top: 30px");
    task_title.innerHTML = `${exercise_id + 1}. ${data[exercise_id]["topic"]}&ensp;<i style="font-weight:normal">${data[exercise_id]["level"]}</i>`;
    
    main_content.appendChild(task_title);

    if (data[exercise_id]["title"] != null) {
        let instructions = document.createElement("div");
        instructions.innerHTML = `<b>Choose:</b> ${data[exercise_id]["title"]}`;
        main_content.appendChild(instructions);
    }
    if (data[exercise_id]["extra_task"] != null) {
        let extra_task = document.createElement("div");
        extra_task.setAttribute("class", "d-grid gap-3 d-md-flex");


        let extra_task_text = document.createElement("p");
        extra_task_text.style.display = "none";
        // ta_idea_text.style.fontSize = "15px";
        // ta_idea_text.style.fontStyle = "italic";

        let extra_task_button = document.createElement("button")
        extra_task_button.setAttribute("type", "button")
        extra_task_button.setAttribute("class", "btn btn-outline-primary btn-sm")
        extra_task_button.setAttribute("style", "margin: 3px")


        let new_extra_task = data[exercise_id]["extra_task"]

        extra_task_button.onclick = function() {
            show_answer(extra_task_text, new_extra_task);
        };
        extra_task_button.innerHTML = "Extra task";

        extra_task.appendChild(extra_task_text)
        main_content.appendChild(extra_task_button)
        main_content.appendChild(extra_task)
    }

    if (data[exercise_id]["take_away_idea"] != null) {
        let ta_idea = document.createElement("div");
        ta_idea.setAttribute("class", "d-grid gap-3 d-md-flex");


        let ta_idea_text = document.createElement("p");
        ta_idea_text.style.display = "none";
        ta_idea_text.style.fontSize = "15px";
        ta_idea_text.style.fontStyle = "italic";

        let ta_idea_button = document.createElement("button")
        ta_idea_button.setAttribute("type", "button")
        ta_idea_button.setAttribute("class", "btn btn-outline-primary btn-sm")
        ta_idea_button.setAttribute("style", "margin: 3px")


        let new_ta_idea = data[exercise_id]["take_away_idea"]

        ta_idea_button.onclick = function() {
            show_answer(ta_idea_text, new_ta_idea);
        };
        ta_idea_button.innerHTML = "Take-away idea";

        ta_idea.appendChild(ta_idea_text)
        main_content.appendChild(ta_idea_button)
        main_content.appendChild(ta_idea)
    }
    if (data[exercise_id]["search_by"] != null) {
        let instructions = document.createElement("div");
        instructions.innerHTML = `<b>Search by:</b> ${data[exercise_id]["search_by"]}`;
        main_content.appendChild(instructions);
    }

    if (data[exercise_id]["write"] != null) {
        let instructions = document.createElement("div");
        instructions.innerHTML = `<b>Write</b> ${data[exercise_id]["write"]}`;
        main_content.appendChild(instructions);
    }
    if (data[exercise_id]["help_word"] != null) {
        let help_words = document.createElement("div");
        help_words.innerHTML = `Helpful words to use: ${data[exercise_id]["help_word"]}`;
        main_content.appendChild(help_words);
    }
    // if (data[exercise_id]["write"] != null) {
    //     let instructions = document.createElement("div");
    //     instructions.innerHTML = `<b>Write </b> ${data[exercise_id]["write"]}`;
    //     main_content.appendChild(instructions);
    // }


    let answer = document.createElement("div");
        answer.setAttribute("class", "d-grid gap-3 d-md-flex");


        let answer_text = document.createElement("p");
        answer_text.style.display = "none";
        answer_text.style.fontSize = "15px";
        answer_text.style.fontStyle = "italic";
        

        let answ_button = document.createElement("button")
        answ_button.setAttribute("type", "button")
        answ_button.setAttribute("class", "btn btn-outline-primary btn-sm")
        
        answ_button.setAttribute("style", "margin: 3px")

        let new_answer = ""

        if (data[exercise_id]["answer"] != null) {
            new_answer += data[exercise_id]["answer"]

        }

        if (data[exercise_id]["construction"] != null) {
            let constr_amount = Object.keys(data[exercise_id]["construction"]).length
            new_answer += "<b>Constructions you can use:</b><br>"
            for (let id = 0; id < constr_amount; id++) {
                // let construction = document.createElement("div");
                new_answer += data[exercise_id]["construction"][id] + "<br>";
                // answer.appendChild(construction);
            }
        }

        if (data[exercise_id]["text_example"] != null) {
            let text_amount = Object.keys(data[exercise_id]["text_example"]).length
            new_answer += "<b>Examples of texts:</b><br>"
            for (let id = 0; id < text_amount; id++) {
                // let text = document.createElement("div");
                new_answer += data[exercise_id]["text_example"][id] + "<br>";
                // answer.appendChild(text);
            }
        }

        answ_button.onclick = function() {
            show_answer(answer_text, new_answer);
        };
        answ_button.innerHTML = "Answer key";

        answer.appendChild(answer_text)

        main_content.appendChild(answ_button)
        main_content.appendChild(answer)

        

}


tree.appendChild(level_part)
tree.appendChild(main_content)


document.getElementById("content").appendChild(tree)