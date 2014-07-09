$.fn.create_tooltip = function() {
    $(this)
        .attr('title', get_stat_display( $(this).attr('data-slug')) )
        .tooltipster({
            position: 'bottom-right',
            fixedWidth: 184,
            maxWidth: 184,
            delay: 0
        }
    );
};

function get_stat_display(hero_slug) {
    exclude_fields = ['Total', 'Melee'];

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
                html += "<img src='/img/star.png' />";
            }
            html += "</li>";
        }
    }
    html += "</ul>";

    return html;
}


function regenerate_tooltips() {
    $('#available_heroes .hero').each(function () {
        hero_slug = $(this).attr('data-slug');
        $(this).create_tooltip();
    });
}


$(document).ready(function() {
    regenerate_tooltips();
});
