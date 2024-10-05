// This is the basic logical code 

// This is the open source so try to add more features to it

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({TotalTimeVisited : 0 ,StoredOn : Date.now()});
})

// now we are going to add the main logic

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    // now we are going to check the server
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("https://x.com/home")){
        // now let us get all the info
        chrome.storage.sync.get(["TotalTimeVisited", "StoredOn"] , (data)=>{
             
            let {TotalTimeVisited , StoredOn} = data

            let currentTime = Date.now()
            let FindTheTimeLeft = (currentTime - StoredOn)/(1000*60*60);
            if(FindTheTimeLeft >= 24){
                TotalTimeVisited = 0;
                StoredOn = currentTime;
            }
            TotalTimeVisited += 1;
            
            // now we are going to check that whether that we have acheived today's limit or not
            // but before that we are going to save all the current Data to the storage so that it can be updated
            chrome.storage.sync.set({TotalTimeVisited , StoredOn} , ()=>{
                if(TotalTimeVisited >= 20){
                    chrome.tabs.update(tabId , {url : "https://twitter-blocker-page.vercel.app/"})
                }
            })
        })
    }
})