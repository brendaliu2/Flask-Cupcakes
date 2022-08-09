"use strict";

const $LIST = $('ul');

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
  $LIST.empty();
  const cupcakes = await getCupcakesJson();
  for(let cupcake of cupcakes){
    
    //FIXME: refactor the rest of this function into a helper function that 
    //accepts a single cupcake and appends it to the DOM
    const flavor = cupcake.flavor;
    const size = cupcake.size;
    const rating = cupcake.rating;
    const image = cupcake.image;

    const $cupcake = $("<li>");
    const cupcakeString = `Flavor is ${flavor}, size is ${size}, rating is ${rating}`;
    const $image = $("<img>");
    $image.attr('src', image);
    $cupcake.text(cupcakeString);
    $image.attr('width', "50px");
    $image.prependTo($cupcake);
    $cupcake.appendTo($LIST);
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


