<?php
/**
* Plugin Name: Rz Chat - Exclusivo para uso na RzSistemas... 
* Plugin URI: https://www.virtualmarket.com.br/
* Description: Este plugin adiciona um botão de chat no site.
* Version: 1.0
* Author: RzSistemas
* Author URI: https://github.com/MauricioPDuarte
**/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}


/**
 * Register the stylesheets for the public-facing side of the site.
 *
 * @since    1.0.0
 */
function enqueue_styles() {
	wp_enqueue_style('rzchat', plugin_dir_url( __FILE__ ).'css/rzchat.css');
}

enqueue_styles();

/**
 * Register the JavaScript for the public-facing side of the site.
 *
 * @since    1.0.0
 */
function enqueue_scripts() {
	wp_enqueue_script('rzchat', plugin_dir_url( __FILE__ ).'js/rzchat.js', array( 'jquery' ));
}

enqueue_scripts();



add_action('wp_footer', 'add_rz_chat');

/**
* Configurações do PLUGIN no Wordpress...
*
**/


add_action( 'admin_menu', 'rz_add_admin_menu' );
add_action( 'admin_init', 'rz_settings_init' );


function rz_add_admin_menu() { 
	add_menu_page( 'RzChat', 'RzChat', 'manage_options', 'rzchat', 'rz_options_page' );
}


function rz_settings_init() { 
	register_setting( 'pluginPage', 'rz_settings' );

	add_settings_section(
		'rz_pluginPage_section', 
		__( 'Configurações do RzChat', 'rzchat' ), 
		'rz_settings_section_callback', 
		'pluginPage'
	);

	add_settings_field( 
		'rz_radio_field_0', 
		__( 'Selecione um site', 'rzchat' ), 
		'rz_radio_field_0_render', 
		'pluginPage', 
		'rz_pluginPage_section' 
	);
}

function rz_radio_field_0_render() { 

	$options = get_option( 'rz_settings' );
	?>
	<input type='radio' name='rz_settings[rz_radio_field_0]' <?php checked( $options['rz_radio_field_0'], 1 ); ?> value='1'>Virtual Market
	<br />
	<br />
	<input type='radio' name='rz_settings[rz_radio_field_0]' <?php checked( $options['rz_radio_field_0'], 2 ); ?> value='2'>Rz Sistemas
	<?php
}

function rz_settings_section_callback(  ) { 

	echo __( 'Realize os ajustes do plugin de acordo com o site onde o mesmo será utilizado. Exemplo: Se você está configurando o site do VirtualMarket, selecione o site "VirtualMarket".', 'rzchat' );
}


function rz_options_page(  ) { 
		?>
		<form action='options.php' method='post'>
			<h2>RzChat</h2>
			<?php
			settings_fields( 'pluginPage' );
			do_settings_sections( 'pluginPage' );
			submit_button();
			?>
		</form>
		<?php
}


/**
* HMTL/CSS/JS do plugin RzChat...
*
**/

function add_rz_chat()
{
	$opcoesDoRzChat = get_option('rz_settings');
	$classColorHeader = "rzchat-header-color-vm";
	$classColorBody = "rzchat-body-color-vm";
	
	switch($opcoesDoRzChat['rz_radio_field_0']) {
		case '1':
			$logo =  plugins_url('assets/imgs/vm-logo.svg', __FILE__ );
			$classColorHeader = "rzchat-header-color-vm";
			$classColorBody = "rzchat-body-color-vm";
			
			break;
		case '2':
			$logo =  plugins_url('assets/imgs/rz-logo.svg', __FILE__ );
			$classColorHeader = "rzchat-header-color-rz";
			$classColorBody = "rzchat-body-color-rz";
			break;
	}
	
	$audio = plugins_url('assets/sounds/ntt.wav', __FILE__ );
	$baseUrl = get_bloginfo('url');
	
  echo "
  
	<div class='rz-chat'>
    <div class='body-rz-chat' id='body-rz-chat'>
        <div class='body-header-rz-chat {$classColorBody}'>
            <button id='close-btn-rz-chat'>X</button>
            <img src='{$logo}'/>
            <div class='title-body-header-rz-chat {$classColorHeader}'>
                <h3>Vamos começar o seu atendimento?</h3>
            </div>
        </div>
        <div class='links-rz-chat'>
            <strong>Escolha uma das opções abaixo:</strong>
            <a id='contato-telefone-btn-contact' href='${baseUrl}/contato/'>Telefone</a>
            <a id='contato-whatsapp-btn-contact' target='_blank' href='http://api.whatsapp.com/send?1=pt_BR&phone=5547984673253&text=Olá, gostaria de saber mais sobre os produtos da Rz Sistemas.'>Whatsapp</a>
            <a href='${baseUrl}/contato/'>Email</a>
        </div>
    </div>
	<div class='block-chat-whatsapp' style='display: none;' id='block-chat-whatsapp'>
	
		<div class='body-chat-whatsapp'>
			<button onclick='lidarComCliqueBtnWpp()'>X</button>
			<div class='chat-whatsapp'>
				<p>Olá, vamos agendar uma demonstração?</p>
			</div>
		</div>

		<div class='block-chat-whatsapp-footer'>
			<form>
				<div class='campo-whatsapp'>
					<input class='input-texto-whatsapp' id='msg-input-whatsapp' />
				</div>
				
				<button onclick='enviarMsgWhatsapp(); return false'>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path fill='#ffffff' d='M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z'></path></svg>
				</button>
			</form>
		</div>
	</div>
	<div id='btn-rz-chat-wpp' class='btn-rz-chat-wpp rz-chat-animacao-pulse-icon' style='display: none;'>
		<div id='rz-chat-notification' class='notification' style='display: none;'>1</div>
        <svg class='ico_d ' width='39' height='39' viewBox='0 0 39 39' fill='none' xmlns='http://www.w3.org/2000/svg' style='transform: rotate(0deg);'><circle class='color-element' cx='19.4395' cy='19.4395' r='19.4395' fill='#49E670'></circle><path d='M12.9821 10.1115C12.7029 10.7767 11.5862 11.442 10.7486 11.575C10.1902 11.7081 9.35269 11.8411 6.84003 10.7767C3.48981 9.44628 1.39593 6.25317 1.25634 6.12012C1.11674 5.85403 2.13001e-06 4.39053 2.13001e-06 2.92702C2.13001e-06 1.46351 0.83755 0.665231 1.11673 0.399139C1.39592 0.133046 1.8147 1.01506e-06 2.23348 1.01506e-06C2.37307 1.01506e-06 2.51267 1.01506e-06 2.65226 1.01506e-06C2.93144 1.01506e-06 3.21063 -2.02219e-06 3.35022 0.532183C3.62941 1.19741 4.32736 2.66092 4.32736 2.79397C4.46696 2.92702 4.46696 3.19311 4.32736 3.32616C4.18777 3.59225 4.18777 3.59224 3.90858 3.85834C3.76899 3.99138 3.6294 4.12443 3.48981 4.39052C3.35022 4.52357 3.21063 4.78966 3.35022 5.05576C3.48981 5.32185 4.18777 6.38622 5.16491 7.18449C6.42125 8.24886 7.39839 8.51496 7.81717 8.78105C8.09636 8.91409 8.37554 8.9141 8.65472 8.648C8.93391 8.38191 9.21309 7.98277 9.49228 7.58363C9.77146 7.31754 10.0507 7.1845 10.3298 7.31754C10.609 7.45059 12.2841 8.11582 12.5633 8.38191C12.8425 8.51496 13.1217 8.648 13.1217 8.78105C13.1217 8.78105 13.1217 9.44628 12.9821 10.1115Z' transform='translate(12.9597 12.9597)' fill='#FAFAFA'></path><path d='M0.196998 23.295L0.131434 23.4862L0.323216 23.4223L5.52771 21.6875C7.4273 22.8471 9.47325 23.4274 11.6637 23.4274C18.134 23.4274 23.4274 18.134 23.4274 11.6637C23.4274 5.19344 18.134 -0.1 11.6637 -0.1C5.19344 -0.1 -0.1 5.19344 -0.1 11.6637C-0.1 13.9996 0.624492 16.3352 1.93021 18.2398L0.196998 23.295ZM5.87658 19.8847L5.84025 19.8665L5.80154 19.8788L2.78138 20.8398L3.73978 17.9646L3.75932 17.906L3.71562 17.8623L3.43104 17.5777C2.27704 15.8437 1.55796 13.8245 1.55796 11.6637C1.55796 6.03288 6.03288 1.55796 11.6637 1.55796C17.2945 1.55796 21.7695 6.03288 21.7695 11.6637C21.7695 17.2945 17.2945 21.7695 11.6637 21.7695C9.64222 21.7695 7.76778 21.1921 6.18227 20.039L6.17557 20.0342L6.16817 20.0305L5.87658 19.8847Z' transform='translate(7.7758 7.77582)' fill='white' stroke='white' stroke-width='0.2'></path></svg>
    </div>
	
	<!-- HTML -->
	<audio id='MyAudioElement' autoplay muted>
	  <source src='${audio}' type='audio/wav'>
	</audio>
</div>
  ";
}
?>






