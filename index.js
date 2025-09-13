const container = document.querySelector("#container");
const content = document.createElement("div");
content.classList.add("ankit");
content.textContent = "This is the glorious text-content!";
const para = document.createElement("p");
para.textContent = "Hey I'm red!";
para.style.color = "red";
const head3 = document.createElement("h3");
head3.textContent = "I'm a blue h3!";
head3.style.color = "blue";

const div = document.createElement("div");
div.style.border = "solid black 5px";
div.style.backgroundColor = "pink";
const head1 = document.createElement("h1");
head1.textContent = "I'm in a div";
const para2 = document.createElement("p");
para2.textContent = "ME TOO!";
div.appendChild(head1);
div.appendChild(para2);

const btn = document.querySelector("#btn");
// btn.addEventListener('click', () => {
//     alert("Hello World, You are in danger");
// });

// btn.onclick = function(){
//         alert("Hello World")
// };

btn.addEventListener("click", function (e) {
  e.target.style.background = "blue";
});

container.appendChild(content);
container.appendChild(head3);
container.appendChild(para);
container.appendChild(div);

// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll("button");

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    alert(button.id);
  });
});

