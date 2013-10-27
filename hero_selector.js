if (!String.prototype.format) {
  String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
    ? args[number]
    : match
    ;
  });
  };
}

//
// Hero Selector
//

// ... show images
for (var i = 0; i < heroes.length; i++) {
  url = "http://cdn.dota2.com/apps/dota2/images/heroes/{0}_hphover.png".format(heroes[i].slug);
  hero_li = $("<li class='hero'><img src='" + url + "' /></li>");
  hero_li.data('slug', heroes[i].slug);
  $("#available_heroes").append(hero_li);
}

// ... select heroes
$("#available_heroes .hero").on("click", function() {
  hero = $(this).clone(true);
  hero.off('click');
  $("#selected_heroes").append(hero);
  $(document).trigger('heroes_changed');
});

// ... remove heroes
$(document).on("click", '#selected_heroes .hero', function() {
  $(this).remove();
  $(document).trigger('heroes_changed');
});

// ... Main Interface
function get_selected_heroes() {
  names = [];
  selected_heroes = $("#selected_heroes li");
  for (var i = 0; i < selected_heroes.length; i++) {
    names.push($(selected_heroes[i]).data('slug'));
  }
  return names;
}
