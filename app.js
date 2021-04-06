
//game class: represents a game
class Game{
    constructor(title,genre,rating){
        this.title = title;
        this.genre = genre;
        this.rating = rating;
    }
}

//UI class: handles the UI tasks
class UI{
    static displayGames(){
        const games = store.getGames();

        games.forEach((game) => UI.addGamesToList(game))
    }

    static addGamesToList(game){
        const list = document.querySelector('#game-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${game.title}</td>
            <td>${game.genre}</td>
            <td>${game.rating}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X </a></td>
        `;
        list.appendChild(row);
    } 

    static deleteGame(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#game-form');
        container.insertBefore(div, form);

        //vanish alert after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#genre').value = '';
        document.querySelector('#rating').value = '';
    }
}

//store class: Handles local storage tasks within browser
class store{
    static getGames(){
        let games;
        if(localStorage.getItem('games') === null){
            games = [];
        }else{
            games = JSON.parse(localStorage.getItem('games'));
        }

        return games;
    }

    static addGame(game){
        const  games = store.getGames();

        games.push(game);

        localStorage.setItem('games',JSON.stringify(games));
    }

    static removeGame(title){
        const games = store.getGames();

        games.forEach((game,index) => {
            if(game.title === title){
                games.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(games));

    }
}





//Event: Display game
document.addEventListener('DOMContentLoaded', UI.displayGames);

//Event: Add game
document.querySelector('#game-form').addEventListener('submit',(e) => {

    //prevent actual submit
    e.preventDefault();
    
    //get form values
    const title = document.querySelector('#title').value;
    const genre = document.querySelector('#genre').value;
    const rating = document.querySelector('#rating').value;

    //validate
    if(title === '' || genre === '' || rating === ''){
        UI.showAlert("Please fill in all fields.",'danger');
    }else{

    //instantiate game
    const game = new Game(title, genre, rating);

    //Add book to UI
    UI.addGamesToList(game);

    //add game to store
    store.addGame(game);

    //show success message
    UI.showAlert('Game Added successfully', 'success');

    //clear fields after submission
    UI.clearFields();
    }
});

//Event: Remove a game
document.querySelector('#game-list').addEventListener('click',(e) =>{

    //remove game for UI
    UI.deleteGame(e.target)

    //remove game from store
    store.removeGame(e.target.parentElement.previousElementSibling.textContent);

    //show remove game message
    UI.showAlert('Game Removed successfully', 'success');
});


 