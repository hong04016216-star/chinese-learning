const tb = document.getElementById("tb");
const q = document.getElementById("q");

const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6GyYQJeFh_Zm-vDQH7u4f4b3dKeDgoOVok0LOn6Tc6XqMT6dbw5DJpZ00NzZeydEgWY4VjMG49h-c/pub?gid=782401085&single=true&output=csv";

let vocab = [];

// 播放 MP3
function speak(file) {

    const audio = new Audio("audio/" + file);

    audio.play().catch(() => {
        alert("找不到 MP3：" + file);
    });

}

// 顯示資料
function render(list) {

    tb.innerHTML = "";

    list.forEach(r => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td>${r["中文"]}</td>
        <td>${r["泰文"]}</td>
        <td>${r["拼音"]}</td>
        <td><button>🇹🇼🔊</button></td>
        <td><button>🇹🇭🔊</button></td>
        `;

        const b = tr.querySelectorAll("button");

        b[0].onclick = () => speak(r["中文"] + ".mp3");

        b[1].onclick = () => {
            alert("泰文 MP3 尚未建立");
        };

        tb.appendChild(tr);

    });

}

// 讀 Google 試算表
Papa.parse(CSV_URL, {

    download: true,
    header: true,

    complete: function(results) {

        vocab = results.data.filter(r => r["中文"]);

        render(vocab);

    },

    error: function(err) {

        console.error(err);

        alert("讀取 Google 試算表失敗");

    }

});

// 搜尋
q.addEventListener("input", function() {

    const t = q.value.toLowerCase();

    render(

        vocab.filter(r =>

            Object.values(r)
                .join(" ")
                .toLowerCase()
                .includes(t)

        )

    );

});
