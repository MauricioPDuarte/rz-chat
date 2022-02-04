var g_jaExibiuNotificacao = false;
var g_jaTocouSomNotificacao = false;

document.addEventListener('DOMContentLoaded', carregouPagina, false);

function carregouPagina() {
	addBtnRzChatNaPagina()
	atribuirLinksDeConversaoGteg();
}

function atribuirLinksDeConversaoGteg() {
	var gtegWhatsappMovel = document.getElementById('rzchat-gteg-whatsapp-movel').value;
	var gtegWhatsappWeb = document.getElementById('rzchat-gteg-whatsapp-web').value;
	var gtegPhone = document.getElementById('rzchat-gteg-phone').value;
	var gtegEmail = document.getElementById('rzchat-gteg-email').value;
	
	if (gtegWhatsappMovel !== '') {
		atribuirLinkConversaoGtegWhatsappMovel(gtegWhatsappMovel);
	}
	
	if (gtegWhatsappWeb !== '') {
		atribuirLinkConversaoGtegWhatsappWeb(gtegWhatsappWeb);
	}
	
	if (gtegPhone !== '') {
		atribuirLinkConversaoGtegPhone(gtegPhone);
	}
	
	if (gtegEmail !== '') {
		atribuirLinkConversaoGtegEmail(gtegEmail);
	}
	
}

function atribuirLinkConversaoGtegWhatsappMovel(linkGteg) {
	window.addEventListener('DOMContentLoaded', function(){
		document.querySelector('#rzChatBtnEnviarMsgWppMovel').addEventListener('click', function(){
		console.log('Whats movel')
		gtag('event', 'conversion', {'send_to': linkGteg});
		})
	});
}

function atribuirLinkConversaoGtegWhatsappWeb(linkGteg) {
	window.addEventListener('DOMContentLoaded', function(){
		document.querySelector('#rzChatBtnEnviarMsgWppWeb').addEventListener('click', function(){
		console.log('Whats web')
		gtag('event', 'conversion', {'send_to': linkGteg});
		})
	});
}
	
	
function atribuirLinkConversaoGtegPhone(linkGteg) {
	window.addEventListener('DOMContentLoaded', function(){
		document.querySelector('#rzChatBtnPhone').addEventListener('click', function(){
		console.log('phone')
		gtag('event', 'conversion', {'send_to': linkGteg});
		})
	});
	
}
	
	
function atribuirLinkConversaoGtegEmail(linkGteg) {
	window.addEventListener('DOMContentLoaded', function(){
		document.querySelector('#rzChatBtnEmail').addEventListener('click', function(){
		console.log('email')
		gtag('event', 'conversion', {'send_to': linkGteg});
		})
	});
	
}
	
	
	
	


function addBtnRzChatNaPagina() {
	   var btnChatWpp = document.getElementById('btn-rz-chat-wpp');

    // Se não encontrar, deve sair da função...
    if (!btnChatWpp) {
        return;
    }

    btnChatWpp.style.display = 'flex';

    if (screen.width < 1024) {
        btnChatWpp.addEventListener('click', lidarComCliqueBtnWpp, false);

    } else {
        btnChatWpp.addEventListener('click', lidarComCliqueBtnContato, false);

        var closeBtnContato = document.getElementById('close-btn-rz-chat');
        closeBtnContato.addEventListener('click', lidarComCliqueBtnContato, false);
    }

	setTimeout(function () { mostrarNotificacao(); }, 8000);

    document.addEventListener('click', function (event) {
        if (!g_jaTocouSomNotificacao /* && !event.target.classList.contains('menu-link')*/) {
		g_jaTocouSomNotificacao = true;
        	setTimeout(function () { tocarSomNotificacao(); /*mostrarNotificacao();*/ }, 20000);
        }
    });
}


function mostrarNotificacao() {
    var notification = document.getElementById('rz-chat-notification');

    if (!notification) {
        return;
    }

    notification.style.display = 'flex';


    g_jaExibiuNotificacao = true;
}

function tocarSomNotificacao() {
	document.getElementById('MyAudioElement').muted = false;
    	document.getElementById('MyAudioElement').play();
	
	//g_jaTocouSomNotificacao = true;
};

function enviarMsgWhatsapp() {
    var msgDigitada = document.getElementById('msg-input-whatsapp').value;

    var linkWpp = 'http://api.whatsapp.com/send?1=pt_BR&phone=5547984673253&text=' + msgDigitada;

    var a = document.createElement('a');
    a.target = '_blank';
    a.href = linkWpp;
    a.click();

}

function lidarComCliqueBtnWpp() {
    var blocoChatWhatsapp = document.getElementById('block-chat-whatsapp');
    var display = blocoChatWhatsapp.style.display;

    if (display == 'block') {
        blocoChatWhatsapp.style.display = 'none';
    } else {
        blocoChatWhatsapp.style.display = 'block';
    }
}


/** Responsável por lidar com o clique no 'btn-contact', deve abrir o conteúdo com os contatos. */
function lidarComCliqueBtnContato() {
    var btnContato = document.getElementById('body-rz-chat');
    var display = btnContato.style.display;

    if (display == 'flex') {
        btnContato.style.display = 'none';
    } else {
        btnContato.style.display = 'flex';
    }
}
