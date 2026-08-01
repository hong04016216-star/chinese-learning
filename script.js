const tb = document.getElementById("tb");
const q = document.getElementById("q");

const API_URL =
"https://script.google.com/macros/s/AKfycbzx6VGPZndEmPtTIaYqCkVtgCdnXlFNG9sW3tMJ1cUYI2_CRuhCTxmnJKZ0rz71ah2r/exec";

let vocab = [];

// 只建立一個播放器
let player = new Audio();

// 播放 MP3
function speak(file){

    if(!file){
        alert("沒有中文 MP3");
        return;
    }

    player.pause();
    player.currentTime = 0;

    player.src = "audio/" + file;

    player.play().catch(()=>{
        alert("找不到 MP3：" + file);
    });

}

// 顯示資料
function render(list){

    tb.innerHTML = "";

    list.forEach(r=>{

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${r["中文"]}</td>
            <td>${r["泰文"]}</td>
            <td>${r["拼音"]}</td>
            <td><button>🇹🇼🔊</button></td>
            <td><button>🇹🇭🔊</button></td>
        `;

        const b = tr.querySelectorAll("button");

        // 中文 MP3
        b[0].onclick = ()=>speak(r["中文MP3"]);

        // 泰文 MP3（以後再做）
        b[1].onclick = ()=>{

            alert("泰文 MP3 尚未建立");

        };

        tb.appendChild(tr);

    });

}

// 讀取 Google 試算表
fetch(API_URL)
.then(r=>r.json())
.then(data=>{

    console.log(data);

    vocab = data;

    render(vocab);

})
.catch(err=>{

    console.error(err);

    alert("無法讀取 Google 試算表");

});

// 搜尋
q.addEventListener("input",()=>{

    const t = q.value.toLowerCase();

    render(

        vocab.filter(r=>

            Object.values(r)
                .join(" ")
                .toLowerCase()
                .includes(t)

        )

    );

});
