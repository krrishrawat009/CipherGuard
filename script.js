const CHAR_SET = " `~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let CHARS = Array.from(CHAR_SET);
let KEY = shuffleArray(Array.from(CHAR_SET));

// Shuffle function for generating the cipher key
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];  // Swap
  }
  return array;
}

// Encrypt function
function encrypt() {
  let text = document.getElementById('inputText').value;
  let cipherText = text.split('').map(char => {
    let index = CHARS.indexOf(char); // Find index in the original char set
    return index !== -1 ? KEY[index] : char; // Encrypt with KEY or leave unchanged
  }).join('');
  
  document.getElementById('outputText').value = cipherText;
  highlightOutput(); // Flash output text area
  flashButton('encrypt'); // Flash the encrypt button
}

// Decrypt function
function decrypt() {
  let text = document.getElementById('inputText').value;
  let plainText = text.split('').map(char => {
    let index = KEY.indexOf(char); // Find index in the shuffled key set
    return index !== -1 ? CHARS[index] : char; // Decrypt using original CHAR_SET
  }).join('');
  
  document.getElementById('outputText').value = plainText;
  highlightOutput(); // Flash output text area
  flashButton('decrypt'); // Flash the decrypt button
}

// Highlight output box momentarily
function highlightOutput() {
  let outputArea = document.getElementById('outputText');
  outputArea.style.backgroundColor = '#ffa41c';  // Highlight
  setTimeout(() => {
    outputArea.style.backgroundColor = '#333';   // Revert to original color
  }, 500);  // Keep highlighted for 500ms
}

// Flash the clicked button to provide visual feedback
function flashButton(action) {
  let button = document.querySelector(`button[onclick="${action}()"]`);
  button.style.backgroundColor = '#00ff00';  // Flash green on action
  setTimeout(() => {
    button.style.backgroundColor = '#ffa41c'; // Revert back to original
  }, 300); // Flash for 300ms
}

// Function to update the current date and time dynamically
function updateDateTime() {
  const dateTimeElement = document.getElementById('datetime');
  const now = new Date();
  const formattedDateTime = now.toLocaleString();
  dateTimeElement.textContent = `Current Date and Time: ${formattedDateTime}`;
  setTimeout(updateDateTime, 1000); // Update the time every second
}

// Call the updateDateTime function initially to start the clock
updateDateTime();
