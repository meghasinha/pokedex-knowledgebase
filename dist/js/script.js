"use strict";function _typeof(o){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o})(o)}var pokemonRepository=function(){var o=[],e="https://pokeapi.co/api/v2/pokemon/?limit=150",t=$("#modal-container"),n=$("#modal-container1");function i(o){pokemonRepository.showPleaseWait(),pokemonRepository.loadDetails(o).then(function(){pokemonRepository.hidePleaseWait(),pokemonRepository.showModal(o)})}function a(e){var t=0;"object"===_typeof(e)&&Object.keys(e).forEach(function(o){t=0,"name"!=o&&"detailsUrl"!=o||(t=1)}),1==t&&o.push(e)}function s(){t.removeClass("is-visible")}return window.addEventListener("keydown",function(o){"Escape"===o.key&&t.hasClass("is-visible")&&s()}),t.on("click",function(o){$(o.target).is(t)&&s()}),t.on("pointerdown",function(o){o.target===t&&s()}),{add:a,addListItem:function(o){var e=$('<li class="myList"></li>'),t=$("<button type=button>"+o.name+"</button>");e.append(t),$(".pokedox").append(e),e.on("pointerdown",function(e){i(o)})},getAll:function(){return o},showDetails:i,loadList:function(){return $.ajax(e).then(function(o){o.results.forEach(function(o){a({name:o.name,detailsUrl:o.url})})}).catch(function(o){console.error(o)})},loadDetails:function(o){var e=o.detailsUrl;return $.ajax(e).then(function(e){console.log(e),o.imageUrl=e.sprites.front_default,o.height=e.height,o.types=Object.keys(e.types)}).catch(function(o){console.error(o)})},showPleaseWait:function(){n.empty();var o=$('<div class="modal1"></div>'),e=$('<p> "please wait its loading"</p>');o.append(e),n.append(o),n.addClass("is-visible")},hidePleaseWait:function(){n.removeClass("is-visible")},showModal:function(o){t.empty();var e=$('<div class="modal"></div>'),n=$('<button class="modal-close">Close</button>');n.on("pointerdown",s);var i=$("<p>"+o.name+"</p>"),a=$("<p>"+o.height+"</p>"),p=$("<p>"+o.types+"</p>"),l=$("<img src="+o.imageUrl+' alt="image" class="responsive">');e.append(n),e.append(i),e.append(a),e.append(p),e.append(l),t.append(e),t.addClass("is-visible")},hideModal:s}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(o){pokemonRepository.addListItem(o)})});