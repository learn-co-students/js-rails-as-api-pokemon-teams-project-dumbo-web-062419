const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main');

// X event listener
//
// Y fetch
//
// Z DOM slap

function trainersToDOM(trainers){
  trainers.forEach(function(trainer){
    const card_div = document.createElement("div")
    card_div.className = 'card';
    card_div.dataset.id = trainer.id
    card_div.innerHTML = `
      <p>${trainer.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul></ul>`
    main.append(card_div);

    const addPokemonBtn = card_div.querySelector("button");
    addPokemonBtn.addEventListener("click", function(event){
      const pokemonTeam = card_div.querySelector("ul")
      if (pokemonTeam.children.length < 6) {
        const newPokemon = document.createElement("li")
        newPokemon.innerHTML = `Janette (Munchlax) <button class="release">Release</button>`
        pokemonTeam.append(newPokemon)
      }
    })

    fetch(`http://localhost:3000/trainers/${trainer.id}/`).then(res => res.json()).then(function(data){
      data.forEach(function(pokemon){
        const ul = card_div.querySelector("ul")
        const li = document.createElement("li")
        li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
        ul.append(li)
      })
    })
  })

}

document.addEventListener("DOMContentLoaded", function(){

  fetch(TRAINERS_URL).then(res => res.json()).then(trainersToDOM)

})
