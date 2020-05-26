var app = {
	inicio: function () {
		this.iniciaBotones();
		this.iniciaFastClick();
		this.iniciaHammer();
	},




	iniciaBotones: function () {
		console.log("IniciaBotone");
		var botonClaro = document.querySelector('#claro');
		var botonOscuro = document.querySelector('#oscuro');

		botonClaro.addEventListener('click', this.ponloClaro, false);
		botonOscuro.addEventListener('click', this.ponloOscuro, false);

	},

    
	iniciaFastClick: function () {
		console.log("FuncionFastClick");
		FastClick.attach(document.body);
	},

	iniciaHammer: function () {
        
		var zona = document.getElementById('zona-gestos');
		var hammertime = new Hammer(zona);
		
		//antes de iniciar las animaciones le pasamos el valor de clase a la zona seria como reiniciar la zona usamos el webkitAnimationEnd para confirmar que la animacion ya ha finalizado
		zona.addEventListener('webkitAnimationEnd', function (e) {
								
            zona.className = ' ';
		});
							   
		hammertime.get('pinch').set({enable: true});
		hammertime.get('rotate').set({enable: true});
        
		//Camputarmos el evento doubletipe y le cambiamos la classe a dobubletap definida en el archivo css
		hammertime.on('doubletap', function (ev) {
			zona.className = 'doubletap';
		});
		
		//Capturamos el evento press y le cambiamos la classe a press definida en el archivo css
		hammertime.on('press', function (ev) {
			zona.className = 'press';
		});
		
		hammertime.on('swipe', function (ev) {
			console.log("estamos en swipe");
			var clase = undefined;
			direccion = ev.direction;
			
			console.log(direccion);
			if (direccion == 2) { clase = 'swipe-izquierda'; }
			if (direccion == 4) { clase = 'swipe-derecha'; }
			
			zona.className = clase;
			
			//zona.className = 'swipe-derecha';
		});
		
		hammertime.on('rotate', function (ev) {
			console.log("estamos en rotate");
			var umbral = 25;
			console.log(umbral);
			if (ev.distance > umbral) {
				zona.className = 'rotate';
				
			}
		});
	},

	ponloClaro: function () {
		document.body.className = 'claro';
	},

	ponloOscuro: function () {
		document.body.className = 'oscuro';
	}
};

if ('addEventListener' in document) {
	console.log("estamos en el if");
	document.addEventListener('DOMContentLoaded', function () {
		app.inicio();
		// body...
	}, false);
}
