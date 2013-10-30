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
        carry_avg = team.stat_sum('Carry')
        if (carry_avg >= 6)
            return new Advice('Carries', 'warning', 'You have a lot of carries!');
        if (carry_avg >= 4)
            return new Advice('Carries', 'success', 'You have a good amount of carries.');
        if (carry_avg >= 2)
            return new Advice('Carries', 'warning', 'You are weak on carries.');
        return new Advice('Carries', 'danger', 'You have almost no carry potential.  Finish fast!')
    }

    this.advice_disables = function () {
        disables = team.stat_sum('Disabler');
        if (disables >= 5)
            return new Advice('Disables', 'success', 'You have a lot of disables.');
        if (disables >= 4)
            return new Advice('Disables', 'info', 'You have a moderate amount of disables.');
        if (disables >= 2)
            return new Advice('Disables', 'warning', 'You are weak on disables.');
        return new Advice('Disables', 'danger', 'You have no disables!');
    }

    this.advice_initiation = function () {
        initiation = team.stat_sum('Initiator');
        if (initiation >= 6)
            return new Advice('Initiation', 'success', 'Holy jesus you have a lot of initation!');
        if (initiation >= 4)
            return new Advice('Initiation', 'success', 'You have some solid initiation.');
        if (initiation >= 2)
            return new Advice('Initiation', 'warning', 'Your initiation is a bit weak.');
        return new Advice('Initiation', 'danger', 'You have almost no initiation!');
    }

    this.advice_nukers = function () {
        nukers = this.team.stat_sum('Nuker');
        if (nukers >= 5)
            return new Advice('Nukers', 'success', "You've got strong nuking potential.");
        if (nukers >= 3)
            return new Advice('Nukers', 'info', "You have alright nuking potential.");
        return new Advice('Nukers', 'warning', "You have almost no nukers!")
    }

    this.advice_pushers = function () {
        pushing = this.team.stat_sum('Pusher');
        if (pushing >= 2)
            return new Advice('Pushers', 'success', "You've got good tower pushers.")
        if (pushing >= 1)
            return new Advice('Pushers', 'info', "Your tower pushing is alright.")
        return new Advice('Pushers', 'warning', "You have no tower pushers!")
    }

    this.advice_squishiness = function () {
        if (this.team.stat_avg('Escape') < 0.5 && this.team.stat_avg('Durable') < 0.3) {
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
        if (supports >= 3)
            return new Advice('Supports', 'success', 'You have a good amount of support.')
        if (supports >= 1)
            return new Advice('Supports', 'warning', 'You are weak on supports.')
        return new Advice('Supports', 'danger', 'You have no supports!')
    }

    this.advice_junglers = function () {
        junglers = this.team.stat_sum('Jungler');
        if (junglers >= 4)
            return new Advice('Junglers', 'warning', "You've got a lot of junglers there buddy...");
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
