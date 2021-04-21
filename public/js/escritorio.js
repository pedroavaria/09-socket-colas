

const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')
console.log({escritorio});
lblEscritorio.innerText = escritorio

divAlerta.style.display = 'none'


const socket = io();



socket.on('connect', () => {
    btnAtender.disabled = false

});

socket.on('disconnect', () => {
    btnAtender.disabled = true
});

socket.on('ultimo-ticket', (payload)  => {

})

socket.on('tickets-pendientes', (payload) => {
    lblPendientes.innerHTML = payload
})

btnAtender.addEventListener( 'click', () => {
    // console.log('Click en atender');
    socket.emit('atender-ticket',{escritorio}, ({ok,ticket}) => {
        if (!ok) {
            lblTicket.innerText = `Nadie`
            divAlerta.style = ''
            return
        }
        lblTicket.innerText = `Ticket ${ticket.numero}`
    })


    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket
    // });

});