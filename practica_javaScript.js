/**
 * La Salle Music Recomender.
 *
 */
(function(){

var Playlist = {

	/*
	*Hago una petición de información mediante la api
	*Recivo toda la info mediante el jason de retorno
	*/
	api: {},
	container_id: "videos",
	autoplay: true,

	getPlaylist: function getVideos(){
    	var json_response = JSON.parse(this.api.request());

    	return this.api.getTracks(json_response);
    },

    //Creación de la imagen peeliminar de cada video
    createTrackImage: function createTrackImage(src, title, id, artist){
	    //Creamos figure para crear la imagen

	    ///////////////////////////////
		// Aquí tu código para crear los nodos del DOM para mostrar las imagenes de los videos.
		// Puedes utilizar el objeto Layout para ayudarte.
		// Crea un nodo "figure" y añade la imagen como "Child"

	    var figure = document.createElement("figure");
		//Necesitamos crear <figcaption> ya que crea subtítulo asociado con una imagen
		var figcap = document.createElement("figcaption");

		//Añado el titulo que me llega de la función y lo incluyo dentro del fig_capture
	    figcap.appendChild(this.createTitle(title));
	    //Mediante el Layout creo la imagen con la info. de "src", imagen del video.
	    figure.appendChild(Layout.createImage(src,"Imatge"));
	    //Añado el titulo a la figure
	    figure.appendChild(figcap);


	    //Creo un elemento image
	    var image = document.createElement("image");
		//pertenecerá a la playe "play brand-backgroud"
	    image.className = "play";
		//Incluimos en el elemento link el icono del play
	    figure.appendChild(image);


    	//Creo el link para reproducir el video
	    //figure.appendChild(this.createPlayLink(id));
		//figure.firstChild.addEventListener("click",function(){Listener.eventPlay(title, artist)},false);

		figure.addEventListener("click",function(){Listener.eventPlay(title, artist)},false);
		///////////////////////////////

	    return figure;
    },

    createTitle: function createTitle(title){
    	//Modificamos el h2 a h3 ya que es más adecuado
    	var title_tag = document.createElement("h3");
    	var title_text = document.createTextNode(title);

    	///////////////////////////////
		// Devuelve el objeto title_tag con el title.
    	title_tag.appendChild(title_text);
    	
		///////////////////////////////

	    return title_tag;
    },

    createPlayLink: function createPlayLink(track_id){

    	var link = document.createElement("a");
	    link.className = "play-video";
	    link.href = "#";
	    link.setAttribute("data-video-id", track_id);

		///////////////////////////////
		// Aquí tu código
		// Puedes utilizar el objeto Layout para ayudarte.
		// Crea un nodo "image" con la ruta del icono y añadelo como "Child" al link

		//Creo un elemento image
	    var image = document.createElement("image");
		
		//pertenecerá a la playe "play brand-backgroud"
	    image.className = "play brand-background";
		//Incluimos en el elemento link el icono del play
	    link.appendChild(image);

		// Apply listener to event click.
		Listener.add(
			link,
			"click",
	    	Listener.eventPlay,
		    false
		);


		//Listener.add(link,"click",Listener.eventPlay,false);

		return link;
    },

    renderList: function renderList(tracks,container,search){
		
		///////////////////////////////
		// Aquí tu código para mostrar el listado de videos.
		
		var figure;
		var Ilista;

		//Necesitamos un for de 15 iteraciones para incluir la cantidad de videos requeridos	
		for(var j = 0; j < tracks.length; j++){
			/*
			* Creo la la imagen, el titulo y el play con la funcion implementada createVideoImage
			* Le envio a esta el link del la imagen de la api, el titulo, y el link del propio video
			*/
			if(search == 1){
				figure = this.createTrackImage(this.api.getImagePath(tracks[j], 1),this.api.getTrackTitle(tracks[j]),tracks[j].artists[0].id, tracks[j].artists[0].name);
			}else{
				figure = this.createTrackImage(this.api.getImagePath(tracks[j], 0),this.api.getTrackTitle(tracks[j]),tracks[j].artist.mbid, tracks[j].artist.name);
			}
			
			//Creo un elemento li para meterlos en una lista
			Ilista = document.createElement("li");
			Ilista.className = "track";
			//Añadimos la figura con el video completo a la linea pertinente
			Ilista.appendChild(figure);
			//Se añade el li dento del ul que engloba todos (15) videos
			document.getElementsByTagName('ul')[0].appendChild(Ilista);
		}
	},

	start: function start(api){

    	//Comentamos el reset
    	//this.resetApplication()
    	this.api = api;

    	var container = Layout.createContainer(this.container_id, "ul");
		this.renderList( this.getPlaylist(), container,0);
    },

    createPlaylistli: function createPlaylistli(title, artist){






    }

}


function Spotify(api_url){
	// Private variable. 
	var api_url = api_url;

	// Named function - private.
	this.request = function request(){

		///////////////////////////////
		// Aquí tu código para llamar a la API de Yotube y obtener el JSON.
		// Puedes hacer uso del objeto AJAX ofrecido aquí.
		return AJAX.request(api_url);
		///////////////////////////////
    }

    // Anonymous function - private.
	this.getTracks = function getTracks(tracks_object){
		///////////////////////////////
		// Aquí tu código para obtener los items de los videos.

		return tracks_object.tracks.track;

		///////////////////////////////
	}

	// Anonymous function - private.
	this.getTracksSearch = function getTracksSearch(tracks_object){
		///////////////////////////////
		// Aquí tu código para obtener los items de los videos.

		return tracks_object.results.trackmatches.track;

		///////////////////////////////
	}

	// Anonymous function assigned to a var - private.
	this.getImagePath = function getImagePath(track, search){
		///////////////////////////////
		// Aquí tu código para obtener las urls de las imágenes de los videos.

		if(search == 1){

			return track.album.images[0].url;
		}else{

			return track.image[3]["#text"];
		}

		///////////////////////////////
	}

	this.getTrackTitle = function getTrackTitle(track){

		///////////////////////////////
		// Aquí tu código para obtener el título de los videos.

		return track.name;

		///////////////////////////////
	}

}

/**
 * Search form.
 */
var Search = {
	addListener: function addListener(){
		
		///////////////////////////////
		// Aquí tu código para realizar capturar
		// el submit de la busqueda.
		var button = document.getElementById("search_button");	

		///////////////////////////////	

		// Apply listener to the search button.
		Listener.add(
			button,
			"click",
			Listener.eventSearch,
			false
		);
	}
}

/*
	
*/
var AddButton = {
	addListenerTrack: function addListenerTrack(){
		
		///////////////////////////////
		// Aquí tu código para realizar capturar
		// el submit de la busqueda.
		var button = document.getElementById("buttonAdd");	

		///////////////////////////////	

		// Apply listener to the search button.
		Listener.add(
			button,
			"click",
			Listener.eventAddTrack,
			false
		);
	}
}

/**
 * Search form.
 */
var Tab = {

	addListenerHome: function addListenerHome(){
		
		///////////////////////////////
		// Aquí tu código para realizar capturar
		// el submit de la busqueda.
		var tab = document.getElementById("tab_home");

		///////////////////////////////	

		// Apply listener to the search button.
		Listener.add(
			tab,
			"click",
			Listener.eventHome,
			false
		);
	},

	addListenerPlaylists: function addListenerPlaylists(){
		
		///////////////////////////////
		// Aquí tu código para realizar capturar
		// el submit de la busqueda.
		var tab = document.getElementById("tab_playlist");	

		///////////////////////////////	

		// Apply listener to the search button.
		Listener.add(
			tab,
			"click",
			Listener.eventPlaylist,
			false
		);
	},

	addListenerRecomended: function addListenerRecomended(){
		
		///////////////////////////////
		// Aquí tu código para realizar capturar
		// el submit de la busqueda.
		var tab = document.getElementById("tab_recomender");	

		///////////////////////////////	

		// Apply listener to the search button.
		Listener.add(
			tab,
			"click",
			Listener.eventRecomend,
			false
		);
	}


}


/**
 * Objeto simple para realizar llamadas AJAX.
 */
var AJAX = {
	request: function request(url){
		///////////////////////////////
		// Aquí tu código para realizar peticiones AJAX con XMLHttpRequest
		// y devolver los datos.

		var xhr = new XMLHttpRequest();


		//Abrir peticion
		xhr.open("GET", url, false);
		
		//Enviar petición
		xhr.send();
		
		return xhr.responseText;
		///////////////////////////////
	},
	request2: function request2(url){
		///////////////////////////////
		// Aquí tu código para realizar peticiones AJAX con XMLHttpRequest
		// y devolver los datos.

		var xhr = new XMLHttpRequest();


		//Abrir peticion
		xhr.open("GET", url, false);
		xhr.setRequestHeader("Accept", "application/json");
		//xhr.setRequestHeader("Authorization","Bearer BQDBQeAIoZpG_LcU50uD2tw_17te4CMANXl4Ga8YbkTJFXBv5k6ZkC_bB0HDl9E40LgKWq7EARguJkQ0hw7XV4y8a37azUGuh2O8ZKysUtbY1OnblhkthK7Vyhyfq1Jw_QijPSZo-DdAWiZ0WU3ujOvWQ8BoYvrP");

		//Enviar petición
		xhr.send();
		
		return xhr.responseText;
		///////////////////////////////
	}
}


/*
 * Objeto Layout para crear los nodos del DOM necesarios para visualizar los videos.
 */
var Layout = {
	createContainer: function createContainer(id, element){
    	var container = document.createElement(element);
		container.id = id;

		return container;
    },
    createImage: function createImage(src, alt){
    	var img = document.createElement("img");
	    img.src = src;
	    img.alt = alt;
	    return img;
    }
}

/**
 * Object Listener to add and manage events.
 */
var Listener = {

	add: function add(object, event, callback, capture){

		object.addEventListener(event,callback,capture);

	},
	eventPlay: function eventPlay(title, artist){
		
		///////////////////////////////
		// Recuerda siempre anular el evento por defecto con esta sentencia.

		console.log("PLAY: "+title);

		var api_url = "https://api.spotify.com/v1/search?q=artist:"+artist+"%20track:"+title+"&type=track&limit=1";

		var json_track = JSON.parse(AJAX.request(api_url));
		console.log(json_track);



		document.getElementsByTagName('audio')[0].src = json_track.tracks.items[0].preview_url;

		var text = document.createElement("h3");
    	var title_text = document.createTextNode(artist+" - "+title);

    	localStorage.setItem('title', json_track.tracks.items[0].name);
    	localStorage.setItem('artist', json_track.tracks.items[0].artists[0].name);


    	///////////////////////////////
		// Devuelve el objeto title_tag con el title.
    	text.appendChild(title_text);
    	document.getElementsByTagName('footer')[0].removeChild(document.getElementsByTagName('footer')[0].firstChild);
		document.getElementsByTagName('footer')[0].insertBefore(text, document.getElementsByTagName('footer')[0].firstChild);

		///////////////////////////////
	},
	// Busqueda opcional
	eventSearch: function eventSearch(){

		var input = document.getElementById("search");
		var section = document.getElementById("Home");
		var text = document.createElement("h2");
		var ul = document.createElement("ul");

		ul.className = "video-list clearfix";

		if(input.value == ""){
	    	alert("-- Campo vacio --");
	    }else{

	    	section.innerHTML = '';
	    	var title_text = document.createTextNode("Songs");
			text.appendChild(title_text);
			section.appendChild(text);
			section.appendChild(ul);
			ul.className = "video-list clearfix";


	    	var api_url = "https://api.spotify.com/v1/search?q="+input.value+"&type=track,artist,album&market=US";
			var json_response = JSON.parse(AJAX.request2(api_url));

			var container = Layout.createContainer(this.container_id, "ul");
			Playlist.renderList(json_response.tracks.items,container,1);
			input.value = "";
			
	    }

	},

	eventHome: function eventHome(){

		
		var section = document.getElementById("Home");
    	var title_text = document.createTextNode("Home - Songs for you");
    	var text = document.createElement("h2");
		var ul = document.createElement("ul");
		ul.className = "video-list clearfix";


		section.innerHTML = '';
		text.appendChild(title_text);
		section.appendChild(text);
		section.appendChild(ul);

		var api_url = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=dance&limit=15&api_key=9c97a4681d0c1fd60d389f5e95e92630&format=json";

		var json_response = JSON.parse(AJAX.request2(api_url));

		var container = Layout.createContainer(this.container_id, "ul");
		Playlist.renderList(json_response.tracks.track,container,0);
	},

	eventRecomend: function eventRecomend(){

		var section = document.getElementById("Home");
    	var title_text = document.createTextNode("Recomender - Song you'd like");
    	var text = document.createElement("h2");
		var ul = document.createElement("ul");
		ul.className = "video-list clearfix";


		section.innerHTML = '';
		text.appendChild(title_text);
		section.appendChild(text);
		section.appendChild(ul);

		var title = localStorage.getItem('title');
		var artist = localStorage.getItem('artist');

		var api_url = "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist="+artist+"&track="+title+"&limit=15&api_key=9c97a4681d0c1fd60d389f5e95e92630&format=json";

		var json_response = JSON.parse(AJAX.request2(api_url));

		console.log(json_response);

		var container = Layout.createContainer(this.container_id, "ul");
		Playlist.renderList(json_response.similartracks.track,container,0);
	},

	eventPlaylist: function eventPlaylist(){

		
		var section = document.getElementById("Home");
    	var title_text = document.createTextNode("Your Playlist");
    	var text = document.createElement("h2");

		var ul = document.createElement("ul");
		ul.className = "video-list clearfix";

		section.innerHTML = '';
		text.appendChild(title_text);
		section.appendChild(text);
		section.appendChild(ul);
		
		for (var f = 0; f < localStorage.length; f++){
			
			(function(f){

				var clave = localStorage.key(f);

				if(clave.startsWith('lista')){

					
				   	var figure = document.createElement("figure");
				   	var button_delete = document.createElement("button");

				   	figure.className = "figure_playlist";
				   	button_delete.className = "delete_button_playlist";
					
					var ArtistSong = localStorage.getItem(clave);
					var value = ArtistSong.split(' - ');
					var li = document.createElement("li");
					li.className = "li_playlist";

					var title = document.createElement("h2");
					var artist = document.createElement("h3");
					var album = document.createElement("h3");

					var api_url = "https://api.spotify.com/v1/search?q=artist:"+value[0]+"%20track:"+value[1]+"&type=track&limit=1";

					var json_response = JSON.parse(AJAX.request2(api_url));

					var image = document.createElement("img");
					image.className = "imagen_album";
					
					image.src = json_response.tracks.items[0].album.images[0].url;
					
					figure.appendChild(image);
					
					var play_text = document.createTextNode(value[1]);
					title.appendChild(play_text);
					figure.appendChild(title);

					play_text = document.createTextNode("Artista: " + value[0]);
					artist.appendChild(play_text);
					figure.appendChild(artist);

					play_text = document.createTextNode("Album: " + json_response.tracks.items[0].album.name);
					album.appendChild(play_text);
					figure.appendChild(album);

					console.log("TITULO: " + value[1]);

					figure.addEventListener("click",function(){Listener.eventPlay(value[1], value[0])},false);
					button_delete.addEventListener("click",function(){Listener.eventDeleteTrack(value[1], value[0])},false);

					li.appendChild(figure);
					li.appendChild(button_delete);

					document.getElementsByTagName('ul')[0].appendChild(li);

				}

			})(f);

		}
		
	},

	eventDeleteTrack: function eventDeleteTrack(title, artist){

		var seleccio = artist + " - "+ title;
		var trobat = 0;
		console.log(seleccio);

		for (var f = 0; f < localStorage.length && trobat == 0; f++){

			var clave = localStorage.key(f);
			console.log(localStorage.getItem(clave));
			if(localStorage.getItem(clave).localeCompare(seleccio) == 0){
				console.log("AHA! " + localStorage.getItem(clave) + " --- " + seleccio);

				trobat = 1;
				localStorage.removeItem(clave);
			}
		}
		console.log("E3");
		this.eventPlaylist();
	},

	eventAddTrack: function eventAddTrack(){
		
		var audio = '';
		audio = document.getElementsByTagName('footer')[0].firstChild.textContent;

		var ArtistSong = audio.split(" - ");

		var api_url = "https://api.spotify.com/v1/search?q=artist:"+ArtistSong[0]+"%20track:"+ArtistSong[1]+"&type=track&limit=1";

		var json_response = JSON.parse(AJAX.request2(api_url));
		console.log(json_response);
		localStorage.setItem("lista " + json_response.tracks.items[0].id, audio);

	}
}




var Application = {
	start: function start(){
		
		Search.addListener();
		Tab.addListenerHome();
		Tab.addListenerRecomended();
		Tab.addListenerPlaylists();
		AddButton.addListenerTrack();

		/*var track= new Object();
		track.id_track =...;
		var arr= new Array(); */

		var api_url = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=rock&limit=15&api_key=9c97a4681d0c1fd60d389f5e95e92630&format=json";
		Playlist.start(new Spotify(api_url));
		

	}
}


// Inicia la aplicación cuando el DOM se ha cargado.

Listener.add(
	document,
	"DOMContentLoaded",
	Application.start(),
	false
);


}());