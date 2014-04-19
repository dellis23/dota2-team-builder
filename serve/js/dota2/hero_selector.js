//
// Hero Selector
//


function get_hero_as_li(hero) {
  url = "http://cdn.dota2.com/apps/dota2/images/heroes/{0}_hphover.png".format(hero.slug);
  hero_li = $("<li class='hero'><img src='" + url + "' /></li>");
  for (field in hero) {
    hero_li.attr('data-' + field, hero[field]);  // e.g. marks the hero's Carry rating as a "3"
    if (hero[field] > 0) {
      hero_li.addClass(field);  // e.g. marks the hero as a "Carry".  For filtering.
    }
  }
  return hero_li;
}


// ... show images
for (var i = 0; i < heroes.length; i++) {
  var hero_li = get_hero_as_li(heroes[i]);
  $("#available_heroes").append(hero_li);
}

// ... select heroes
$(document).on("click", "#available_heroes .hero, #suggested_heroes .hero", function() {
  // ... ... no more than 5 max
  if (get_selected_heroes().length >= 5) { return; }

  // ... ... don't add duplicates
  hero_name = $(this).attr('data-slug');
  if (get_selected_heroes().indexOf(hero_name) != -1) { return; }

  //... ... select the character
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
    names.push($(selected_heroes[i]).attr('data-slug'));
  }
  return names;
}
