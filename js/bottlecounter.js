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

function getBottleHtml(bottle) {
  var textToReturn = '';

  var wineColorClass = getColorClass(bottle.wineColor);
  var wineClubClass = getWineClubMembership(bottle.wineClub);
  var readyToDrinkClass = getReadyToDrinkClass(bottle.readyToDrink)

  textToReturn += '<article class="item flex-item" id="bottle' + bottle.id + '">';
  textToReturn += '<figure class="item__image">';
  textToReturn += '<img src="' + bottle.pic + '" alt="" class="item__image--responsive" />';
  textToReturn += '</figure>';
  textToReturn += '<ul class="item__details">';
  textToReturn += '<li class="item__detail--title">';
  textToReturn += '<h3>' + bottle.name + '</h3>';
  textToReturn += '</li>';
  textToReturn += '<ul class="item__details--icons">';
  textToReturn += '<li class="item__details--icon item__detail--icon-large">';
  textToReturn += '<a class="item__details--icon-link" href="#">';
  textToReturn += '<span class="">' + bottle.bottleCount + '</span>';
  textToReturn += '</a>';
  textToReturn += '</li>';
  textToReturn += '<li class="item__details--icon item__detail--icon-large">';
  textToReturn += '<a class="item__details--icon-link" href="#">';
  textToReturn += '<span class="icon-droplet ' +  wineColorClass + '"></span>';
  textToReturn += '</a>';
  textToReturn += '</li>';
  textToReturn += '<li class="item__details--icon item__detail--icon-large">';
  textToReturn += '<a class="item__details--icon-link" href="#">';
  textToReturn += '<span class="' + wineClubClass  + '"></span>';
  textToReturn += '</a>';
  textToReturn += '</li>';
  textToReturn += '<li class="item__details--icon item__detail--icon-large">';
  textToReturn += '<a class="item__details--icon-link" href="#">';
  textToReturn += '<span class="' + readyToDrinkClass + '"></span>';
  textToReturn += '</a>';
  textToReturn += '</li>';
  textToReturn += '</ul>';
  textToReturn += '<li class="item__detail">' + bottle.winery + ', ' + bottle.wineryLoc + '</li>';
  textToReturn += '<li class="item__detail item__detail--year">' + bottle.vintage + '</li>';
  textToReturn += '<li class="item__detail">' + bottle.varietal + '</li>';
  textToReturn += '<li class="item__detail">';
  textToReturn += '<label>Purchased </label>';
  textToReturn += '<label id="bottle1-purch-where">' + bottle.wherePurchased + ', </label>';
  textToReturn += '<label id="bottle1-purch-when">' + bottle.whenPurchased + '</label>';
  textToReturn += '</li>';
  textToReturn += '<li class="item__detail">' + bottle.price.formatMoney() + '</li>';
  textToReturn += '<li class="item__detail item__detail--description">' + bottle.notes;
  textToReturn += '</li>';
  textToReturn += '</ul>';
  textToReturn += '</article>';

  return textToReturn;
}

function getDeleteBottles(idx, bottleName) {
  return '<option value="' + idx + '" selected>' + bottleName + '</option>';
}

  function collapseAddForm() {
    $("#form__add-new").toggle();
  }
  
    function collapseDeleteForm() {
    $("#form__delete").toggle();
  }

$(function() {
  //initially hide forms
  $("#form__add-new").addClass("collapse");
  $("#form__add-new--button").on("click", collapseAddForm);
  
  $("#form__delete").addClass("collapse");
  $("#form__delete--button").on("click", collapseDeleteForm);
    
  var frmPic = $('#form__add-new--pic');
  var frmName =  $('#form__add-new--name');
  var frmNumBottles = $('#form__add-new--num-bottles');

  $.ajax({
    dataType: 'json',
    type: 'GET',
    url: 'bottles.json',
    success: function(data) {
      var textToInsert = '';
      var delBottlesText = '';
      $.each(data.bottles, function(idx, bottle) {
        textToInsert += getBottleHtml(bottle);
        delBottlesText += getDeleteBottles(idx, bottle.name);
      });
      $('.bottle-container').append(textToInsert);
      $('#form__delete--select').append(delBottlesText);
    },
    error: function() {
      alert('error loading bottles');
    }
  });

  $('#add-new').on('click', function() {
    var bottle = {
      pic: frmPic.val(),
      name: frmName.val(), 
      bottleCount: frmNumBottles.val()
      /* wineColor: "2",
      wineClub: "0",
      readyToDrink: "1",      
      winery: "Balboa", 
      wineryLoc: "Walla Walla, WA", 
      varietal: "4% Viognier, 94% Syrah",
      vintage: "2014",
      wherePurchased: "At the winery",
      whenPurchased: "April 2015",
      price: 14.00,
      notes: "Bought on a trip with Carrie and Chuck." */      
    };

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: 'bottles.json',
      data: bottle,
      success: function(newBottle) {
      $('.bottle-container').append( getBottleHtml(newBottle));
      },
        error: function() {
        alert('error saving order');
      }
    });
  });
})
