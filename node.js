var cadastrarBotao = document.getElementById("cadastrar-button");
var cadastrarForm = document.getElementById("cadastrar-form")
var username = document.getElementById("name-value")
var password = document.getElementById("pass-value")
var confirmPassword = document.getElementById("pass-confirm-value")
var email = document.getElementById("email-value")
var termosCheck = document.getElementById("termos-check")
var dadosErrados = document.createElement("span");
var texto = document.createElement("span")
var logarForm = document.getElementById("logar-form")
var logarButton = document.getElementById("logar-button")
var logarEmail = document.getElementById("logar-email")
var logarPassword = document.getElementById("logar-password")
var sairDaConta = document.getElementById("sair-da-conta")
var salvarbotao = document.getElementById("salvar-conta")
var novaSenha = document.getElementById("nova-senha")
var dispositivoDiv = document.querySelector(".dispositivo-ativo-div")
var minhaContaEmailBefore = document.getElementById("minha-conta-email")
var minhaContaPasswordBefore = document.getElementById("minha-conta-password")
var minhaContaUsernameBefore = document.getElementById("minha-conta-username")
var pesquisarInput = document.getElementById("pesquisar-label")
var enviarAjuda = document.getElementById("email-api")
var gerarConexao = document.getElementById("gerar-conexao")
var gerarPopup = document.querySelector(".gerar-popup")
var gerarCancelar = document.querySelector(".sair-popup")
var statusDeUso = document.querySelector(".status-de-uso")
var excluirContainer = document.querySelector(".excluir-container")
var statusDeUsoDiv = document.querySelector(".status-de-uso-div")
var mandaInput = document.querySelectorAll(".dispositivo-input")
var dadosAnterior
var mandaLed = document.querySelectorAll(".led-ativo")
let nome;
var nomeAnterior = "";
var dataHashes = [];
var ultimoDispositivo = "";
var suporte = 0;
var notificacoes = document.querySelector(".notificacoes")
var time = 0;
var format = ""
var salvarInput = "";
var esqueceuForm = document.querySelector("#esqueceu-form");
var botaoEscolhido = document.querySelectorAll(".botoes-escolha div");
var pinoInput = document.querySelector(".gerar-popup input")
var timeoutId = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;



window.onload = () =>{



    var local1 = document.getElementById("cc")
    var local2 = document.getElementById("btncabecalho")
    var local3 = document.getElementById("comecar-action")
    var local4 = document.getElementById("comecar-action-2")
    if(localStorage.getItem('manter_conexao') !== undefined && localStorage.getItem('manter_conexao') !== null && local1 !== null && local2 !== null && local3 !== null && local4 !== null){
        local1.href = "dashboard.html";
        local2.href = "dashboard.html";
        local3.href = "dashboard.html";
        local4.href = "dashboard.html";

    }else if(localStorage.getItem('manter_conexao') === undefined && localStorage.getItem('manter_conexao') === null && local1 !==null && local2 !==null && local3 !==null && local4 !== null){
        local1.href = "logar.html";
        local2.href = "logar.html";
        local3.href = "logar.html";
        local4.href = "logar.html";
        
  

    }else{
        console.log("nÃ£o foram encontrados os locais da pagina inicial");
    }
}


setInterval(()=>{
    if(statusDeUsoDiv){
    if(statusDeUsoDiv.innerHTML.includes("ðŸŸ¢ Conectado")){
        seconds+=1;
        if(seconds >=60){
            seconds = 0
            minutes+=1
        }
        if(minutes >=60){
            minutes = 0
            hours+=1
        }
    }if(statusDeUsoDiv.innerHTML.includes("ðŸ”´ Desconectado")){
        var botoesDisponiveis = document.querySelector(".botoes-disponiveis-div")
        hours = 0;
        minutes =0;
        seconds =0;
        botoesDisponiveis.innerHTML = ""


    }

    
    }
    
},1000)

if(esqueceuForm){
    var button = esqueceuForm.querySelector("#esqueceu-button");
    var texto = document.createElement("div");
    var valorEmail = esqueceuForm.querySelector("input");


    if(button){
        button.addEventListener("click",()=>{

            if(esqueceuForm.lastChild == texto){
                esqueceuForm.removeChild(texto)
    
            }


            

            if(valorEmail.value.length > 0){

                var dadosInput = {
                    email: valorEmail.value
                }

                fetch("https://vinixwebhook1488.glitch.me/postEsqueceuSenha",{
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json", 
                    },
                        
                    body: JSON.stringify(dadosInput),
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error(`Erro na requisiÃ§Ã£o: ${response.status}`);
                            }
                            texto.innerHTML = "erro de conexÃ£o com servidor"
                            texto.style.color = "red"
                            return response.json(); 
                            })
                            .then(data => {
                                console.log("Resposta da API (em JSON):", data);
                                if(data.mensagem == "E-mail enviado com sucesso!"){
                                    texto.style.color = "white"
                                    texto.innerHTML = "nova senha enviada ao email"
                                }else{
                                    texto.style.color = "red"
                                    texto.innerHTML = "erro interno de servidor"
                                } 
                            })
                            .catch(error => console.error('Erro:', error));
                


                
                esqueceuForm.appendChild(texto)

            }else if(valorEmail.value.length == 0){
                texto.style.color = "red";
                texto.innerHTML = `insira alguma coisa`
                esqueceuForm.appendChild(texto)
            }


        
        })
    }
}
var client;
const meuEvento = new Event("DOMUpdates");

document.addEventListener("DOMUpdates",()=>{


    var botoesDisponiveis = document.querySelector(".botoes-disponiveis-div")
    var lastdivDisponivel = botoesDisponiveis.lastElementChild

    if(parseInt(lastdivDisponivel.getAttribute("id"))){
        lastdivDisponivel.addEventListener("click",()=>{
            if(lastdivDisponivel.innerHTML.includes("ledComum")){


                client.publish("esp32/devices/ledComum/"+localStorage.getItem("manter_conexao")
                ,lastdivDisponivel.getAttribute("id"));

            }
            else if(lastdivDisponivel.innerHTML.includes("buzzerAtivo")){
                client.publish("esp32/devices/buzzerAtivo/"+localStorage.getItem("manter_conexao"),lastdivDisponivel.getAttribute("id"))
            }
            else if(lastdivDisponivel.innerHTML.includes("ledRGB")){
                client.publish("esp32/devices/ledRGB/"+localStorage.getItem("manter_conexao"),lastdivDisponivel.getAttribute("id"))

            }else if(lastdivDisponivel.innerHTML.includes("releSRD")){
                client.publish("esp32/devices/releSRD/"+localStorage.getItem("manter_conexao"),lastdivDisponivel.getAttribute("id"))
            }

        })
    }else if(lastdivDisponivel.getAttribute("id") == "display1"){
        lastdivDisponivel.addEventListener("keyup",()=>{
            if(!lastdivDisponivel.value.match(/\d+/)){
            client.publish("esp32/devices/displayLCD/"+localStorage.getItem("manter_conexao"),String(lastdivDisponivel.value))
            }else{
                alert("nÃ£o pode numeros")
                lastdivDisponivel.value = ""
            }
            
        })
    }if(lastdivDisponivel.getAttribute("id") == "display2"){
        lastdivDisponivel.addEventListener("keyup",()=>{
            if(!lastdivDisponivel.value.match(/\d+/)){
            client.publish("esp32/devices/displayOLED/"+localStorage.getItem("manter_conexao"),String(lastdivDisponivel.value))
            }else{
                alert("nÃ£o pode numeros")
                lastdivDisponivel.value = ""
            }
            
        })
    }else if(lastdivDisponivel.getAttribute("id") == "display3"){
        lastdivDisponivel.addEventListener("keyup",()=>{
            console.log("a")
        if(lastdivDisponivel.value >= 0 && lastdivDisponivel.value <= 360){
            client.publish("esp32/devices/servoSG90/"+localStorage.getItem("manter_conexao"),String(lastdivDisponivel.value)+':'+parseInt(lastdivDisponivel.placeholder))

        }else{
            alert("insira um angulo inteiro entre 0 e 360")
            lastdivDisponivel.value = "";
        }
        })
    }
   

        })


if(dispositivoDiv){

    client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');
    client.on('connect', () => {
    console.log('Conectado ao servidor');
    client.subscribe("esp32/connection/client/"+localStorage.getItem("manter_conexao"));

    client.subscribe("esp32/devices/ledComumOUT/"+localStorage.getItem("manter_conexao"));
    client.subscribe("esp32/devices/displayLCDOUT/"+localStorage.getItem("manter_conexao"));
    client.subscribe("esp32/devices/displayOLEDOUT/"+localStorage.getItem("manter_conexao"));
    client.subscribe("esp32/devices/servoOUT/"+localStorage.getItem("manter_conexao"));
    client.subscribe("esp32/devices/buzzerAtivoOUT/"+localStorage.getItem("manter_conexao"));
    client.subscribe("esp32/devices/releSRDOUT/"+localStorage.getItem("manter_conexao"));
    client.subscribe("esp32/devices/ledRGBOUT/"+localStorage.getItem("manter_conexao"));

    });
    client.on("message", function (topic,message){
        var divDisponivel = document.querySelectorAll('.div-disponivel');

        var messageBroker = new TextDecoder('utf-8').decode(message)
        console.log(messageBroker)
        if (topic === "esp32/connection/client/" + localStorage.getItem("manter_conexao")) {

            if(messageBroker == "online"){
            statusDeUsoDiv.innerHTML = `ðŸŸ¢ Conectado<br/>${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
            }
            clearTimeout(timeoutId);
            timeoutId = 0

            timeoutId = setTimeout(() => {
                statusDeUsoDiv.innerHTML = "ðŸ”´ Desconectado";
            }, 10000);
        }
        if(topic == "esp32/devices/ledComumOUT/"+localStorage.getItem("manter_conexao")){

            if(messageBroker.includes("ativo")){
                var id = messageBroker.substring(5);
                alert("pino ativo");
                
                /*divDisponivel.forEach(el=>{
                    if(el.innerHTML.includes(id) && el.innerHTML.includes("ledComum")){
                        el.style.backgroundColor = "green"
                    }

                })*/

            }
            if(messageBroker.includes("desligado")){
                var id = messageBroker.substring(9);
                alert("pino inativo");
                /*divDisponivel.forEach(el=>{
                    if(el.innerHTML.includes(id) && el.innerHTML.includes("ledComum")){
                        el.style.backgroundColor = "#7A7A7A"
                    }
                })*/

            }

        }
        if(topic == "esp32/devices/buzzerAtivoOUT/"+localStorage.getItem("manter_conexao")){
            if(messageBroker.includes("som")){
                var id = messageBroker.substring(3);
                alert("som")
            }
            if(messageBroker.includes("mudo")){
                var id = messageBroker.substring(4)
                alert("mudo")

            }
        }
        if(topic == "esp32/devices/displayLCDOUT/"+localStorage.getItem("manter_conexao")){
            var messageWithoutId = messageBroker.match(/[a-zA-Z\s:]+/)
            alert('display lcd mensagem: '+ messageWithoutId)
            var idOfMessage = messageBroker.replace(messageWithoutId,'')
                /*divDisponivel.forEach(el=>{
                    if(el.getAttribute("id") == "display1"){
                        el.value = messageWithoutId

                    }
                })*/
        }
        if(topic == "esp32/devices/displayOLEDOUT/"+localStorage.getItem("manter_conexao")){
            var messageWithoutId = messageBroker.match(/[a-zA-Z\s:]+/)
            alert('display oled mensagem: '+messageWithoutId)
            var idOfMessage = messageBroker.replace(messageWithoutId,'')
            /*divDisponivel.forEach(el=>{
                if(el.getAttribute("id") == "display1"){
                    el.value = messageWithoutId

                }
            })*/
        }
        if(topic == "esp32/devices/ledRGBOUT/"+localStorage.getItem("manter_conexao")){
            var messageWithoutId = messageBroker.match(/[a-zA-Z\s:]+/);
            alert(messageWithoutId);
        }
        if(topic == "esp32/devices/servoOUT/"+localStorage.getItem("manter_conexao")){
            var messageWithoutId = messageBroker.match(/[a-zA-Z\s:]+/)
            alert(messageWithoutId);
        }
        if(topic == "esp32/devices/releSRDOUT/"+localStorage.getItem("manter_conexao")){
            var messageWithoutId = messageBroker.match(/[a-zA-Z\s:]+/)
            alert(messageWithoutId);
        }
    })

    if(localStorage.getItem("manter_conexao")){
        dispositivoDiv.innerHTML = localStorage.getItem("manter_conexao");
    }
    messageBroker = ""


}

    


       
if(notificacoes){
    const dados = {
        email: localStorage.getItem("manter_conexao")
    }
    fetch("https://vinixwebhook1488.glitch.me/confirmarNotificar",{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados),
    
        }).then(response=>{
            if (!response.ok) {
                throw new Error(`Erro na requisiÃ§Ã£o: ${response.status}`);
            }
        return response.json();
        },
    ).then(data => {
        var dados = data.tempos || null
        var notificacao = document.querySelector(".notificacao")


        if(dados != null){
            const size = data.tempos.length;
            document.querySelector(".nenhuma-notificacao").style.display = 'none'

            for(let i =0;i<size;i++){

                var notificacaoClone = notificacao.cloneNode(true)

                var titulo = notificacaoClone.querySelector("h3")
                titulo.innerHTML = "Nova Mensagem"

                var conteudo  = notificacaoClone.querySelector("div")
                conteudo.innerHTML = data.notificacoes[i]


                var spanClone = notificacao.querySelector('span').cloneNode(true);
                spanClone.innerHTML = data.tempos[i]
                notificacaoClone.appendChild(spanClone);

            

                notificacoes.appendChild(notificacaoClone)
                notificacaoClone.style.display = 'flex'

            }

        }
        

    })
}
     

if(gerarConexao !=null && gerarConexao != undefined){
    gerarConexao.addEventListener("click",()=>{
        gerarPopup.style.display = 'flex'
    
    })

}

if(gerarCancelar != null && gerarCancelar != undefined){
    gerarCancelar.addEventListener("click",()=>{
        gerarPopup.style.display = 'none'
    })
    var botoesDisponiveis = document.querySelector(".botoes-disponiveis-div")


    botaoEscolhido.forEach(element=>{

        element.addEventListener("click",()=>{
            


            if(pinoInput.value){

            if(element.innerHTML.includes("ledComum")){
                var divDisponivel = document.createElement("div");
                if(botoesDisponiveis.childElementCount == 0){
                    botoesDisponiveis.innerHTML = ""
                }
                divDisponivel.innerHTML = pinoInput.value + element.innerHTML;
                divDisponivel.classList.add("div-disponivel");
                divDisponivel.setAttribute("id",pinoInput.value);

            }
            if(element.innerHTML.includes("buzzerAtivo")){
            
                var divDisponivel = document.createElement("div");
                if(botoesDisponiveis.childElementCount == 0){
                    botoesDisponiveis.innerHTML = ""
                }
                divDisponivel.innerHTML = pinoInput.value + element.innerHTML;
                divDisponivel.classList.add("div-disponivel");
                divDisponivel.setAttribute("id",pinoInput.value);
            }
            if(element.innerHTML.includes("ledRGB")){
            
                var divDisponivel = document.createElement("div");
                if(botoesDisponiveis.childElementCount == 0){
                    botoesDisponiveis.innerHTML = ""
                }
                divDisponivel.innerHTML = pinoInput.value + element.innerHTML;
                divDisponivel.classList.add("div-disponivel");
                divDisponivel.setAttribute("id",pinoInput.value);
            }

            if(element.innerHTML.includes("displayLCD")){

                var divDisponivel = document.createElement("input");
                divDisponivel.placeholder = pinoInput.value + element.innerHTML;
                divDisponivel.classList.add("div-disponivel");
                divDisponivel.style.cursor = "text"
                divDisponivel.setAttribute("id","display1");
            }
            if(element.innerHTML.includes("displayOLED")){
                var divDisponivel = document.createElement("input");
                divDisponivel.placeholder = pinoInput.value + element.innerHTML;
                divDisponivel.classList.add("div-disponivel");
                divDisponivel.style.cursor = 'text';
                divDisponivel.setAttribute("id","display2");
            }
            if(element.innerHTML.includes("servoSG90")){
                var divDisponivel = document.createElement("input");
                divDisponivel.placeholder = pinoInput.value + element.innerHTML;
                divDisponivel.classList.add("div-disponivel");
                divDisponivel.style.cursor = 'text';
                divDisponivel.setAttribute("id","display3");
                
            }
            if(element.innerHTML.includes("releSRD")){
                var divDisponivel = document.createElement("div");
                if(botoesDisponiveis.childElementCount == 0){
                    botoesDisponiveis.innerHTML = ""
                }
                divDisponivel.innerHTML = pinoInput.value + element.innerHTML;
                divDisponivel.classList.add("div-disponivel");
                divDisponivel.setAttribute("id",pinoInput.value);
            }
            
            gerarPopup.style.display = 'none'      
            pinoInput.value = ""
            botoesDisponiveis.appendChild(divDisponivel);
            document.dispatchEvent(meuEvento)
            }
        })
   

    })
    

}



if(enviarAjuda != null && localStorage.getItem('manter_conexao')){
    enviarAjuda.setAttribute("value",localStorage.getItem('manter_conexao'))
}


if (pesquisarInput != null){


pesquisarInput.addEventListener("change",()=>{


    if('Dispositivo'.includes(pesquisarInput.value)|| 'uso'.includes(pesquisarInput.value) || 'informaÃ§Ã£o'.includes(pesquisarInput.value)
    || 'botÃµes'.includes(pesquisarInput.value)|| 'botÃ£o'.includes(pesquisarInput.value) || 'conexÃ£o'.includes(pesquisarInput.value) || 'dashboard'.includes(pesquisarInput.value)){
        window.close()
        window.open('dashboard.html')

    }else if('email'.includes(pesquisarInput.value) || 'senha'.includes(pesquisarInput.value)|| 'nova senha'.includes(pesquisarInput.value) || 'SAIR'.includes(pesquisarInput.value) || 'salvar'.includes(pesquisarInput.value) || 'conta'.includes(pesquisarInput.value)){
        window.close()
        window.open('minha-conta.html')
    }else if('mensagem'.includes(pesquisarInput.value) || 'assunto'.includes(pesquisarInput.value) || 'escreva detalhes sobre o problema'.includes(pesquisarInput.value) || 'enviar'.includes(pesquisarInput.value) || 'ajuda'.includes(pesquisarInput.value) || 'problema'.includes(pesquisarInput.value)){
        window.close()
        window.open('ajuda.html')
    }else if('notificaÃ§Ãµes'.includes(pesquisarInput.value)){
        window.close()
        window.open('notificaÃ§Ãµee.html')
    }
})
}




if(sairDaConta != null){

    const minhaContaEmail = localStorage.getItem('manter_conexao')


    var minhaContaNome = localStorage.getItem('nome')

    minhaContaEmailBefore.innerHTML = minhaContaEmail

    minhaContaUsernameBefore.innerHTML = minhaContaNome



    salvarbotao.addEventListener("click",()=>{
        if(novaSenha.value != ""){

            const novaSenhaJ = {
                email: localStorage.getItem('manter_conexao'),
                senha: novaSenha.value,
            }

            fetch("https://vinixwebhook1488.glitch.me/alterarconta",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(novaSenhaJ),
    
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisiÃ§Ã£o: ${response.status}`);
                }
            return response.json(); 
            }).then(data => {
                console.log("Resposta da API (em JSON):", data);
            
                const mensagem = data.mensagem;
                if(mensagem == "senha alterada com sucesso"){
                    alert("senha alterada com sucesso")
                }else {
                    alert("erro na consulta sql")
                }
            }).catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
            
        }

    })
       
    sairDaConta.addEventListener("click",()=>{
        localStorage.removeItem("manter_conexao")
        if(localStorage.getItem("nome")){
        localStorage.removeItem("nome")
        }

        window.close()
        window.open("logar.html")
    })
}

if(logarButton != null){


logarButton.addEventListener("click",()=>{

    texto.textContent= ''

    try{
        logarForm.removeChild(dadosErrados)
    }catch{
        console.log("nenhum elemento pra remover")
    }


    const dados = {
        email: logarEmail.value,
        senha: logarPassword.value
    };

    fetch("https://vinixwebhook1488.glitch.me/logar",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(dados),

}).then(response => {
    if (!response.ok) {
        throw new Error(`Erro na requisiÃ§Ã£o: ${response.status}`);
    }
    return response.json(); 
})
.then(data => {
    console.log("Resposta da API (em JSON):", data);

    const mensagem = data.mensagem;
    if(mensagem == "usuÃ¡rio autenticado"){
        localStorage.setItem("manter_conexao",logarEmail.value)
        location.reload();
        window.close()
        window.open("dashboard.html")


    }else if(mensagem == "Email ou senha incorreto"){
        texto = document.createElement("span")
        texto.textContent = `${mensagem}`
        logarForm.appendChild(texto)
    }
    console.log("Mensagem da resposta:", mensagem);
})
.catch(error => {
    console.error("Erro ao buscar dados:", error);
});
});

}


if (cadastrarBotao != null){


cadastrarBotao.addEventListener("click", () => {

    try{
        cadastrarForm.removeChild(dadosErrados)
    }catch{
        console.log("nenhum elemento pra remover")
    }
    try{
        cadastrarForm.removeChild(texto)
    }catch{
        console.log("nenhum elemento pra remover")
    }


    dadosErrados.textContent= ''
    texto.textContent= ''


    if(!username.value || !password.value || !email.value){
        dadosErrados.textContent = 'Preencha os campos corretamente!'
        cadastrarForm.appendChild(dadosErrados)
        return

    }
    if(password.value !== confirmPassword.value){
        dadosErrados.textContent = 'Senhas nÃ£o coincidem!'
        cadastrarForm.appendChild(dadosErrados)
        return
    }
    if(!termosCheck.checked){
        dadosErrados.textContent = 'Aceite os termos e condiÃ§Ãµes!'
        cadastrarForm.appendChild(dadosErrados)
        return
    }

    if(username.value.length > 30 || username.value.length < 3){
        dadosErrados.textContent = 'usuÃ¡rio deve conter entre 3 e 30 caracteres'
        cadastrarForm.appendChild(dadosErrados)
        return

    }



    const dadosCadastro = {
        email: email.value,
        name: username.value,
        senha: password.value,
    };


    fetch("https://vinixwebhook1488.glitch.me/acesso",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosCadastro),


    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisiÃ§Ã£o: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data => {
            console.log("Resposta da API (em JSON):", data);

            const mensagem = data.mensagem;
            if(mensagem == "Cadastrado com sucesso."){
                localStorage.setItem("manter_conexao",email.value)
                localStorage.setItem("nome",username.value);
                location.reload();
 
                window.close()
                window.open("dashboard.html")


            }else if(mensagem == "Email nÃ£o autorizado na plataforma."){
                texto = document.createElement("span")
                texto.textContent = `${mensagem}`
                cadastrarForm.appendChild(texto)
            }
            else if(mensagem == "Email jÃ¡ cadastrado."){
                texto = document.createElement("span")
                texto.textContent = `${mensagem}`
                cadastrarForm.appendChild(texto)

            }
            console.log("Mensagem da resposta:", mensagem);
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        });
});
}

