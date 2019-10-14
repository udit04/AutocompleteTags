const autocomplete = document.getElementById('autocomplete');

let autosuggestion = document.getElementById('autosuggestion');

let countryList = document.getElementById('countryList');
let tagsDiv = document.getElementById('tags');

let list = [],suggestions=[],tags=[];
autocomplete.addEventListener('input',(e)=>{
    let html = '';
    list = [];
    if(!e.target.value){
        autosuggestion.innerHTML = '' , countryList.innerHTML = '' , tagsDiv.innerHTML = '';
        suggestions=[],tags=[];
        return;
    }
    list = countries.filter((country)=>{
        return country.name.toLowerCase().includes(e.target.value)
    })
    list.forEach((a)=>{
        html = html + "<p class='suggestions' style='margin-top: 0px'>"+a.name+" : "+a.alpha3Code+"</p>"
    })
    autosuggestion.innerHTML = html;
})

document.addEventListener('click',(e)=>{
    if(e.target && e.target.className === 'suggestions'){
        const cCode = e.target.innerText.split(" : ")[1];        
        if(suggestions.findIndex((s)=>{return s.alpha3Code === cCode})<0){
            tags.push(cCode);
            suggestions.push(list.filter((country)=>{return country.alpha3Code === cCode})[0])
            countryList.innerHTML = JSON.stringify(suggestions);
        }
        let tagHtml = '';
        tags.forEach((tag)=>{
            tagHtml = tagHtml  + "<span style='background-color:lightgrey'><label class='tagged'>"+tag+"</label><i class='fa fa-times fa-xs' aria-hidden='true'></i></span>&nbsp;";
        })
        tagsDiv.innerHTML = tagHtml;
        autosuggestion.innerHTML = '';
        autocomplete.value = '';
     }
     if(e.target && e.target.className === 'tagged'){
        const countrycode = e.target.innerText;
        let index = suggestions.findIndex((s)=>{return s.alpha3Code === countrycode});
        suggestions.splice(index,1);
        countryList.innerHTML = JSON.stringify(suggestions);
        index = tags.findIndex((t)=>{return t === countrycode});
        tags.splice(index,1);
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
     }
 });
 