$(document).on("mouseenter mouseleave", "#available_heroes .hero", function(event) {

  exclude_fields = ['Total'];

  if (event.type == 'mouseenter') {
    team = new Team()
    stats = team.get_hero_stats($(this).attr('data-slug'));


    // ... hero image & name
    html = "<p class='text-center'>" + $(this).html() + "</p>";
    html += '<dl class="dl-horizontal">';
    html += '<dt>Name</dt>';
    html += '<dd>' + $(this).attr('data-Name') + '</dd>';

    // ... hero stats
    for (field in stats) {
        if (exclude_fields.indexOf(field) == -1
        && parseInt(stats[field]) > 0) {
            html += "<dt>" + field + "</dt>";

            // ... ... star rating
            html += "<dd>";
            for (var i = 0; i < parseInt(stats[field]); i++) {
                html += "<span class='.glyphicon .glyphicon-star-empty'>*</span>";
            }
            html += "</dd>";
        }
    }
    html += "</dl>";

    $("#hero_stats").html(html);
  }

  if (event.type == 'mouseout') {
    $("#hero_stats").html('');
  }

});
