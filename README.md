### Reminder App - Front End

#### For the frontend part :-
1. The frontend of the app is made with the help of REACT JS (Here, I have used functional components).

2. All the cards and buttons are made with the help of MUI (Material UI).

3. There is a card for adding the task and its time and date for which you want to set the reminder for. To add the reminder there is an add reminder button provided.

4. After you click the the add reminder button a new reminder card with reminder details will be rendered on the page. This card also contains the delete button if you want to delete the given reminder.

5. The default port that this frontend is running is 3000

#### For the backend part
1. Backend/Server of the app is made with the help of Express Js which handles all the routes related to adding or deleting a reminder.
2. The database that I have used is mongodb which is using mongoose on top of it for creating the schemas and adding data to mongodb.
3. In the backend the server is monitoring all the reminders and whenver it matches that the current time is equal to reminder's time it is playing an audio.
4. The default port that this backend is running is 9000
5. Different packages used :
    -> express js (For creating server)
    -> mongoose (For creating the schema and adding data to the mongodb)
    -> cors (For allowing cross origins to make request to the backend)
    -> audio-play (For playing audio)
    -> audio-loader (For loading the audio)