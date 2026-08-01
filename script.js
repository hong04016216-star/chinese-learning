const tb = document.getElementById("tb");
const q = document.getElementById("q");

const API_URL =
"https://script.google.com/macros/s/AKfycbw4xrHBLEuF0vBRb02H5YQs_KOpfctLUw7VYurL5qDSmp-XPCjjxt-cMCAEXbaVKMo/exec";

let vocab = [];

// 播放 MP3
function speak(file){

    const audio = new Audio("audio/" + file);

    audio.play().catch(()=>{
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

        b[0].onclick = ()=>speak(r["中文"] + ".mp3");

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
