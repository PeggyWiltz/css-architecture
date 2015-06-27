/* $(function() {
    $.ajax({
      dataType: 'json',
      type: 'GET',
      url: 'bottles.json',
      success: function(data) {
        $.each(data.bottles, function(i, bottle) {
          console.log(bottle);
          console.log(i);
          $('#bottles').append('<li>name: ' + bottle.name + ', winery: ' + bottle.winery + '</li>');

        });
      }
    });

}) */

Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this, 
	    negative = number < 0 ? "-" : "",
	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};  //From http://www.josscrowcroft.com/2011/code/format-unformat-money-currency-javascript/

function getColorClass(colorNum) {  
  var colorClass = 'item__detail--red-wine';
  switch(colorNum) {
    case "1":
        return 'item__detail--white-wine';
        break;
    case "2":
        return 'item__detail--rose-wine';
        break;   
  }
  return colorClass;  
}

function getWineClubMembership(isWineClub) {  
  var clubClass = '';
  if (isWineClub === "1") {
    clubClass = 'icon-star-empty';
  }
  return clubClass;  
}

function getReadyToDrinkClass(isReadyToDrink) {
  var readyToDrinkClass = "";
  if (isReadyToDrink === "1") {
    readyToDrinkClass = "icon-glass";
  }
  return readyToDrinkClass;
}

$(function() {
    $.ajax({
      dataType: 'json',
      type: 'GET',
      url: 'bottles.json',
      success: function(data) {
        var textToInsert = '';
        $.each(data.bottles, function(idx, bottle) {
          var wineColorClass = getColorClass(bottle.wineColor);
          var wineClubClass = getWineClubMembership(bottle.wineClub);
          var readyToDrinkClass = getReadyToDrinkClass(bottle.readyToDrink)
          
          textToInsert += '<article class="item flex-item" id="bottle' + bottle.id + '">';
          textToInsert += '<figure class="item__image">';
          textToInsert += '<img src="images/bottle' + bottle.id + '.JPG" alt="" class="item__image--responsive" />';
          textToInsert += '</figure>';
          textToInsert += '<ul class="item__details">';
          textToInsert += '<li class="item__detail--title">';
          textToInsert += '<h3>' + bottle.name + '</h3>';
          textToInsert += '</li>';
          textToInsert += '<ul class="item__details--icons">';
          textToInsert += '<li class="item__details--icon item__detail--icon-large">';
          textToInsert += '<a class="item__details--icon-link" href="#">';
          textToInsert += '<span class="">' + bottle.bottleCount + '</span>';
          textToInsert += '</a>';
          textToInsert += '</li>';
          textToInsert += '<li class="item__details--icon item__detail--icon-large">';
          textToInsert += '<a class="item__details--icon-link" href="#">';
          textToInsert += '<span class="icon-droplet ' +  wineColorClass + '"></span>';
          textToInsert += '</a>';
          textToInsert += '</li>';
          textToInsert += '<li class="item__details--icon item__detail--icon-large">';
          textToInsert += '<a class="item__details--icon-link" href="#">';
          textToInsert += '<span class="' + wineClubClass  + '"></span>';
          textToInsert += '</a>';
          textToInsert += '</li>';
          textToInsert += '<li class="item__details--icon item__detail--icon-large">';
          textToInsert += '<a class="item__details--icon-link" href="#">';
          textToInsert += '<span class="' + readyToDrinkClass + '"></span>';
          textToInsert += '</a>';
          textToInsert += '</li>';
          textToInsert += '</ul>';
          textToInsert += '<li class="item__detail">' + bottle.winery + ', ' + bottle.wineryLoc + '</li>';
          textToInsert += '<li class="item__detail item__detail--year">' + bottle.vintage + '</li>';
          textToInsert += '<li class="item__detail">' + bottle.varietal + '</li>';
          textToInsert += '<li class="item__detail">';
          textToInsert += '<label>Purchased </label>';
          textToInsert += '<label id="bottle1-purch-where">' + bottle.wherePurchased + ', </label>';
          textToInsert += '<label id="bottle1-purch-when">' + bottle.whenPurchased + '</label>';
          textToInsert += '</li>';
          textToInsert += '<li class="item__detail">' + bottle.price.formatMoney() + '</li>';
          textToInsert += '<li class="item__detail item__detail--description">' + bottle.notes;
          textToInsert += '</li>';
          textToInsert += '</ul>';
          textToInsert += '</article>';
        });
        $('.bottle-container').append(textToInsert);
      }
    });
})
