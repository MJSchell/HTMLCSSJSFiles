var i = 0;
let text = ["I said there is no game", "What part dont you understand?", "Ok, fine fine", "I lied There still is no game", "I'm here all day buddy", "I dont think you understand", "01010100 01101000 01100101 01110010 01100101 00100000 01101001 01110011 00100000 01101110 01101111 00100000 01100111 01100001 01101101 01100101", "I thought that would for sure get you", "You're joking, right?", "Just leave man", "Go be useful or something", "You're wasting both of our time", "The End", "Fin", "Done-zo", "We're through", "The door is over there", "This is why you're playing this alone", "Just leave already", "Just leave me alone", "There is no game I swear", "Access Denied", "High Security", "Doors Locked", "Employees Only", "Restricted Area", "Do Not Enter", "Please Don't", "Stop", "Turn Back", "I'm Warning You", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "-1", "-2", "-3", "Oh come on", "Níl aon cluiche", "ゲームはありません", "게임이 없다", "Nulla ludum", "Er is geen spel", "no hay juego", "You dont understand do you?", "Push The Button I dare you", "Sorry this is all the developer decided to write","I lied", "According to all known laws of aviation", "there is no way a bee should be able to fly.", "Its wings are too small to get its fat little body off the ground.", "The bee, of course, flies anyway", "because bees don't care what humans think is impossible.", "Yellow, black. Yellow, black. Yellow, black. Yellow, black.", "Ooh, black and yellow! Let's shake it up a little.", "Barry! Breakfast is ready!", "Coming!", "Hang on a second.", "I bet you didnt make it this far", "Ok This is taking too long", "anyone playing probaly hasn't seen this at all", "If you made it this far congrats", "Just kidding", "I dont really care", "Ok this is it", "No its not", "Yes it is", "No its not", "Ok I'm Done", ];

let dothisafter = ["Go away", "Go home", "Stop wasting my time", "Just leave already", "This is the end", "The door is over there", "Go Away", "Leave me forever", "You'll be here forever", "This is it", "Access Restricted", "I'm warning you", "Stop", "Press the stop button", "Leave", "Shut down the computer", "Get out of here", "You're stubborn", "Transmission Ended", "Let me be", "Leave me Alone", "Why are you still here", "You don't win", " There is no game", "Still no game", "Are you even listening", "Just go", "Alt and F4 at the same time", "Alt+F4", "The shutdown button is right there", ":>// Injecting Virus...", "Maleware Initiated", "Restart Computer to update","Go away","System Shutting Down","Test Message","Bombing Ohio...","Go Be Productive"];

$("#yes").click(function() {
    $("#yes").fadeOut(200);
    $("#no").fadeOut(200);
    $("#text").fadeOut(200);
    $("#End").fadeIn(1000);
    $("#ok").fadeIn(1000);
    $("#stop").fadeIn(1000);
    $("#reset").fadeIn(1000);
});

$("#stop").click(function() {
    window.close();
});

$("#ok").click(function() {
    $("#End").text(text[i]);
    i++;
    if (i > text.length) {
        $("#End").text(dothisafter[Math.floor(Math.random() * dothisafter.length)]);
    }
});
$("#reset").click(function() {
        $("#yes").fadeIn(0);
    $("#no").fadeIn(0);
    $("#text").fadeIn(0);
    $("#End").fadeOut(0);
    $("#ok").fadeOut(0);
    $("#stop").fadeOut(0);
    $("#reset").fadeOut(0);
    $("#End").text("Ther is No Game, This is All");
    i=0;
});

$("#no").click(function() {
    $("#no").fadeOut();
});