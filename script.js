const tb = document.getElementById("tb");

const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6GyYQJeFh_Zm-vDQH7u4f4b3dKeDgoOVok0LOn6Tc6XqMT6dbw5DJpZ00NzZeydEgWY4VjMG49h-c/pub?gid=782401085&single=true&output=csv";

let vocab = [];

function speak(file){

    const audio = new Audio("audio/" + file);

    audio.play().catch(()=>{
        alert("找不到 MP3：" + file);
    });

}

function render(list){

    tb.innerHTML="";

    list.forEach(r=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`
        <td>${r.中文}</td>
        <td>${r.泰文}</td>
        <td>${r.拼音}</td>
        <td><button>🇹🇼🔊</button></td>
        <td><button>🇹🇭🔊</button></td>
        `;

        const b=tr.querySelectorAll("button");

        b[0].onclick=()=>speak(r.中文 + ".mp3");

        b[1].onclick=()=>alert("泰文 MP3 尚未建立");

        tb.appendChild(tr);

    });

}

fetch(CSV_URL)
.then(r=>r.text())
.then(text=>{

    const lines=text.trim().split("\n");

    const header=lines[0].split(",");

    vocab=lines.slice(1).map(line=>{

        const cols=line.split(",");

        return{
            中文:cols[0],
            泰文:cols[1],
            拼音:cols[2]
        };

    });

    render(vocab);

});

q.oninput=e=>{

    const t=e.target.value.toLowerCase();

    render(

        vocab.filter(r=>

            Object.values(r)

            .join(" ")

            .toLowerCase()

            .includes(t)

        )

    );

};
