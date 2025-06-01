document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const courseItems = document.querySelectorAll(".course-item");
    
    searchInput.addEventListener("input", function(){
        const query = searchInput.value.trim().toLocaleLowerCase();

        courseItems.forEach(function(item){
            const title = item.querySelector(".course-title").textContent.toLocaleLowerCase();
            if(title.includes(query)){
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    })
})