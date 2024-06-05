// javascript
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    projectId:"Endorsement",
    databaseURL:"https://endorsement-a2f8a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app=initializeApp(appSettings)
const database=getDatabase(app)
const endorsementInDB=ref(database,"endorsements")

const publishBtn=document.getElementById("publish-btn")
const endorsementText=document.getElementById("endorsement-text")
const endorsementList=document.getElementById("endorsement-list")

publishBtn.addEventListener("click",function(){
    let endorsement=endorsementText.value
    push(endorsementInDB,endorsement)
    clearTextArea()
})

onValue(endorsementInDB,function(snapshot){
    if(snapshot.exists()){
        let endorsementContent=Object.entries(snapshot.val())
        clearEndorsementList()
        for(let i=0;i<endorsementContent.length;i++){
            appendToEndorsementList(endorsementContent[i])
        }
    }else{
        endorsementList.textContent="No Endorsements at present ..."
    }
})

function clearEndorsementList(){
    endorsementList.innerHTML=""
}

function clearTextArea(){
    endorsementText.value=""
}

function appendToEndorsementList(item){
    let itemId=item[0]
    let itemValue=item[1]

    let endorsementValue=document.createElement("li")
    endorsementValue.textContent=itemValue

    endorsementValue.addEventListener("dblclick",function(){
        let exactLocationOfItemInDB=ref(database,`endorsements/${itemId}`)
        remove(exactLocationOfItemInDB)
    })

    endorsementList.append(endorsementValue)
}