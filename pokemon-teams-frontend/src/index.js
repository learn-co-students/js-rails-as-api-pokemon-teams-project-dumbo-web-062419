const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainerCards = document.querySelector('main')


document.addEventListener("DOMContentLoaded", function(){

    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(listAllTrainers)

    function listAllTrainers(trainJson){
        trainJson.forEach(listTrainer)
    }

    function listTrainer(trainer){
        // console.log(trainer)
        const trainerCard = document.createElement('div')
        trainerCard.className = 'card'
        trainerCard.dataset.id = trainer.id 
        trainerCard.innerHTML = `
        <p>${trainer.name}</p>
        <button data-trainer=${trainer.id}>AddPokemon</button>
        <ul id="ul-${trainer.id}">
        </ul>
        `
        const team = trainerCard.querySelector('ul')
        const addBtn = trainerCard.querySelector('button')
        addBtn.addEventListener('click', function(){
            showPokemonForm(event)
        })
        team.addEventListener('click', function(){
            relasePokemon(event)
        })
        trainerCards.append(trainerCard)
    }

    fetch('http://localhost:3000/pokemons')
    .then(res => res.json())
    .then(listAllPokemon)


    function listAllPokemon(pokeJson){
        pokeJson.forEach(listSinglePokemon)
    }

    function listSinglePokemon(pokemon){
        // console.log(pokemon)
        const myTrainer = document.getElementById(`ul-${pokemon.trainer_id}`)
        const pokeInfo = document.createElement('li')
        pokeInfo.innerHTML = `
        ${pokemon.nickname} (${pokemon.species}) <button class="release" data-id="${pokemon.id}">Release</button>
        `
        myTrainer.append(pokeInfo)
    }

    function relasePokemon(event){
        const pokeID = event.target.dataset.id
        // console.log(event.target.parentElement)
        fetch(`http://localhost:3000/pokemons/${pokeID}`, {
            method: "DELETE"
        }).then(res => res.json())
        .then(event.target.parentElement.remove())
    }

    function showPokemonForm(event){
        console.log(event.target.dataset.trainer)
        const trainerDiv = event.target.parentElement
        const newPokeForm = document.createElement('form')
        newPokeForm.innerHTML = `
        <input type="text" name="nickname" value="" placeholder="enter nickname">
        <br>
        <input type="text" name="species" value="" placeholder="enter species">
        <br>
        <input type="hidden" name="trainer_id" value="${event.target.dataset.trainer}">
        <input type="submit" name="submit" value="add pokemon">
        `
        newPokeForm.addEventListener("submit", function(event){
            event.preventDefault()
            addPokemon(event)
        })
        trainerDiv.append(newPokeForm)
    }

    function addPokemon(event){
        const pokeTrainer = event.target.trainer_id.value
        const pokeNickname = event.target.nickname.value
        const pokeSpecies = event.target.species.value
        fetch('http://localhost:3000/pokemons', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                nickname: pokeNickname,
                species: pokeSpecies,
                trainer_id: pokeTrainer
            })
        }).then(res => res.json())
        .then(data => listSinglePokemon(data))
    }


})