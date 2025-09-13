
// First counter
const textInput1 = document.getElementById('textInput');
const charCount1 = document.getElementById('charCount');

function updateCounter1() {
    const text = textInput1.value;
    charCount1.textContent = text.length;
}

textInput1.addEventListener('input', updateCounter1);

// Second counter (with pre-filled text)
const textInput2 = document.getElementById('textInput2');
const charCount2 = document.getElementById('charCount2');

// Pre-fill with "Hello from ByteXL"
textInput2.value = "Hello from ByteXL";

function updateCounter2() {
    const text = textInput2.value;
    charCount2.textContent = text.length;
}

textInput2.addEventListener('input', updateCounter2);
