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

var main_content = document.createElement("div")
main_content.setAttribute("id", "main")
main_content.setAttribute("class", "container px-4")

const exercises_amount = Object.keys(data).length




function show_item(x, key) {
    x.innerHTML = key;
    if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
    }
}

function choose_ex() {
    if (document.title.split(" ")[0] == "Treasure") {
        main_content.innerHTML = ""
        let level = select_level.options[select_level.selectedIndex].text
        let topic = select_topic.options[select_topic.selectedIndex].text    
        for (var exercise_id = 0; exercise_id < exercises_amount; exercise_id++) {
            let level_from_db = data[exercise_id]["level"]
            let topic_from_db = data[exercise_id]["topic"]
            var splitted_topic = topic_from_db.split(", ")            
            if (level == "All levels" || level_from_db == "All levels") {
                if (topic == topic_from_db || topic == "All topics") {
                    build_exercise(exercise_id)
                } else if (splitted_topic.length == 2) {
                    if (topic == splitted_topic[0] || topic == splitted_topic[1]) {
                        build_exercise(exercise_id)
                    }
                }
            } else if (level_from_db.length == 5) {
                var levels = level_from_db.split("/")
                if (level == levels[0] || level == levels[1]) {
                    if (topic == topic_from_db || topic == "All topics") {
                        build_exercise(exercise_id)
                    } else if (splitted_topic.length == 2) {
                        if (topic == splitted_topic[0] || topic == splitted_topic[1]) {
                            build_exercise(exercise_id)
                        }
                    }
                }
            } else if (level == level_from_db || level == "All levels") {
                if (topic == topic_from_db || topic == "All topics") {
                    build_exercise(exercise_id)
                } else if (splitted_topic.length == 2) {
                    if (topic == splitted_topic[0] || topic == splitted_topic[1]) {
                        build_exercise(exercise_id)
                    }
                }
            }

            splitted_topic = undefined;
            
            // console.log(exercise_id + 1 , splitted_topic)
        }
    } else {
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
    
}


function add_section (ex_id, key, button_name) {
    let amount = Object.keys(data[ex_id][key]).length
    let new_text = ""
    for (let id = 0; id < amount; id++) {
        new_text += data[ex_id][key][id] + "<br>";
    }


    let item = document.createElement("div");
    item.setAttribute("class", "d-grid gap-3 d-md-flex");


    let item_text = document.createElement("p");
    item_text.style.display = "none";
    item_text.style.fontSize = "15px";
    item_text.style.fontStyle = "italic";


    let item_button = document.createElement("button")
    item_button.setAttribute("type", "button")
    item_button.setAttribute("class", "btn btn-outline-primary btn-sm")

    item_button.setAttribute("style", "margin: 3px")


    item_button.onclick = function() {
        show_item(item_text, new_text);
    };
    item_button.innerHTML = button_name;

    item.appendChild(item_text)

    main_content.appendChild(item_button)
    main_content.appendChild(item)
}


var level_part = document.createElement("div")
level_part.setAttribute("class", "container px-4")
level_part.setAttribute("style", "margin-top: 20px")

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
    if (array_levels[ind] == "All levels") {
        option.setAttribute("selected", "selected")
    }
}



let level_button = document.createElement("input")
level_button.setAttribute("type", "button")
level_button.setAttribute("value", "Choose")

level_button.setAttribute("class", "btn btn-outline-primary btn-sm")

level_button.onclick = function() {
    choose_ex();
};

form_level.appendChild(select_level)
form_level.appendChild(level_button)


level_part.append(form_level)

if (document.title.split(" ")[0] == "Treasure") {
    var topic_part = document.createElement("div")
    topic_part.setAttribute("class", "container px-4")
    topic_part.setAttribute("style", "margin-top: 20px")
    
    var form_topic = document.createElement("div")
    form_topic.setAttribute("class", "float-end")
    form_topic.innerHTML = "Topic:"
    
    var select_topic = document.createElement("select")
    select_topic.setAttribute("name", "topic")
    select_topic.setAttribute("id", "topic")
    select_topic.setAttribute("class", "form-select")
    
    var array_topics = ["Sounds and Letters", "Meanings of words", "Morphology", "Case and Prepositions",
                        "Singular vs. Plural", "All topics"]
    
    for (const ind in array_topics) {
        let option = document.createElement("option")
        option.setAttribute("value", array_topics[ind])
        option.innerHTML = array_topics[ind]
        select_topic.appendChild(option)
        if (array_topics[ind] == "All topics") {
            option.setAttribute("selected", "selected")
        }
    }
    
    form_topic.appendChild(select_topic)
    
    topic_part.append(form_topic)
}




function build_exercise(exercise_id) {
    var task_title = document.createElement("h3");
    task_title.setAttribute("style", "margin-top: 30px");
    if (document.title.split(" ")[0] == "Treasure") {
        task_title.innerHTML = `${exercise_id + 1}. ${data[exercise_id]["topic"]}&ensp;<i style="font-weight:normal">${data[exercise_id]["level"]}</i>`;
    } else {
        task_title.innerHTML = `${exercise_id + 1}. ${data[exercise_id]["name"]} <i style="font-weight:normal">${data[exercise_id]["level"]}</i>`;
    }
    
    
    main_content.appendChild(task_title);

    if (data[exercise_id]["title"] != null) {
        let instructions = document.createElement("div");
        instructions.innerHTML = `<b>Choose:</b> ${data[exercise_id]["title"]}`;
        main_content.appendChild(instructions);
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


    if (document.title.split(" ")[0] == "Treasure") {
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

        let new_answer = data[exercise_id]["answer"]

        answ_button.onclick = function() {
            show_item(answer_text, new_answer);
        };
        answ_button.innerHTML = "Answer key";

        answer.appendChild(answer_text)

        main_content.appendChild(answ_button)
        main_content.appendChild(answer)

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
                show_item(extra_task_text, new_extra_task);
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
                show_item(ta_idea_text, new_ta_idea);
            };
            ta_idea_button.innerHTML = "Take-away idea";
    
            ta_idea.appendChild(ta_idea_text)
            main_content.appendChild(ta_idea_button)
            main_content.appendChild(ta_idea)
        }
    } else {

        

        let constr_amount = Object.keys(data[exercise_id]["construction"]).length
        let new_construction = ""
        for (let id = 0; id < constr_amount; id++) {
            new_construction += data[exercise_id]["construction"][id] + "<br>";
        }

        let construction = document.createElement("div");
        construction.setAttribute("class", "d-grid gap-3 d-md-flex");


        let construction_text = document.createElement("p");
        construction_text.style.display = "none";
        construction_text.style.fontSize = "15px";
        construction_text.style.fontStyle = "italic";


        let construction_button = document.createElement("button")
        construction_button.setAttribute("type", "button")
        construction_button.setAttribute("class", "btn btn-outline-primary btn-sm")

        construction_button.setAttribute("style", "margin: 3px")


        construction_button.onclick = function() {
            show_item(construction_text, new_construction);
        };
        construction_button.innerHTML = "Constructions and collocations you can use";

        construction.appendChild(construction_text)

        main_content.appendChild(construction_button)
        main_content.appendChild(construction)
        

        let text_amount = Object.keys(data[exercise_id]["text_example"]).length
        let new_text = ""
        for (let id = 0; id < text_amount; id++) {
            new_text += data[exercise_id]["text_example"][id] + "<br>";
        }


        let texts = document.createElement("div");
        texts.setAttribute("class", "d-grid gap-3 d-md-flex");


        let text_data = document.createElement("p");
        text_data.style.display = "none";
        text_data.style.fontSize = "15px";
        text_data.style.fontStyle = "italic";


        let text_button = document.createElement("button")
        text_button.setAttribute("type", "button")
        text_button.setAttribute("class", "btn btn-outline-primary btn-sm")

        text_button.setAttribute("style", "margin: 3px")


        text_button.onclick = function() {
            show_item(text_data, new_text);
        };
        text_button.innerHTML = "Examples of texts";

        texts.appendChild(text_data)

        main_content.appendChild(text_button)
        main_content.appendChild(texts)

        add_section (exercise_id, "reading", "Reading challenge")
        add_section (exercise_id, "translation", "Translation")
    }    

}


tree.appendChild(level_part)
if (document.title.split(" ")[0] == "Treasure") {
    tree.appendChild(topic_part)
}

tree.appendChild(main_content)


document.getElementById("content").appendChild(tree)