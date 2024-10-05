// so first we are going to let the whole html page ot arrive then only we will check the data

// const TimeVisited = document.getElementById("chaser")
// const TheTotalTimeLeft = document.getElementById("lefter")

document.addEventListener("DOMContentLoaded" , ()=>{
    chrome.storage.sync.get(["TotalTimeVisited", "StoredOn"] , (data)=>{
        const {TotalTimeVisited = 0 , StoredOn = Date.now()} = data
        document.getElementById("chaser").textContent = TotalTimeVisited

        // now i am going to check the total Time so that we can distplay it to the screen
        
        const CurrentTime = Date.now()

        const FindTheTimeLeft = (CurrentTime-StoredOn)/(1000*60*60)

        const letHostTheTime = Math.max(0,24-FindTheTimeLeft)

        document.getElementById("lefter").textContent = Math.floor(letHostTheTime)

    })
})