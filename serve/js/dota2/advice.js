function Advice(name, level, message) {
    this.name = name;
    /* Boostrap levels:
        success
        info
        warning
        danger
    */
    this.level = level;
    this.message = message;
    this.display = function () {
       return "<div class='row text-{0}'><div class='col-md-3'><strong>{1}</strong>: </div><div class='col-md-9'><em>{2}</em></div></div>"
              .format(this.level, this.name, this.message)
    }
}


function GenericAdvice(name, ranges, current, optimal) {
    this.name = name;
    this.ranges = ranges;
    /*
     * ranges = [
           {min: 0, max: 3, level: 'success'},
           ...
       ]
     */
    this.current = current;
    this.optimal = optimal;
    // level
    for (var i = 0; i < this.ranges.length; i++) {
        if (this.current >= this.ranges[i].min && this.current <= this.ranges[i].max) {
            this.level = this.ranges[i].level;
            break;
        }
    }
    // percentage
    this.percentage = this.current / this.optimal * 100;

    this.display = function () {
        return '<div class="row text-{1}"><div class="col-md-3"><strong>{0}</strong>: </div><div class="col-md-9"><div class="progress progress-striped"><div class="progress-bar progress-bar-{1}" style="width: {2}%"></div></div></div></div>'
               .format(this.name, this.level, this.percentage);
    }
}


function Advisor(team) {
    this.team = team;

    this.advice_carries = function () {
        carry_sum = team.stat_sum('Carry');
        return new GenericAdvice(
            'Carry',
            [
                {min: 0, max: 2, level: 'danger'},
                {min: 3, max: 4, level: 'warning'},
                {min: 5, max: 8, level: 'success'},
                {min: 9, max: 15, level: 'danger'}
            ],
            carry_sum,
            5)
    }

    this.advice_disables = function () {
        disables = team.stat_sum('Disabler');
        return new GenericAdvice(
            'Disables',
            [
                {min: 0, max: 2, level: 'danger'},
                {min: 3, max: 6, level: 'warning'},
                {min: 7, max: 15, level: 'success'}
            ],
            disables,
            7);
    }

    this.advice_initiation = function () {
        initiation = team.stat_sum('Initiator');
        return new GenericAdvice(
            'Initiation',
            [
                {min: 0, max: 1, level: 'danger'},
                {min: 2, max: 2, level: 'warning'},
                {min: 3, max: 15, level: 'success'}
            ],
            initiation,
            3);
    }

    this.advice_nukers = function () {
        nukers = this.team.stat_sum('Nuker');
        return new GenericAdvice(
            'Nukers',
            [
                {min: 0, max: 3, level: 'danger'},
                {min: 4, max: 6, level: 'warning'},
                {min: 7, max: 15, level: 'success'}
            ],
            nukers,
            7);
    }

    this.advice_pushers = function () {
        pushing = this.team.stat_sum('Pusher');
        return new GenericAdvice(
            'Pushers',
            [
                {min: 0, max: 2, level: 'danger'},
                {min: 3, max: 15, level: 'success'}
            ],
            pushing,
            3);
    }

    this.advice_squishiness = function () {
        if (this.team.stat_sum('Escape') + this.team.stat_sum('Durable') < 7) {
            return new Advice('Squishiness',
                              'warning',
                              "Your team may be squishy!");
        }
        return new Advice('Squishiness',
                          'success',
                          "Your team seems durable.");
    }

    this.advice_supports = function () {
        supports = team.stat_sum('Support');
        return new GenericAdvice(
            'Support',
            [
                {min: 0, max: 3, level: 'danger'},
                {min: 4, max: 5, level: 'warning'},
                {min: 6, max: 9, level: 'success'},
                {min: 10, max: 15, level: 'danger'}
            ],
            supports,
            6);
    }

    this.advice_lane_support = function () {
        lane_support = team.stat_sum('LaneSupport');
        return new GenericAdvice(
            'Lane Support',
            [
                {min: 0, max: 3, level: 'danger'},
                {min: 4, max: 15, level: 'success'}
            ],
            lane_support,
            4);
    }

    this.advice_junglers = function () {
        junglers = this.team.stat_sum('Jungler');
        if (junglers >= 5)
            return new Advice('Junglers', 'warning', "You've got a potentially crowded jungle.");
        return false;
    }

    this.advice_melee = function () {
        melee = this.team.stat_sum('Melee');
        if (melee >= 4)
            return new Advice('Melee', 'danger', "You have too many melee characters");
        if (melee == 3)
            return new Advice('Melee', 'warning', "You have a lot of melee characters (3)");
        return false;
    }

    this.quality = function () {
        pieces_of_advice = this.all();
        total = 0;
        for (var i = 0; i < pieces_of_advice.length; i++) {
            switch(pieces_of_advice[i].level) {
                case 'danger':
                    add = -2;
                    break;
                case 'warning':
                    add = -1;
                    break;
                case 'success':
                    add = 1;
                    break;
                default:
                    add = 0;
            }
            total += add;
        }
        return total;
    }

    this.all = function () {
        pieces_of_advice = [];
        for (func in this) {
            if (func.indexOf("advice_") == 0) {
                adv = this[func]();
                if (adv) {
                    pieces_of_advice.push(adv);
                }
            }
        }
        return pieces_of_advice;
    }

    this.display = function () {
        pieces_of_advice = this.all();
        output = '';
        for (var i = 0; i < pieces_of_advice.length; i++) {
            output += pieces_of_advice[i].display();
        }
        return output;
    }
}


$(document).on('heroes_changed', function () {

	// Get advice
	selected = get_selected_heroes();
	team = new Team(selected);
	advice = new Advisor(team);
	$("#advice").html(advice.display());

});
