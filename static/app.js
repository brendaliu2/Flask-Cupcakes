"use strict";

const $CUPCAKES_ROW = $('#cupcakes-row');

//TODO: ADD DOCSTRINGS
//TODO: OOP Refactor

/** */
async function getCupcakesJson () {
  let response = await axios.get('api/cupcakes');
  console.info("get_cupcakes_json");
  return response.data.cupcakes;
}

/** */
async function appendToCupcakeList(){
  $CUPCAKES_ROW.empty();
  const cupcakes = await getCupcakesJson();
  for(let cupcake of cupcakes){
    
    //FIXME: refactor the rest of this function into a helper function that 
    //accepts a single cupcake and appends it to the DOM
    const flavor = cupcake.flavor;
    const size = cupcake.size;
    const rating = cupcake.rating;
    const image = cupcake.image;

    //Create DOM elements
    const $cupcakeContainer = $('<div>').addClass('col-3')
    const $cupcakeDescList = $('<ul>').addClass('list-group')
    $('<li>')
      .addClass('list-group-item my-1')
      .appendTo($cupcakeDescList)
      .text(flavor);
    $('<li>')
      .addClass('list-group-item my-1')
      .appendTo($cupcakeDescList)
      .text(size);
    $('<li>')
      .addClass('list-group-item my-1')
      .appendTo($cupcakeDescList)
      .text(rating);
      
    const $image = $("<img>").addClass('img-fluid').attr('src', image);;

    //Add elements to DOM
    $image.prependTo($cupcakeContainer);
    $cupcakeDescList.appendTo($cupcakeContainer);
    $cupcakeContainer.appendTo($CUPCAKES_ROW)
  }
}

/** */
function getFormData () {
  return {
    'flavor': $('#flavor').val(),
    'size': $('#size').val(),
    'rating': $('#rating').val(),
    'image': $('#image').val(),
  }
}

/** */
function clearForm() {
  $('#flavor').val('');
  $('#size').val('');
  $('#rating').val('');
  $('#image').val('');
}

/** */
async function addCupcake () {
  const newCupcake = getFormData();
  clearForm();
  const resp = await axios.post('api/cupcakes', newCupcake);
}

/** */
async function submitHandler(e) {
  e.preventDefault(); 
  await addCupcake();
  
  // FIXME: make this the single cupcake append function 
  appendToCupcakeList();
}

$('form').on('submit',submitHandler);
appendToCupcakeList();


