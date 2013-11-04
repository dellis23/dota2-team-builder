function Advice(name, level, message) {
    this.name = name;
    /* Boostrap levels:
        muted
        success
        info
        warning
        danger
    */
    this.level = level;
    this.message = message;
    this.display = function () {
       return "<li class='text-{0}'><strong>{1}</strong>: <em>{2}</em></li>"
              .format(this.level, this.name, this.message)
    }
}

function Advisor(team) {
    this.team = team;

    this.advice_carries = function () {
        carry_avg = team.stat_sum('Carry');
        if (carry_avg >= 9)
            return new Advice('Carries', 'warning', 'You have a lot of carries!');
        if (carry_avg >= 5)
            return new Advice('Carries', 'success', 'You have a good amount of carries.');
        if (carry_avg >= 2)
            return new Advice('Carries', 'warning', 'You are weak on carries.');
        return new Advice('Carries', 'danger', 'You have almost no carry potentia!')
    }

    this.advice_disables = function () {
        disables = team.stat_sum('Disabler');
        if (disables >= 7)
            return new Advice('Disables', 'success', 'You have a lot of disables.');
        if (disables >= 4)
            return new Advice('Disables', 'info', 'You\'re a little low on disables!');
        if (disables >= 2)
            return new Advice('Disables', 'warning', 'You are weak on disables!');
        return new Advice('Disables', 'danger', 'You have no disables!');
    }

    this.advice_initiation = function () {
        initiation = team.stat_sum('Initiator');
        if (initiation >= 3)
            return new Advice('Initiation', 'success', 'You have a lot of initation/teamfighting.');
        if (initiation >= 1)
            return new Advice('Initiation', 'warning', 'Your initiation is a bit weak.');
        return new Advice('Initiation', 'danger', 'You have no initiation!');
    }

    this.advice_nukers = function () {
        nukers = this.team.stat_sum('Nuker');
        if (nukers >= 7)
            return new Advice('Nukers', 'success', "You've got strong nuking potential.");
        if (nukers >= 4)
            return new Advice('Nukers', 'info', "You have alright nuking potential.");
        return new Advice('Nukers', 'warning', "You have almost no nukers!")
    }

    this.advice_pushers = function () {
        pushing = this.team.stat_sum('Pusher');
        if (pushing >= 3)
            return new Advice('Pushers', 'success', "You've got good tower pushers.")
        return new Advice('Pushers', 'warning', "You're weak on tower pushers!")
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
        if (supports >= 10)
            return new Advice('Supports', 'warning', 'Uh oh, that\'s a lot of supports')
        if (supports >= 6)
            return new Advice('Supports', 'success', 'You have a nice amount of support.')
        if (supports >= 1)
            return new Advice('Supports', 'warning', 'You are weak on supports.')
        return new Advice('Supports', 'danger', 'You have no supports!')
    }

    this.advice_lane_support = function () {
        lane_support = team.stat_sum('LaneSupport');
        if (lane_support >= 4)
            return new Advice('Lane Support', 'success', 'You\'ve got good lane support.')
        return new Advice('Lane Support', 'warning', 'You don\'t have much lane support ability.');
    }

    this.advice_junglers = function () {
        junglers = this.team.stat_sum('Jungler');
        if (junglers >= 5)
            return new Advice('Junglers', 'warning', "You've got a potentially crowded jungle.");
        return false;
    }

    this.get_all = function () {
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
}
