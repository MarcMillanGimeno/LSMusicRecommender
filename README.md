# LSMusicRecommender

**Author**: Marc Millán Gimeno - ls29307 

## Description
This project tries to create an application that can recommend music to the users since the music that customers have heard or that the themes liked

## Some files
In the project folder we can find the 3 files that contain the **HTML (Practica_html)**, the **CSS (css)** and the **JavaScript code (practica_javaScript)**. Apart from these three files we also have 3 .png files in which we can find the image of our **Logo** and the icons for the **add button** (a + symbol) and the **delete buttons** of the songs (a trash can).
The folder called mdl is a folder downloaded from the web **"Matrial design"** and contains the css to use the htmls provided.
Finally, the file **"song1"** and the file **"Java pattern"** are files that we have used to make tests but that we no longer use.

## Structure
In relation to the **structure** of the application we have followed by objects with a specific task for each one, in this way we get a modulated and well structured code that allows us to make it also easier to understand.
To begin with we have the Playlist object that is responsible for filling in the "ul" to be able to display the song lists on the screen.
The next object we find is called Spotify and it allows us to extract the data that interests us from the different **JSONs** that we use throughout the application.
Next we find the Search, **AddButton** and **Tab** objects that are responsible for associating the click action to the different HTML objects to a particular event depending on whether the user has clicked.
The **AJAX object** is responsible for downloading the files that we need to obtain the playlists or the songs to be played and it returns us different JSONs with the information we are looking for.
After AJAX we find one of the most important objects of the application. Listener has the functions of all the events that happen in the application, from the play of the songs to the search or the change of "ul" when we click on a different tab than the one we have selected.
Finally we have the Application object that contains all the main AddListeners and we start the application by filling and showing the first "ul" of the application.
