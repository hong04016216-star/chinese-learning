const tb = document.getElementById("tb");
const q = document.getElementById("q");

const API_URL =
"https://script.google.com/macros/s/AKfycbzx6VGPZndEmPtTIaYqCkVtgCdnXlFNG9sW3tMJ1cUYI2_CRuhCTxmnJKZ0rz71ah2r/exec";

let vocab = [];

// 共用播放器
const player = new Audio();

// 播放 MP3
function speak(file) {

    if (!file) {
        alert("沒有 MP3");
        return;
    }

    player.pause();
    player.currentTime = 0;

    player.src = "audio/" + file;

    player.play().catch(() => {
        alert("找不到 MP3：" + file);
    });

}

// 顯示資料
function render(list) {

    tb.innerHTML = "";

    list.forEach(r => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <div class="chinese">
                ${r["中文"] || ""}
                <button class="playBtn">🔊</button>
            </div>

            <div class="pinyin">
                ${r["拼音"] || ""}
            </div>

            <div class="thai">
                ${r["泰文"] || ""}
            </div>
        `;

        card.querySelector(".playBtn").onclick = () => {
            speak(r["中文MP3"]);
        };

        tb.appendChild(card);

    });

}

// 讀取 Google 試算表
fetch(API_URL)
.then(response => response.json())
.then(data => {

    console.log(data);

    vocab = data;

    render(vocab);

})
.catch(error => {

    console.error(error);

    alert("無法讀取 Google 試算表");

});

// 搜尋
q.addEventListener("input", () => {

    const keyword = q.value.trim().toLowerCase();

    const result = vocab.filter(r => {

        return Object.values(r)
            .join(" ")
            .toLowerCase()
            .includes(keyword);

    });

    render(result);

});