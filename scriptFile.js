const submit = document.getElementById("submit");
const responseData = document.getElementById("response");
const userInput = document.getElementById("user-input");
const chatHistoryLoad = document.getElementById("chat-history");
const loading = document.getElementById("spinner");

let promptResponses = [];





//API call
const generateResponse = async () => {
    //Get the user input
    loading.classList.remove("visually-hidden");
    submit.classList.add("visually-hidden");
    const input = userInput.value;
    const response = await fetch('/chat', {
        method: 'POST',
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": input}],
            temp: 0.6
        }), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();
    const message = responseData.result[0].message.content;
    console.log(message);
    promptResponses.push({question: input, response: message});
    //Clear fields
    userInput.value = "";

    const historyElement = document.createElement('div');
    historyElement.innerHTML = `<li class="list-group-item">Prompt: ${input}</li>
    <li class="list-group-item"> Response: ${message}</li>`;
    chatHistoryLoad.append(historyElement);
    loading.classList.add("visually-hidden");
    submit.classList.remove("visually-hidden");

}

submit.onclick = generateResponse;