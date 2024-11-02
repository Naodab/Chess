

document.getElementById("form-login").onclick = function () {
    window.location.href = 'login.html';
};
document.getElementById("form-signup").onclick = function () {
    window.location.href = 'sign up.html';
};



function selectBot(name, quote, description, imgSrc) {
    document.getElementById('profile-name').innerText = name;
    document.getElementById('profile-quote').innerText = quote;
    document.getElementById('profile-description').innerText = description;
    document.getElementById('profile-img').src = imgSrc;

    var bots = document.querySelectorAll('.bot-category .bots img');
    bots.forEach(function (bot) {
        bot.classList.remove('selected');
    });
    event.target.classList.add('selected');
}





function replaceMainDiv() {
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = `
   
<div class="sidebar3">
<div class="header3">
<img alt="User icon" height="30" src="https://storage.googleapis.com/a1aa/image/heMr64OXfLicI0UtpuSABQBe9mZDilIahRrNvZLCIkduoYQnA.jpg" width="30" />
<h1>Play Bots</h1>
</div>
<div class="content3">
<img alt="Bot avatar" height="100" src="https://storage.googleapis.com/a1aa/image/TCZAA1S87rbzKhx7blCyaQtfjfd3e1172Vri6ZaoD2NtoYQnA.jpg" width="100" />
<div class="moves3">
  <p>Saragossa Opening</p>
  <table>
    <tr><th>1.</th><td>c3</td><td>d5</td></tr>
    <tr><th>2.</th><td>e4</td><td>dxe4</td></tr>
    <tr><th>3.</th><td>Q a4+</td><td>N d7</td></tr>
    <tr><th>4.</th><td>d4</td><td>c6</td></tr>
    <tr><th>5.</th><td>f4</td><td>N gf6</td></tr>
    <tr><th>5.</th><td>f4</td><td>N gf6</td></tr>
    <tr><th>5.</th><td>f4</td><td>N gf6</td></tr>
    <tr><th>5.</th><td>f4</td><td>N gf6</td></tr>
    <tr><th>5.</th><td>f4</td><td>N gf6</td></tr>
    <tr><th>5.</th><td>f4</td><td>N gf6</td></tr>
    <tr><th>5.</th><td>f4</td><td>N gf6</td></tr>
    <tr><th>5.</th><td>f4</td><td>N gf6</td></tr>
    <tr><th>5.</th><td>f4</td><td>N gf6</td></tr>
  </table>
</div>
</div>
<div class="footer3">
<button><i class="fas fa-plus"></i></button>
<button><i class="fas fa-times"></i></button>
<button><i class="fas fa-arrow-left"></i></button>
<button><i class="fas fa-arrow-right"></i></button>
<button><i class="fas fa-lightbulb"></i></button>
<div class="accept3">
  <i class="fas fa-flag"></i>
  <span>Chấp nhận thua</span>
</div>
</div>
</div>

`;
}

