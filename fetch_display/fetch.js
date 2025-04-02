const api = "https://gorest.co.in/public/v2/users";

async function fetchUsers(){
    try{
        const response = await fetch(api);
        const data = await response.json();
        displayUser(data);
    }
    catch(error){
        console.log("Failed fetching the data", error)
    }
}


function displayUser(users){
    const tablebody = document.getElementById("usertablebody");
    tablebody.innerHTML = "";

    users.forEach(user => {
        const row = `<tr> 
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.status}</td>
            </tr>`;
        tablebody.innerHTML += row; 
    });
}


fetchUsers();