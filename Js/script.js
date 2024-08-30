const incrementoPequeno = 0.1006666666666667;
const incrementoGrande = 6.04;
const incrementoMedio = 0.5033333333333333;
const incrementoBosch = 24.16;
const valorPorDiaUtil = 60.434; 
const dataInicial = new Date(2024, 6, 18); 

function obterValorArmazenado() {
    const valorArmazenado = localStorage.getItem('valorTotal');
    return valorArmazenado ? parseFloat(valorArmazenado) : 0;
}

function salvarValorArmazenado(valor) {
    localStorage.setItem('valorTotal', valor.toFixed(2));
}

function atualizarValor(quantidade) {
    const valorElement = document.getElementById('valor');
    let valorAtual = obterValorArmazenado();
    valorAtual += quantidade;
    salvarValorArmazenado(valorAtual);
    valorElement.textContent = `R$ ${valorAtual.toFixed(2).replace('.', ',')}`;
}

function multiplicarValorPorZero() {
    const valorElement = document.getElementById('valor');
    salvarValorArmazenado(0);
    valorElement.textContent = `R$ 0,00`;
}

function atualizarValorAutomaticamente() {1208,68
    const now = new Date();
    if (now.getSeconds() === 0) {
        atualizarValor(incrementoPequeno);
    }
}

function iniciarIncrementoAutomatico() {
    const now = new Date();
    const startHour = 7;
    const startMinute = 30;
    const stopHour = 11;
    const stopMinute = 30;
    const restartHour = 13;
    const restartMinute = 0;
    const endHour = 17;
    const endMinute = 0;

    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, 0);
    const stopTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), stopHour, stopMinute, 0);
    const restartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), restartHour, restartMinute, 0);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, 0);

    if (now >= startTime && now < stopTime) {
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            if (currentTime >= stopTime) {
                clearInterval(intervalId);
                setTimeout(() => iniciarIncrementoAutomatico(), restartTime - currentTime);
            } else {
                atualizarValorAutomaticamente();
            }
        }, 1000);
    } else if (now >= restartTime && now < endTime) {
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            if (currentTime >= endTime) {
                clearInterval(intervalId);
                const nextStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHour, startMinute, 0);
                setTimeout(() => iniciarIncrementoAutomatico(), nextStartTime - currentTime);
            } else {
                atualizarValorAutomaticamente();
            }
        }, 1000); 
    } else if (now < startTime) {
        const delay = startTime - now;
        setTimeout(() => iniciarIncrementoAutomatico(), delay);
    }
}

function ehDiaUtil(data) {
    const diaSemana = data.getDay();
    return diaSemana !== 0 && diaSemana !== 6; 
}

function calcularTotalRecebimentos() {
    const hoje = new Date();
    let totalRecebimentos = 0;

    for (let dia = new Date(dataInicial); dia <= hoje; dia.setDate(dia.getDate() + 1)) {
        if (ehDiaUtil(dia)) {
            totalRecebimentos += valorPorDiaUtil;
        }
    }

    return totalRecebimentos;
}

function atualizarTotalRecebimentos() {
    const totalRecebimentosElement = document.getElementById('total-recebimentos');
    const totalRecebimentos = calcularTotalRecebimentos();
    totalRecebimentosElement.textContent = `R$ ${totalRecebimentos.toFixed(2).replace('.', ',')}`;
}

function startTimer(targetDate, elementId) {
    const timerElement = document.getElementById(elementId);

    function updateTimer() {
        const now = new Date();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            timerElement.textContent = "00 Dias 00 Horas 00 Minutos 00 Segundos";
            clearInterval(timerInterval);
            return;
        }

        const Dias = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const Horas = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const Minutos = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const Segundos = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        timerElement.textContent = `${String(Dias).padStart(2, '0')} Dias ${String(Horas).padStart(2, '0')} Horas ${String(Minutos).padStart(2, '0')} Minutos ${String(Segundos).padStart(2, '0')} Segundos`;
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

document.addEventListener("DOMContentLoaded", () => {
    const valorElement = document.getElementById('valor');
    valorElement.textContent = `R$ ${obterValorArmazenado().toFixed(2).replace('.', ',')}`;

    iniciarIncrementoAutomatico();

    document.getElementById('incrementar-0-117').addEventListener('click', () => {
        atualizarValor(incrementoPequeno);
    });

    document.getElementById('incrementar-7-06').addEventListener('click', () => {
        atualizarValor(incrementoGrande);
    });

    document.getElementById('incrementar-0-585').addEventListener('click', () => {
        atualizarValor(incrementoMedio);
    });

    document.getElementById('incrementar-bosch').addEventListener('click', () => {
        atualizarValor(incrementoBosch);
    });

    document.getElementById('multiplicar-zero').addEventListener('click', () => {
        multiplicarValorPorZero();
    });

    const logo = document.getElementById('dvd-logo');
    const movingImage = document.getElementById('moving-image');
    const container = document.querySelector('.container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const imageWidth = movingImage.offsetWidth;
    const imageHeight = movingImage.offsetHeight;

    let x = Math.random() * (containerWidth - imageWidth);
    let y = Math.random() * (containerHeight - imageHeight);
    let xSpeed = 2;
    let ySpeed = 2;

    function updatePosition() {
        x += xSpeed;
        y += ySpeed;

        if (x <= 0 || x + imageWidth >= containerWidth) {
            xSpeed *= -1;
        }
        if (y <= 0 || y + imageHeight >= containerHeight) {
            ySpeed *= -1;
        }

        movingImage.style.left = `${x}px`;
        movingImage.style.top = `${y}px`;
    }

    function animate() {
        updatePosition();
        requestAnimationFrame(animate);
    }

    animate();

    atualizarTotalRecebimentos();
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    const endOfWorkday = new Date(year, month, day, 17, 0, 0);
    if (now.getHours() >= 17) {
        endOfWorkday.setDate(day + 1);
    }
    startTimer(endOfWorkday, 'timer');

    const endTime15 = new Date(year, month, 15, 6, 0, 0);
    const endTime30 = new Date(year, month, 30, 6, 0, 0);

    let paymentDate;
    if (day <= 15) {
        paymentDate = endTime15;
    } else {
        paymentDate = endTime30;
    }

    startTimer(paymentDate, 'timer15');
    startTimer(endTime30, 'timer30');
});

function addTime() {
    var timeInput = document.getElementById('timeInput');
    var timeValue = timeInput.value;
    
    if (timeValue) {
        var [hours, minutes] = timeValue.split(':').map(Number);
        var inputTime = new Date();
        inputTime.setHours(hours, minutes, 0, 0);
        
        var startOfDay = new Date();
        startOfDay.setHours(7, 30, 0, 0);
        
        if (inputTime >= startOfDay) {
            var totalMinutes = (inputTime - startOfDay) / (1000 * 60);
            var totalValue = (totalMinutes * incrementoPequeno).toFixed(2);

            atualizarValor(parseFloat(totalValue));
        } else {
            alert('O horário deve ser a partir das 07:30.');
        }
        
        timeInput.value = '';
    } else {
        alert('Por favor, insira um horário.');
    }
}
