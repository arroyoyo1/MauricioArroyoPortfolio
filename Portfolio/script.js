function updateTime() {
    // gets local time zone
    const queretaroTime = new Date().toLocaleTimeString("en-US", { 
        timeZone: "America/Mexico_City", 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const timeElement = document.getElementById('queretaroTime');
    timeElement.textContent = queretaroTime;
}

// updates by min
setInterval(updateTime, 60000);

// calls function
updateTime();
