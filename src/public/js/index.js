const socket = io();


socket.on('messagesLogs', (data)=>{
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages = `${messages} <strong>${message.user}</strong>: ${message.message} </br>`;
    });
    log.innerHTML = messages;
});

socket.on('userConnected', (userName) =>{
    Swal.fire({
        title: `${userName} se ha unido al chat`,
        toast: true,
        position: 'top-right'

    });
})

let user;
let chatBox = document.getElementById('chatBox');

chatBox.addEventListener('keyup', (event)=>{
    if(event.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {
                user: user, 
                message: chatBox.value
            });
            chatBox.value = '';
        }else{

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se puede enviar un mensaje vacio'
            });
        
        };
    };
});


//?Notificación para logearse
Swal.fire({

    title: 'Identificate',
    input: 'text',
    text: 'Ingresa tu nombre de usuario',
    inputValidator: (value) => {
        if (!value) {
            return 'Necesitas ingresar un nombre de usuario para continuar'
        }
    },
    allowOutsideClick: false, //Para que la alerta no se cierre cuando apriete afuera del alerta
}).then((result)=>{
    user = result.value;
    socket.emit('auth', user);
});

Swal.fire({

    title

});