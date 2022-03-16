let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;

speechRecognition.onstart = () => {
    document.querySelector("#status").style.display = "block";
  console.log("in start")

};
speechRecognition.onend = () => {
    document.querySelector("#status").style.display = "none";
    console.log("in end")
    document.querySelector("#output").innerHTML = final_transcript;


};
speechRecognition.onError = (e) => {
    document.querySelector("#status").style.display = "none";
    console.log(e)

};

let final_transcript = "";

speechRecognition.onresult = (event) => {
  // Create the interim transcript string locally because we don't want it to persist like final transcript
  let interim_transcript = "";

  // Loop through the results from the speech recognition object.
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }

  // Set the Final franscript and Interim transcript.
  document.querySelector("#output").innerHTML = interim_transcript;

};

function speak(){
    if(!('webkitSpeechRecognition' in window)){
        alert("Your Browser Does not Support Speech Recoginition");
        document.querySelectorAll("button").forEach(e=> e.disabled = true)
        return
    }
}
function copyText(){
  let copiedText = document.querySelector("#output");
  /* Select the text field */
  copiedText.focus();
  copiedText.select();
  copiedText.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copiedText.value);
  alert("Text Copied!")
}
// document.querySelector(".copy-btn").addEventListener("click", await copyText)