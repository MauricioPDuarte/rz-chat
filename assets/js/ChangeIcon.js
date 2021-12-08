
/*
function trocarIconeChaty() {
	console.log("AQUI");
	debugger;

	var elementoDivChaty = document.getElementById('chaty-channel-custom_link');

	if (elementoDivChaty) {
		var elementoA = elementoDivChaty.getElementsByTagName('a')[0];
		var svg = elementoA.getElementsByTagName('svg')[0];

		if (svg) {
			elementoA.removeChild(svg);
		}

		var novoImg = document.createElement("img");
		novoImg.src = "../imgs/email.png";
		novoImg.width = "39px";
		novoImg.height = "39px";


		elementoA.appendChild(novoSvg);

	}
}


window.onload = function () { trocarIconeChaty(); }
*/

<div class="container-btn-contato">
    <div class="conteudo-btn-contato" id="conteudo-btn-contato">
        <div class="cabecalho-btn-contato">
            <button id="close-btn-contato">X</button>
            <img src="http://rzsistemas.com.br/wp-content/uploads/2015/09/logo.svg"/>
            <div class="titulo-cabecalho-btn-contato">
                <h3>Vamos começar o seu atendimento?</h3>
            </div>
        </div>
        <div class="links-btn-contato">
            <strong>Escolha uma das opções abaixo:</strong>
            <a id="contato-telefone-btn-contact">Telefone</a>
            <a id="contato-whatsapp-btn-contact" href="http://api.whatsapp.com/send?1=pt_BR&phone=5547984673253&text=Olá, gostaria de saber mais sobre os produtos da Rz Sistemas.">Whatsapp</a>
            <a href="https://www.rzsistemas.com.br/contato/">Email</a>
        </div>
    </div>
    <button id="btn-contato" class="btn-contato">
        <img src="https://www.rzsistemas.com.br/wp-content/uploads/2021/07/icon-msg.png" />
    </button>
</div>



<style>
	.container-btn-contato {
        position: fixed;
        right: 10px;
        bottom: -5px;

        filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 0px 20px);
        z-index: 999999;
    }

        .container-btn-contato .conteudo-btn-contato {
            display: none;
            flex-direction: column;
            background: #fff;
            border-radius: 10px;
            width: 300px;
  
            overflow: unset;

            position: absolute;
            bottom: 90px;
            right: 12px;
        }



            .conteudo-btn-contato .cabecalho-btn-contato {
                background: #152642;
                width: 100%;
                border-radius: 10px 10px 0 0;

                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                
                
            }

                .conteudo-btn-contato .cabecalho-btn-contato button {
                    position: absolute;
                    top: 0px;
                    right: 0px;

                    width: 40px;
                    height: 40px;
                    max-width: 40px;
                    border-radius: 50%;

                    margin: 4px;
                    cursor: pointer;
                    background-color: rgba(117, 154, 209, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .conteudo-btn-contato .cabecalho-btn-contato img {
                    margin: 15px 0;
                    width: 84px;
                    height: 84px;
                }

                .conteudo-btn-contato .cabecalho-btn-contato .titulo-cabecalho-btn-contato {
                    border-radius: 40px 40px 0px 0px;
                    width: 100%;
                    background: #315A9B;
                    padding: 30px 0;

                    display: flex;
                    justify-content: center;
                }

                .conteudo-btn-contato .cabecalho-btn-contato .titulo-cabecalho-btn-contato h3{
                    margin: 0;
                    text-align: center;
                    color: #fff;
                    font-weight: 600;
                    font-size: 22px;            
                }

        .conteudo-btn-contato .links-btn-contato {
            padding: 10px 30px;

            display: flex;
            flex-direction: column;
            justify-content: center;
        }

            .conteudo-btn-contato .links-btn-contato a {
                padding: 16px 32px;
                border: 1px solid rgb(188, 200, 214);
                background-color: rgb(255, 255, 255);
                border-radius: 32px;
                cursor: pointer;
                width: 100%;
                margin-bottom: 10px;
                color: rgb(32, 37, 42);
            }

            .conteudo-btn-contato .links-btn-contato a:hover {
                border: 1px solid #E0E8F5;
                background-color: #E0E8F5;
                box-shadow: rgb(224 232 245 / 50%) 0px 0px 4px 2px;
            }

            .conteudo-btn-contato .links-btn-contato strong {
                text-align: center;
                font-size: 14px;
                margin: 25px 0;
            }


    .container-btn-contato .btn-contato {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #152642;

        display: flex;
        justify-content: center;
        align-items: center;

        box-shadow: rgb(0 0 0 / 15%) 0px 0px 20px;
        filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 0px 20px);
    }

    .container-btn-contato .btn-contato:hover {
        background: #1D365D;
    }
	
	.grecaptcha-badge {
	  display: none;
	}
</style>

<script>
    $(document).ready(function() {
        $('#btn-contato').click(lidarComCliqueBtnContato);
        $('#close-btn-contato').click(lidarComCliqueBtnContato);

        esconderBtnWhatsApp();
		trocarLinkBtnTelefone();
    });

    /** Responsável por lidar com o clique no 'btn-contact', deve abrir o conteúdo com os contatos. */
    function lidarComCliqueBtnContato() {
        var display = $('#conteudo-btn-contato').css('display');

        if(display == 'flex') {
            $('#conteudo-btn-contato').css('display', 'none');
        } else {
            $('#conteudo-btn-contato').css('display', 'flex');
        }
    }

    /** Responsável por esconder o botão do whatsapp no desktop, deve aparecer apenas no celular. */
    function esconderBtnWhatsApp() {
        if (screen.width < 1024) {
            $('#contato-whatsapp-btn-contact').css('display', 'flex');
        } else {
            $('#contato-whatsapp-btn-contact').css('display', 'none');
        }
    }
	
	/* Responsável por trocar o link do botão do telefone. Quando no computador, deve abrir a página contato. Quando no mobile, deve ligar para o número. */
	function trocarLinkBtnTelefone() {
		if (screen.width < 1024) {
            $('#contato-telefone-btn-contact').attr('href', 'tel:4733329066');
        } else {
            $('#contato-telefone-btn-contact').attr('href', 'https://www.rzsistemas.com.br/contato/');
        }
	}
</script>