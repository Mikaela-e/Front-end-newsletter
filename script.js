window.onload = function (e) {
e.preventDefault();
};

let welcomeTxt = document.createElement("h3")
welcomeTxt.classList.add("welcomeTxt")
welcomeTxt.innerText = "Welcome to the Newsletter";
document.body.append(welcomeTxt)

let container = document.createElement("div")
container.classList.add("container");

let usernameTxt = document.createElement("p")
usernameTxt.classList.add("usernameTxt")
usernameTxt.innerText = "Username:";

let usernameInput = document.createElement("input")
usernameInput.classList.add("usernameInput")
usernameInput.placeholder = "Username";

let passwordTxt = document.createElement("p")
passwordTxt.classList.add("passwordTxt")
passwordTxt.innerText = "Password:";

let passwordInput = document.createElement("input")
passwordInput.classList.add("passwordInput")
// passwordInput.setAttribute("type", "password")
passwordInput.placeholder = "Password";

let logInBtn = document.createElement("button")
logInBtn.classList.add("logInBtn")
logInBtn.innerText = "Log in";

let p1 = document.createElement("p");
p1.classList.add("p1");

document.body.append(container)
container.append(usernameTxt,usernameInput,passwordTxt,passwordInput,logInBtn, p1)

//////
let h2 = document.createElement("h2")
h2.classList.add("h2")
h2.innerText = "Register to become a member";

let newUserNameTxt = document.createElement("p")
newUserNameTxt.classList.add("newUserNameTxt")
newUserNameTxt.innerText = "Username:";

let newUsername = document.createElement("input")
newUsername.classList.add("newUsername")
newUsername.placeholder = "Username";

let newPasswordTxt = document.createElement("p")
newPasswordTxt.classList.add("newPasswordTxt")
newPasswordTxt.innerText = "Password:";

let newPassword = document.createElement("input")
newPassword.classList.add("newPassword")
// newPassword.setAttribute("type", "password")
newPassword.placeholder = "Password";

let subscribeTxt = document.createElement("p")
subscribeTxt.classList.add("subscribeTxt") 
subscribeTxt.innerText = "Subscribe to our newsletter:";

let subCheckbox = document.createElement("input")
subCheckbox.classList.add("subCheckbox")
subCheckbox.setAttribute("type","checkbox");

let newUserBtn = document.createElement("button")
newUserBtn.classList.add("newUserBtn")
newUserBtn.innerText = "Register";

let p = document.createElement("p")
p.classList.add("p");
    
container.append(h2,newUserNameTxt,newUsername,newPasswordTxt,newPassword,subscribeTxt, subCheckbox,newUserBtn,p)


logInBtn.addEventListener("click", function(e){
e.preventDefault();
let user = {
    username: usernameInput.value,
    password: passwordInput.value,
}
fetch('http://localhost:3000/api/users/login', {
    method: 'POST', // or 'PUT'
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
})
    .then((response) => response.json())
    .then((data) => {
    if(data != "error"){     
    localStorage.getItem("userId")
    loggedIn(data)
    }else{
    p1.innerHTML ="You must fill in the fields"
    }}).catch(err=>{console.log(err)})
});

function loggedIn(id) {
container.innerHTML = "";
fetch(`http://localhost:3000/api/users/login/${id}`)
    .then(response => response.json())
    .then(data => {
    welcomeTxt.innerHTML = "You are now logged in"
    let h1 = document.createElement("h1");
     h1.classList.add("h1")
     h1.innerHTML = "welcome" + " " + data.username;

    let inloggedSubBtn = document.createElement("button");
    inloggedSubBtn.classList.add("inloggedSubBtn")
    inloggedSubBtn.innerText = "Subscribe"

inloggedSubBtn.addEventListener("click", () => changeSubscribe(data));
    if (data.subscriber) {
    inloggedSubBtn.style.backgroundColor="green"
    inloggedSubBtn.innerHTML ="Subscribe"

    let yesSub = document.createElement("h2")
    yesSub.classList.add("yesSub");
    yesSub.innerText = "You are now a subscriber"
    container.append(yesSub)
    }else {
    inloggedSubBtn.innerHTML ="Subscribe"
    let noSub = document.createElement("h2")
    noSub.classList.add("noSub");
    noSub.innerText = "You ended your subscription"
    container.append(noSub)
};
    let logoutBtn = document.createElement("button");
    logoutBtn.classList.add("logoutBtn")
    logoutBtn.innerHTML = "Log out"
logoutBtn.addEventListener("click", function(e){
    location.reload();
    localStorage.removeItem("userId")
});
    container.append(h1, inloggedSubBtn,logoutBtn);
    }).catch(err => console.error(err))
};
    let subscriber = false;

subCheckbox.addEventListener("click", function(){
    if(subCheckbox.checked){
    subscriber = true;
    }else{
    subscriber = false;
};
});

newUserBtn.addEventListener("click", function (e){
e.preventDefault();
let user = {
    username: newUsername.value,
    password: newPassword.value,
    subscriber: subscriber
};
fetch('http://localhost:3000/api/users/add', {
    method: 'POST', // or 'PUT'
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    })
    .then((response) => response.json())
    .then((data) => {
    if (data === "created") {
    localStorage.setItem("userId", data)
    p.innerText = "You are now registered";
    }
    else if (data === "Username already exists"){
    p.innerText = "This user is already taken"
}}
)});

function changeSubscribe(data) {
let login = {
     _id: data._id,
    subscriber: !data.subscriber
};
fetch('http://localhost:3000/api/users/change', {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(login)})
    .then(response => response.json())
    .then(data => {
    loggedIn(data._id)
    }).catch(err => { console.log(err) })

}