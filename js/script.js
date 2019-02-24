var pokemonRepository=(function () {
  var repository=[];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $modalContainer = $('#modal-container');
  var $modalContainer1=$('#modal-container1');

  /* showing details properties of pokemon object*/
  function showDetails(item) {
    pokemonRepository.showPleaseWait();
    pokemonRepository.loadDetails(item).then(function () {
    pokemonRepository.hidePleaseWait();
    pokemonRepository.showModal(item);
       });
  }

  /*Created a new modal to display wait message */
  function showPleaseWait() {
   $modalContainer1.empty();
    var $modal1=$('<div class="modal1"></div>');
    var $text=$('<p> "please wait its loading"</p>');
    $modal1.append($text);
    $modalContainer1.append($modal1);
    $modalContainer1.addClass('is-visible');
  }

    /**
   * Hides "Please wait" overlay. See function showPleaseWait().
   */
  function hidePleaseWait() {
    $modalContainer1.removeClass('is-visible');
  }

  /* This function  creats new element and adds into the DOM */
  function addListItem(new_element)
  {
    var $element=$('<li class="myList"></li>');
    var $button=$('<button type=button>'+ new_element.name +'</button>');
    $element.append($button);
    /* Now, steps for putting the new element in the DOM */
    var $ul = $('.pokedox');
    $ul.append($element);
    /*adding pointer event to display properties of pokemon*/
    $element.on('pointerdown', function(event)
    {
          showDetails(new_element);
    //  }
   });
  }


  /*Function verify candidate Pokemon and Adds verified Pokemons to the repository*/
  function add(new_pokemon)
  {
    var fill_object = 0;
    if(( typeof(new_pokemon) ==='object' ) )
    {
      Object.keys(new_pokemon).forEach(function(property) {
      fill_object = 0;
      if( (property == 'name') || (property == 'detailsUrl') )
      {
        fill_object = 1;
      }
      });
    }
    if(fill_object == 1)
    {
      repository.push(new_pokemon);
    }
  }

  /*Getting List of Pokemons from the specified URL */

  function loadList()
  {
    return $.ajax(apiUrl).then(function (response) {
      console.log(response);
    response.results.forEach(function(item){
        var pokedox = {
          name: item.name,
          detailsUrl: item.url
      };
      add(pokedox);
      });
    }).catch(function (e) {
    });
  }

  /*Fetching the details of each element from the specific URL*/
  function loadDetails(item)
  {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }


  function showModal(item) {
    // Clear all existing modal content
    $modalContainer.empty();
    var $modal = $('<div class="modal"></div>');
    // Add the new modal content
    var $closeButtonElement = $('<button class="modal-close">Close</button>');
    $closeButtonElement.on('pointerdown', hideModal);
    var $titleName =$('<p>' + item.name +'</p>');
    var $titleHeight =$('<p>' +item.height+'</p>');
    var $titleType=$('<p>'+item.types+'</p>');
    var $imgElement=$('<img src='+item.imageUrl+' alt="image" class="responsive">');
    $modal.append($closeButtonElement);
    $modal.append($titleName);
    $modal.append($titleHeight);
    $modal.append($titleType);
    $modal.append($imgElement);
    $modalContainer.append($modal);
    $modalContainer.addClass('is-visible');
    }

  /*To remove the modal display */
  function hideModal() {
    $modalContainer.removeClass('is-visible');
    //$( ".modal" ).remove();
  }


  /*  To remove the modal display  when Esc is pressed */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')) {
      hideModal();
    }
  });
 // click outside modal
 $modalContainer.on('click', function(event) {
   if ($(event.target).is($modalContainer)) {
     hideModal();
   }
 });

  ($modalContainer).on('pointerdown', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });


  /*Function retrievs the complete repository*/
  function getAll()
  {
    return repository;
  }

  return  {
    add:add,
    addListItem:addListItem,
    getAll:getAll,
    showDetails:showDetails,
    loadList:loadList,
    loadDetails:loadDetails,
    showPleaseWait:showPleaseWait,
    hidePleaseWait:hidePleaseWait,
    showModal:showModal,
    hideModal:hideModal

  };
})();

/*Promise operation for loadList*/
pokemonRepository.loadList().then(function() {
/*DOM Operation: Call addlistItem which manipulates the DOM and insert candidate pokemons */
pokemonRepository.getAll().forEach(function(new_pokemon)
{
  pokemonRepository.addListItem(new_pokemon);
}); });
