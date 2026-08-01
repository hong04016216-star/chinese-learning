const tb = document.getElementById("tb");

// 播放 MP3
function speak(file) {

    if (!file) {
        alert("沒有 MP3");
        return;
    }

    const audio = new Audio("audio/" + file);
    audio.play().catch(err => {
        console.error(err);
        alert("播放失敗");
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

        // 中文
        b[0].onclick = () => speak(r["中文MP3"]);

        // 泰文（以後再加）
        b[1].onclick = () => {
            alert("泰文 MP3 尚未建立");
        };

        tb.appendChild(tr);

    });

}

render(vocab);

// 搜尋
q.oninput = e => {

    const t = e.target.value.toLowerCase();

    render(
        vocab.filter(r =>
            Object.values(r).join(" ").toLowerCase().includes(t)
        )
    );

};
