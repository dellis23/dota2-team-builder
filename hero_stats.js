function get_stat_display(hero_slug) {
	exclude_fields = ['Total'];
  
	team = new Team()
    stats = team.get_hero_stats(hero_slug);

    // ... hero image & name
    html = '<ul class="list-unstyled">';
    html += '<li>Name - ' + stats['Name'] + '</li>';

    // ... hero stats
    for (field in stats) {
        if (exclude_fields.indexOf(field) == -1
        && parseInt(stats[field]) > 0) {
            html += "<li>" + field + " - ";

            // ... ... star rating
            for (var i = 0; i < parseInt(stats[field]); i++) {
                html += "<span class='.glyphicon .glyphicon-star-empty'>*</span>";
            }
            html += "</li>";
        }
    }
    html += "</ul>";
    
    return html;
}


$(function () {
});


$(document).on("mouseenter mouseleave", "#available_heroes .hero", function(event) {

  /*if (event.type == 'mouseenter') {
    html = get_stat_display($(this).attr('data-slug'));
    $("#hero_stats").html(html);
  }

  if (event.type == 'mouseleave') {
    $("#hero_stats").html('');
  }*/

});
