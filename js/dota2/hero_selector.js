//
// Hero Selector
//

$(document).ready(function(){
    var params = get_url_params();
    var team = new Team();
    var heroes = params.heroes.split(',');
    if(heroes.length > 0) {
        for(i in heroes) {
            $("#available_heroes .hero[data-slug='"+heroes[i]+"']").trigger('click');
        }
    }
});

function get_hero_as_li(hero) {
  url = "http://cdn.dota2.com/apps/dota2/images/heroes/{0}_hphover.png".format(hero.slug);
  hero_li = $("<li class='hero'><img src='" + url + "' /></li>");
  for (field in hero) {
    hero_li.attr('data-' + field, hero[field]);  // e.g. marks the hero's Carry rating as a "3"
    if (hero[field] > 0) {
      hero_li.addClass(field);  // e.g. marks the hero as a "Carry".  For filtering.
    }
  }
  if(typeof hero.Search == 'undefined') {
    hero_li.attr('data-Search', hero['Name']);
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
  $("#selected_heroes").append(get_hero_as_li(new Team().get_hero_stats(hero_name)));
  $("#selected_heroes .hero:last").create_tooltip();

  $(document).trigger('heroes_changed');

  // Update the chart
  var selectedHeroes = get_selected_heroes();
  
  // Update the hash
  location.hash = "heroes="+selectedHeroes.join(',');
  
  // Clean up names of heroes
  selectedHeroes = cleanUpSelected(selectedHeroes);

  var coefficients = [];
  for (var i = 0; i < selectedHeroes.length; i++) {
    if (selectedHeroes[i] != "Legion Commander" && selectedHeroes[i] != "Phoenix" && selectedHeroes[i] != "Terrorblade") // temporary fix until there are coefficients for those heroes
    {
      coefficients.push(hero_coefficients[selectedHeroes[i]]);
    }
  }
  make_chart(coefficients);

  // Update the legend
  $("#legend").html('');
  for (var i = 0; i < selectedHeroes.length; i++) 
  {
    if (selectedHeroes[i] != "Legion Commander" && selectedHeroes[i] != "Phoenix" && selectedHeroes[i] != "Terrorblade") // temporary fix until there are coefficients for those heroes
    {
      $("#legend").append("<li class='bullet' style='color: "
                + COLORS[i][1] + "'>&#9632;</li><li class='text'>"
                + selectedHeroes[i] + "</li>");
    }
  }

  
});

// ... remove heroes
$(document).on("click", '#selected_heroes .hero', function() {
  $(this).remove();
  $(document).trigger('heroes_changed');
  
  // Update the chart
  var selectedHeroes = get_selected_heroes();
  // Clean up names of heroes
  selectedHeroes = cleanUpSelected(selectedHeroes);

  var coefficients = [];
  for (var i = 0; i < selectedHeroes.length; i++) {
    if (selectedHeroes[i] != "Legion Commander" && selectedHeroes[i] != "Phoenix" && selectedHeroes[i] != "Terrorblade") // temporary fix until there are coefficients for those heroes
    {
      coefficients.push(hero_coefficients[selectedHeroes[i]]);
    }
  }
  make_chart(coefficients);

  // Update the legend
  $("#legend").html('');
  for (var i = 0; i < selectedHeroes.length; i++) 
  {
    if (selectedHeroes[i] != "Legion Commander" && selectedHeroes[i] != "Phoenix" && selectedHeroes[i] != "Terrorblade") // temporary fix until there are coefficients for those heroes
    {
      $("#legend").append("<li class='bullet' style='color: "
                + COLORS[i][1] + "'>&#9632;</li><li class='text'>"
                + selectedHeroes[i] + "</li>");
    }
  }

  
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


function cleanUpSelected(select)
{
  var fixedSelected = select;
  for (var i = 0; i < fixedSelected.length; i++) 
  {
    /*
    ["antimage"] 
    ["centaur"] 
    ["rattletrap"] 
    ["doom_bringer"] 
    ["wisp"] 
    ["keeper_of_the_light"] 
    ["life_stealer"] 
    ["legion_commander"] 
    ["lycan"] 
    ["magnataur"] 
    ["furion"] 
    ["obsidian_destroyer"] 
    ["phoenix"] 
    ["queenofpain"] 
    ["nevermore"] 
    ["terrorblade"] 
    ["shredder"] 
    ["treant"] 
    ["vengefulspirit"]
    ["zuus"] 
    */
    switch(fixedSelected[i])
    {
    case "antimage":
      fixedSelected[i] = "Anti-Mage";
      break;
    case "centaur":
      fixedSelected[i] = "Centaur Warrunner";
      break;
    case "rattletrap":
      fixedSelected[i] = "Clockwerk";
      break;
    case "doom_bringer":
      fixedSelected[i] = "Doom";
      break;
    case "wisp":
      fixedSelected[i] = "Io";
      break;
    case "keeper_of_the_light":
      fixedSelected[i] = "Keeper of the Light";
      break;
    case "life_stealer":
      fixedSelected[i] = "Lifestealer";
      break;
    case "lycan":
      fixedSelected[i] = "Lycanthrope";
      break;
    case "magnataur":
      fixedSelected[i] = "Magnus";
      break;
    case "furion":
      fixedSelected[i] = "Nature's Prophet";
      break;
    case "obsidian_destroyer":
      fixedSelected[i] = "Outworld Devourer";
      break;
    case "queenofpain":
      fixedSelected[i] = "Queen of Pain";
      break;
    case "nevermore":
      fixedSelected[i] = "Shadow Fiend";
      break;
    case "shredder":
      fixedSelected[i] = "Timbersaw";
      break;
    case "treant":
      fixedSelected[i] = "Treant Protector";
      break;
    case "vengefulspirit":
      fixedSelected[i] = "Vengeful Spirit";
      break;
    case "zuus":
      fixedSelected[i] = "Zeus";
      break;
    default:
      fixedSelected[i] = fixedSelected[i].replace(/_/g, " ").replace(/\b./g, function(m){ return m.toUpperCase(); });
      break;
    }
  }
  return fixedSelected;
}