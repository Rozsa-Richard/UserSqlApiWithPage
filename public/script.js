const loginPage = document.getElementById("login");
const singupPage = document.getElementById("singup");
const loginText = document.getElementById("loginText");
const singupText = document.getElementById("singupText");
seeLogin();

async function login() {
    let email = document.getElementById("lem").value;
    let password = document.getElementById("lpw").value;
    if(email ==""){
        alert("Az emailt mezőt nem töltötte ki");
    }
    else if (password==""){
        alert("A jelszó mezőt nem töltötte ki");
    }
    else if(!isEmail(email)){
        alert("Az email nem jó formátumba adtad meg");
    }
    else {
        alert("Sikeres bejelentkezés");
    }
}

async function singup() {
    let email = document.getElementById("sem").value;
    let password1 = document.getElementById("spw1").value;
    let password2 = document.getElementById("spw2").value;

    if(email == "" || password1=="" || password2==""){
        alert("Az emailt vagy a jelszó mezőt nem töltötte ki");
    }
    else if(!isEmail(email)){
        alert("Az email nem jó formátumba adtad meg");
    }
    else if (password1 != password2){
        alert("Regisztrációnál a jelszó nem egyezik");
    }
    else {
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                email: email,
                password: password1
                })
            });
            console.log(response);
            const data = response.json();
            console.log(data);
            alert(data[2].message);
        }
        catch(error){
            console.log(error);
        }
    }
}
function isEmail(email){
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return emailRegex.test(email)
}

function seeLogin(){
    loginPage.innerHTML =`<h3>Bejelentkezés</h3>
                <p><label for="lem">Email: </label>
                <input id="lem" type="email"><br>
                <label for="lpw">Jelszó: </label>
                <input id="lpw" type="password"><br>
                <button onclick="login()">Bejelentkezés</button></p>`;
    singupPage.innerHTML = `<p class="formthing">Jelentkezz be a fiókodba a továbbiakhoz!<br>A fiókodhoz tartozó jelszavat senkinek se add meg! Visszaélhetnek vele.<br><label>Nincs még fiókod?<label/><button onclick="seeSingUp()" class="textbutton">Regisztráció</button></p>`;
    singupPage.style.backgroundColor ="#217346";
    loginPage.style.backgroundColor="#D9EAD3";
}
function seeSingUp(){
    singupPage.innerHTML = `
                <h3>Regisztráció</h3><p>
                <label for="sem">Email:        </label>
                <input id="sem" type="email"><br>
                <label for="spw1">Jelszó:      </label>
                <input id="spw1" type="password"><br>
                <label for="spw2">Jelszó újra: </label>
                <input id="spw2" type="password"><br>
                <button onclick="singup()">Regisztráció</button><p>`;
    loginPage.innerHTML= `<p class="formthing">A regisztrációhoz add meg az érvényes email címedet. A fiókodhoz tartozó jelszavat senkinek se add meg! Visszaélhetnek vele. <br><label>Van már fiókod?</label> <button onclick="seeLogin()" class="textbutton">Bejelentkezés</button></p>`;
    singupPage.style.backgroundColor ="#D9EAD3";
    loginPage.style.backgroundColor="#217346";
}