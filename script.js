const url_pokemon = "https://pokeapi.co/api/v2/";

function teste() {
    let retorno = testSend();
    var retObj = JSON.parse(retorno);
    testResult(retObj);
}

function testSend() {
    let request = new XMLHttpRequest()
    request.open("GET", url_pokemon + 'pokemon/6', false)
    request.send();
    return request.responseText;

}

function testResult(obj) {
    let nomePok = obj.name;
    let imgPok = '<img src=' + obj.sprites.front_default + '>'
    document.getElementById("nomePok").innerHTML = nomePok;
    document.getElementById("imagemPok").innerHTML = imgPok;
}

function fazerRequisicao(opcaoUrl) {
    let request = new XMLHttpRequest();
    if (opcaoUrl == undefined) {
        request.open("GET", url_pokemon + 'pokemon/?limit=380', false)
    } else {
        request.open("GET", opcaoUrl, false)
    }

    request.send();
    return request.responseText;

}

function mostrarPokemon() {
    document.getElementById("imgTodos").style.display = 'block'
    document.getElementById("imgpokemon").style.display = 'none'
    let ret = fazerRequisicao();
    var retObj = JSON.parse(ret);
    tratarRetorno(retObj);
}

function tratarRetorno(objPokemon) {
    var out = "";
    for (var cont = 0; cont < objPokemon.results.length; cont++) {
        var retItem = mostrarItemPokemon(objPokemon.results[cont].url);
        out += '<div class="card">' +
            '<img src=' + retItem.sprites.front_default + '>' +
            '<label>' + objPokemon.results[cont].name + '</label></div>';
    }

    document.getElementById("imgTodos").innerHTML = out;
}

function mostrarItemPokemon(url) {
    let ret = fazerRequisicao(url);
    var retObj = JSON.parse(ret);
    return (retObj);

}

function pesquisarPokemon() {
    document.getElementById("imgpokemon").style.display = 'block'
    document.getElementById("imgTodos").style.display = 'none'
    var nomePokemon = document.querySelector('#buscapokemon').value;
    var url = url_pokemon + 'pokemon/' + nomePokemon;
    var retornoPokemon = fazerRequisicao(url);
    var retObj = JSON.parse(retornoPokemon);
    var pokemon = '<div class="card">' +
        '<img src=' + retObj.sprites.front_default + '>' +
        '<label>' + retObj.name + '</label></div>';

    document.getElementById("imgpokemon").innerHTML = pokemon;

}