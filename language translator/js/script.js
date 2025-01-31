    const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    selectTag = document.querySelectorAll("select"),
    exchangeIcon = document.querySelector(".exchange"),
    translateBtn = document.querySelector("button"),
    icons = document.querySelectorAll(".row i");

    selectTag.forEach((tag, id) => {
        for (const country_code in countries) {
            //selecting english by default as FROM and hindi as TO language
            let selected;
            if(id == 0 && country_code == "en-GB"){
                selected = "selected";   
            } else if(id == 1 && country_code =="hi-IN"){
                selected = "selected";
            }
            let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option); //option tag inside select tag
    }   
    });

    exchangeIcon.addEventListener("click", () => {
        let tempText = fromText.value,
        tempLang = selectTag[0].value;
        fromText.value = toText.value;
        selectTag[0].value = selectTag[1].value;
        toText.value = tempText;
        selectTag[1].value = tempLang;
    })

    translateBtn.addEventListener("click", () => {
        let text = fromText.value,
        translateFrom = selectTag[0].value, //getting fromselect tag value
        translateTo = selectTag[1].value;  //getting toselect value
        if(!text) return;
        toText.setAttribute("placeholder", "translating...");
        let apiUrl =`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        // fetching api response and returning it with parsing into js obj
        //and in another then method receiving that obj
        fetch(apiUrl).then(res => res.json()).then(data => {
            console.log(data);
            toText.value = data.responseData.translatedText;
            toText.setAttribute("placeholder", "translation");        ;
        });


    });

    icons.forEach(icon => {
        icon.addEventListener("click", ({target}) =>{
            if(target.classList.contains("fa-copy")){
                if(target.id == "from") {
                    navigator.clipboard.writeText(fromText.value);
                } else{
                    navigator.clipboard.writeText(toText.value);
                }    
            } else{
                let utterance;
                if(target.id == "from") {
                    utterance = new SpeechSynthesisUtterance(fromText.value);
                    utterance.lang = selectTag[0].value;
                } else{
                    utterance = new SpeechSynthesisUtterance(toTextText.value); 
                    utterance.lang = selectTag[1].value;
                } 
                speechSynthesis.speak(utterance);   
            }
        });
    });