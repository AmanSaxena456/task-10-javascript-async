const api = "https://jsonplaceholder.typicode.com/posts";

async function fetchposts(){
    try{
        const response = await fetch(api);
        const data = await response.json();
        displaypost(data.slice(0, 10));
    }
    catch(error){
        console.log("fetching posts...");
        setTimeout(() =>{
            console.log("failed fetching the post", error);
        }, 1000);
    }
}

function displaypost(data){
    const tablebody = document.getElementById("usertablebody");
    tablebody.innerHTML = "";

    data.forEach(d => {
        const row = `
            <tr>
                <td>${d.id}</td>
                <td>${d.title}</td>
                <td>${d.body}</td>
            </tr>
            `
            tablebody.innerHTML += row;
    });
}


fetchposts();