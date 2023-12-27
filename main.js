let langOption=document.querySelectorAll("select");
let fromText=document.querySelector(".fromText")
let transText=document.querySelector(".toTranslate")
let fromVoice=document.querySelector(".from")
let toVoice=document.querySelector(".to")
let copyText=document.querySelector(".fa-copy")
let countValue=document.querySelector(".code_length");
let exchanglang=document.querySelector(".fa-right-left")

langOption.forEach((get,con)=>{
    for(let countryCode in language){
        
        let selected;
        if(con==0 && countryCode == "en-GB"){
            selected="selected"
        }else if(con==1 && countryCode == "tr-TR"){
            selected="selected"
        }
        
        let option =`<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`
        get.insertAdjacentHTML("beforeend",option);
    }
})

fromText.addEventListener("input",function(){
    let content=fromText.value;
    fromContent=langOption[0].value;
    transContent=langOption[1].value;
    let transLınk=`https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`
    
    fetch(transLınk)
    .then(translate=>translate.json())
    .then(data=>{
        transText.value=data.responseData.translatedText;
    })
})

fromVoice.addEventListener("click",function(){
    let fromtalk;
    fromtalk=new SpeechSynthesisUtterance(fromText.value);
    fromtalk.lang=langOption[0].value;
    speechSynthesis.speak(fromtalk)
})

toVoice.addEventListener("click",function(){
    let toTalk;
    toTalk=new SpeechSynthesisUtterance(transText.value);
    toTalk.lang=langOption[1].value;
    speechSynthesis.speak(toTalk)
})
copyText.addEventListener("click",function(){
    navigator.clipboard.writeText(transText.value)

})

fromText.addEventListener("keyup",function(){
    let firstCount=fromText.value.length;

    countValue.innerHTML=`${firstCount} / 5.000`


})
exchanglang.addEventListener("click",function(){
    let tempText=fromText.value;
    fromText.value=transText.value;
    transText.value=tempText;

    let tempOpt=langOption[0].value;
    langOption[0].value=langOption[1].value;
    langOption[1].value=tempOpt;
})