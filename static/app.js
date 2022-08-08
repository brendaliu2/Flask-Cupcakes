"use strict";


// TODO: OOP make it a class

const $list = $('ul');

async function get_cupcakes_json () {
  let response = await axios.get('api/cupcakes');
  console.info("get_cupcakes_json");
  return response.data.cupcakes;
}

async function append_to_cupcake_list(){
  const cupcakes = await get_cupcakes_json();
  for(let cupcake of cupcakes){
    const flavor = cupcake.flavor;
    const size = cupcake.size;
    const rating = cupcake.rating;
    const image = cupcake.image;

    const $cupcake = $("<li>");
    const cupcakeString = `Flavor is ${flavor}, size is ${size}, rating is ${rating}`;
    const $image = $("<img>");
    $image.attr('src', image);
    $cupcake.text(cupcakeString);
    $image.attr('width', "200px");
    $image.appendTo($cupcake);
    $cupcake.appendTo($list);

  }
}

append_to_cupcake_list()

