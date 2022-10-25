//MODEL
const name=0;
const country=[
                ["Egypt","Arabic","Africa","All"],
                ["Palestine","Arabic","Asia","All"],
                ["SaudiArabia","Arabic","Asia",],
                ["Turkey","Turkish","Asia","All"],
                ["UnitedKingdom","English","Europe","All"],
                ["America","English","NorthAmerica","All"]
                ]

const checkBox=[
    "Africa",
    "Asia",
    "Australia",
    "Europe",
    "NorthAmerica",
    "SouthAmerica",
    "English",
    "Arabic",
    "Turkish",
    "Spanish",
    "Russian",
    "Hindi",
    "Forest",
    "Desert",
    "Sea"
]

let adjs=[]

let idCounter=2

let otherAdjs=[]

let selectedCountry=[]

function filter(country)
{
    selectedCountry=selectedCountry.filter(elem=>
        {
            return elem!==country[name];
        })
        selectedCountry.push(country);
}

function addCountry(countryName)
{
    selectedCountry=selectedCountry.filter(countryObj=>
        {
            return countryName!==countryObj;
        })
        selectedCountry.push(countryName);
}

function selectCountry()
{
    adjs.forEach(adjObj=>
        {
            country.forEach(countryObj=>
                {
                    countryObj.forEach(countryObjAdj=>
                        {
                            if(adjObj.name==countryObjAdj)
                            {
                                addCountry(countryObj[name]);
                            }
                        })
                })
        })
}


function createOther(key)
{
    otherAdjs.push({name:key,id:idCounter++});
    renderOther();
}

function removeOther(id)
{
    otherAdjs=otherAdjs.filter(obj=>
        {
                return obj.id!==id;
        })
        renderOther();
}

function addToAdjs(adj)
{
    adjs=adjs.filter(elem=>
        {
            return elem!==adj;
        })
        adjs.push(adj);

        
        
}

function restartArr(Arr)
{
    Arr=new Array();
}

function combineAdjs()
{
    adjs=otherAdjs;
    check()
}

function check()
{
    checkBox.forEach(filter =>
        {
            if(document.getElementById(filter).checked)
            {
                addToAdjs({name:filter,id:0});   
            }
    
            
        });
}

function infer(inference,rule1,rule2="All")
{
    
    country.forEach(obj=>
        {
            let checkInf=0;
            let checkRule1=0;
            let checkRule2=0;
            obj.forEach(adj=>
            {
                if(adj==inference){checkInf=1;}
                if(adj==rule1){checkRule1=1;}
                if(adj==rule2){checkRule2=1;}
            })
            
            if(!checkInf && checkRule1 && checkRule2)
            {
                obj.push(inference);
            }
        })

    
}
//CONTROLLER

function SearchButton()
{
    selectedCountry=new Array();
    adjs=new Array();
    combineAdjs();

    selectCountry();

    render();
    
}

function addButton()
{
    let val=document.getElementById("OtherInput").value;
    let checker=1;
    otherAdjs.forEach(key=>{
        if(key.name==val)
        {
            checker=0;
        }
    })
    if(checker)
    {
        createOther(val);
    }
}

function removeButton(id)
{
    removeOther(id);
}

function updateButton()
{
    let inference;
    if(document.getElementById("Inference").value=="")
    {
        alert("Please Insert Inference");
    }else if(document.getElementById("FirstRule").value!=="" && document.getElementById("SecondRule").value!=="")
    {
        let rule1=document.getElementById("FirstRule").value;
        let rule2=document.getElementById("SecondRule").value;
        inference=document.getElementById("Inference").value
        infer(inference,rule1,rule2);
    }else if(document.getElementById("FirstRule").value=="" || document.getElementById("SecondRule").value=="")
    {
        let rule;
        if(document.getElementById("FirstRule").value=="")
        {
            rule=document.getElementById("SecondRule").value;
        }else if(document.getElementById("SecondRule").value=="")
        {
            rule=document.getElementById("FirstRule").value;
        }
        inference=document.getElementById("Inference").value;
        infer(inference,rule);
    }else
    {
        alert("fuck off little ass");
    }
}

//VIEW
function render()
{
    renderOther();
    renderOutput();
    /*
    console.log(otherAdjs);
    console.log(adjs);*/
    console.log(selectedCountry);
}

function renderOutput()
{
    document.getElementById("Output").innerHTML="";
    selectedCountry.forEach(obj =>
    {
        let nameElement=document.createElement("div");
        nameElement.innerText=obj;
        nameElement.style.fontWeight="bolder";
        document.getElementById("Output").appendChild(nameElement);
    })
}

function renderOther()
{
    document.getElementById("OtherList").innerHTML="";
    otherAdjs.forEach(function(key)
    {
        let otherElement=document.createElement("div");
        otherElement.id=key.id;
        otherElement.style="display:flex";
        document.getElementById("OtherList").appendChild(otherElement);
        
        let otherKey=document.createElement("div");
        otherKey.innerText=key.name;
        otherKey.id=key.id;
        document.getElementById(key.id).appendChild(otherKey);

        let otherButton=document.createElement("button");
        otherButton.innerText="X";
        otherButton.id=key.id;
        otherButton.onclick=function(){removeButton(parseInt(this.id));}
        document.getElementById(key.id).appendChild(otherButton);

    });
}
