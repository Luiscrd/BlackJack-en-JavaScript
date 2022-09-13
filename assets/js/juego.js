(() => {
    'use strict'


    let deck = [];
    const types = ['C', 'D', 'H', 'S'];
    const figures = ['J', 'Q', 'K', 'A'];

    let puntosJugador = 0;
    let puntosDealer = 0;

    let Jugador = {
        puntos: 0,
        cartas: [],
        valores: [],
        useAs: false
    }

    let Dealer = {
        puntos: 0,
        cartas: [],
        valores: [],
        useAs: false
    }

    // Referencias html

    const btnPedir = document.querySelector('#btnPedir')
    const btnEmp = document.querySelector('#btnEmpezar')
    const btnDet = document.querySelector('#btnDetener')
    const btnNue = document.querySelector('#btnNuevo')
    const puntosJugadorEnMesa = document.querySelector('#puntosJugador')
    const cartasJugador = document.querySelector('#jugador-cartas')
    const puntosDealerEnMesa = document.querySelector('#puntosDealer')
    const cartasDealer = document.querySelector('#dealer-cartas')

    const crearDeck = () => {

        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type)
            }
        }

        for (let type of types) {
            for (let figure of figures)
                deck.push(figure + type)
        }

        return _.shuffle(deck);

    }

    crearDeck()

    const pedirCarta = () => {

        if (deck.length === 0) throw ('No quedan más cartas en la baraja')
        const numero = Math.floor(Math.random() * deck.length)
        const carta = deck.splice(numero, 1)
        return carta[0];

    }

    const valorCarta = (carta) => {

        let valor = carta.substring(0, carta.length - 1)

        if (isNaN(valor)) {
            valor = (valor === 'A' ? 11 : 10)
        } else {
            valor = Number(valor)
        }

        return valor;
    }

    // Everntos

    let carta2Dealer;
    btnPedir.disabled = true;
    btnDet.disabled = true;

    btnEmp.addEventListener('click', () => {
        const carta = pedirCarta()
        Jugador.cartas.push(carta)
        Jugador.valores.push(valorCarta(carta))
        Jugador.puntos += valorCarta(carta)
        puntosJugadorEnMesa.innerText = Jugador.puntos
        const imagecard = document.createElement('img')
        imagecard.src = `assets/cartas/${carta}.png`
        imagecard.className = 'carta'
        cartasJugador.append(imagecard)
        setTimeout(() => {
            const carta = pedirCarta()
            if (carta.substring(0, carta.length - 1) === 'A') {
                if ((Jugador.puntos + valorCarta(carta)) > 21) {
                    Jugador.cartas.push(carta)
                    Jugador.valores.push(valorCarta(carta))
                    Jugador.puntos += 1
                } else {
                    Jugador.cartas.push(carta)
                    Jugador.puntos += 11
                }
            } else {
                if ((Jugador.valores.includes(11)) && !Jugador.useAs) {
                    if ((Jugador.puntos + valorCarta(carta)) > 21) {
                        Jugador.cartas.push(carta)
                        Jugador.valores.push(valorCarta(carta))
                        Jugador.puntos += (valorCarta(carta) - 10)
                        Jugador.useAs = true
                    } else {
                        Jugador.cartas.push(carta)
                        Jugador.valores.push(valorCarta(carta))
                        Jugador.puntos += valorCarta(carta)
                    }
                } else {
                    Jugador.cartas.push(carta)
                    Jugador.valores.push(valorCarta(carta))
                    Jugador.puntos += valorCarta(carta)
                }
            }
            if (Jugador.puntos === 21) {
                puntosJugadorEnMesa.className = 'blackjack';
                puntosJugadorEnMesa.innerText = Jugador.puntos + ' - BackJack'
            } else {
                puntosJugadorEnMesa.innerText = Jugador.puntos
            }
            const imagecard = document.createElement('img')
            imagecard.src = `assets/cartas/${carta}.png`
            imagecard.className = 'carta'
            cartasJugador.append(imagecard)
        }, 500);

        

        setTimeout(() => {
            const carta = pedirCarta()
            Dealer.cartas.push(carta)
            Dealer.valores.push(valorCarta(carta))
            Dealer.puntos += valorCarta(carta)
            puntosDealerEnMesa.innerText = Dealer.puntos
            const imagecard = document.createElement('img')
            imagecard.src = `assets/cartas/${carta}.png`
            imagecard.className = 'carta'
            cartasDealer.append(imagecard)
            setTimeout(() => {
                const carta = pedirCarta();
                Dealer.cartas.push(carta)
                Dealer.valores.push(valorCarta(carta))
                Dealer.puntos += valorCarta(carta)
                carta2Dealer = carta;
                const imagecard2 = document.createElement('img')
                imagecard2.src = `assets/cartas/red_back.png`
                imagecard2.className = 'carta'
                imagecard2.id = 'cartaVuelta'
                cartasDealer.append(imagecard2)
                if (Jugador.puntos != 21) btnPedir.disabled = false;
                btnDet.disabled = false;
            }, 500)

        }, 1000);
        btnEmp.disabled = true;

    })




    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta()
        if (carta.substring(0, carta.length - 1) === 'A') {
            if ((Jugador.puntos + valorCarta(carta)) > 21) {
                Jugador.cartas.push(carta)
                Jugador.valores.push(valorCarta(carta))
                Jugador.puntos += 1
            } else {
                Jugador.cartas.push(carta)
                Jugador.puntos += 11
            }
        } else {
            if ((Jugador.valores.includes(11)) && !Jugador.useAs) {
                if ((Jugador.puntos + valorCarta(carta)) > 21) {
                    Jugador.cartas.push(carta)
                    Jugador.valores.push(valorCarta(carta))
                    Jugador.puntos += (valorCarta(carta) - 10)
                    Jugador.useAs = true
                } else {
                    Jugador.cartas.push(carta)
                    Jugador.valores.push(valorCarta(carta))
                    Jugador.puntos += valorCarta(carta)
                }
            } else {
                Jugador.cartas.push(carta)
                Jugador.valores.push(valorCarta(carta))
                Jugador.puntos += valorCarta(carta)
            }
        }

        puntosJugadorEnMesa.innerText = Jugador.puntos
        const imagecard = document.createElement('img')
        imagecard.src = `assets/cartas/${carta}.png`
        imagecard.className = 'carta'
        cartasJugador.append(imagecard)
        if (Jugador.puntos === 21) {
            puntosJugadorEnMesa.className = 'blackjack';
            puntosJugadorEnMesa.innerText = Jugador.puntos + ' - BlacJack';
            btnPedir.disabled = true;
        }
        if (Jugador.puntos > 21) {
            let cartaVuelta = document.querySelector('#cartaVuelta');
            cartaVuelta.src = `assets/cartas/${carta2Dealer}.png`;
            puntosDealerEnMesa.className = 'blackjack';
            puntosDealerEnMesa.innerText = Dealer.puntos + ' - GANÓ';
            puntosJugadorEnMesa.className = 'perdio';
            puntosJugadorEnMesa.innerText = Jugador.puntos + ' - PERDISTE';
            btnPedir.disabled = true;
            btnDet.disabled = true;
        }
    })

    // Turno Dealer

    const turnoDealer = (puntosMinimos) => {

        do {
            const carta = pedirCarta()
            if (carta.substring(0, carta.length - 1) === 'A') {
                if ((Dealer.puntos + valorCarta(carta)) > 21) {
                    Dealer.cartas.push(carta)
                    Dealer.valores.push(valorCarta(carta))
                    Dealer.puntos += 1
                } else {
                    Dealer.cartas.push(carta)
                    Dealer.valores.push(valorCarta(carta))
                    Dealer.puntos += 11
                }
            } else {
                if ((Dealer.valores.includes(11)) && !Dealer.useAs) {
                    if ((Dealer.puntos + valorCarta(carta)) > 21) {
                        Dealer.cartas.push(carta)
                        Dealer.valores.push(valorCarta(carta))
                        Dealer.puntos += (valorCarta(carta) - 10)
                        Dealer.useAs = true
                    } else {
                        Dealer.cartas.push(carta)
                        Dealer.valores.push(valorCarta(carta))
                        Dealer.puntos += valorCarta(carta)
                    }
                } else {
                    Dealer.cartas.push(carta)
                    Dealer.valores.push(valorCarta(carta))
                    Dealer.puntos += valorCarta(carta)
                }
            }

            setTimeout(() => {
                puntosDealerEnMesa.innerText = Dealer.puntos
                const imagecard = document.createElement('img')
                imagecard.src = `assets/cartas/${carta}.png`
                imagecard.className = 'carta'
                cartasDealer.append(imagecard)
                if (Dealer.puntos > 21) {
                    puntosDealerEnMesa.className = 'perdio';
                    puntosDealerEnMesa.innerText = Dealer.puntos + ' - PERDIÓ';
                    puntosJugadorEnMesa.className = 'blackjack';
                    puntosJugadorEnMesa.innerText = Jugador.puntos + ' - GANASTE';
                }

                if (Dealer.puntos === 21) {
                    puntosDealerEnMesa.className = 'blackjack';
                    puntosDealerEnMesa.innerText = Dealer.puntos + ' - BlacJack';
                    puntosJugadorEnMesa.className = 'perdio';
                    puntosJugadorEnMesa.innerText = Jugador.puntos + ' - PERDISTE';
                }

                if ((Dealer.puntos > Jugador.puntos) && (Dealer.puntos < 21)) {
                    puntosDealerEnMesa.className = 'blackjack';
                    puntosDealerEnMesa.innerText = Dealer.puntos + ' - GANÓ';
                    puntosJugadorEnMesa.className = 'perdio';
                    puntosJugadorEnMesa.innerText = Jugador.puntos + ' - PERDISTE';
                }

                if ((Dealer.puntos === Jugador.puntos) && (Dealer.puntos < 21)) {
                    puntosDealerEnMesa.className = 'blackjack';
                    puntosDealerEnMesa.innerText = Dealer.puntos + ' - GANÓ';
                    puntosJugadorEnMesa.className = 'perdio';
                    puntosJugadorEnMesa.innerText = Jugador.puntos + ' - PERDISTE';
                }
            }, 1000)

            if (puntosMinimos > 21) {
                break
            }


        } while ((Dealer.puntos < puntosMinimos) && (puntosMinimos <= 21))

    }

    btnDet.addEventListener('click', () => {
        let cartaVuelta = document.querySelector('#cartaVuelta');
        cartaVuelta.src = `assets/cartas/${carta2Dealer}.png`;
        puntosDealerEnMesa.innerText = Dealer.puntos;
        btnPedir.disabled = true;
        btnDet.disabled = true;
        if (Dealer.puntos === 21) {
            puntosDealerEnMesa.className = 'blackjack';
            puntosDealerEnMesa.innerText = Dealer.puntos + ' - GANÓ';
            puntosJugadorEnMesa.className = 'perdio';
            puntosJugadorEnMesa.innerText = Jugador.puntos + ' - PERDISTE';
            return
        }
        if (Dealer.puntos > 21) {
            puntosDealerEnMesa.className = 'perdio';
            puntosDealerEnMesa.innerText = Dealer.puntos + ' - PERDIÓ';
            puntosJugadorEnMesa.className = 'blackjack';
            puntosJugadorEnMesa.innerText = Jugador.puntos + ' - GANASTE';
            return
        }
        if ((Dealer.puntos > Jugador.puntos) && (Dealer.puntos < 21)) {
            puntosDealerEnMesa.className = 'blackjack';
            puntosDealerEnMesa.innerText = Dealer.puntos + ' - GANÓ';
            puntosJugadorEnMesa.className = 'perdio';
            puntosJugadorEnMesa.innerText = Jugador.puntos + ' - PERDISTE';
            return
        }
        turnoDealer(Jugador.puntos)

    })

    btnNue.addEventListener('click', () => location.reload())


})()