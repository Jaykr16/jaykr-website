async function loadMessages(){

const res = await fetch("http://localhost:5000/messages")

const data = await res.json()

const table = document.getElementById("messageTable")

table.innerHTML = ""

data.forEach(msg=>{

const row = `
<tr>
<td>${msg.id}</td>
<td>${msg.name}</td>
<td>${msg.email}</td>
<td>${msg.message}</td>
<td>
<button onclick="deleteMessage(${msg.id})">Delete</button>
</td>
</tr>
`

table.innerHTML += row

})

}

async function deleteMessage(id){

await fetch("http://localhost:5000/delete/"+id,{
method:"DELETE"
})

loadMessages()

}

loadMessages()