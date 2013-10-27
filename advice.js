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
        carry_avg = team.stat_avg('Carry')
        if (carry_avg >= 1.2)
            return new Advice('Carries', 'warning', 'You have a lot of carries!');
        if (carry_avg >= 0.8)
            return new Advice('Carries', 'success', 'You have a good amount of carries.');
        if (carry_avg >= 0.4)
            return new Advice('Carries', 'warning', 'You are weak on carries.');
        return new Advice('Carries', 'danger', 'You have almost no carry potential.  Finish fast!')
    }

    this.advice_disables = function () {
        disables = team.stat_avg('Disabler');
        if (disables >= 1)
            return new Advice('Disables', 'success', 'You have a lot of disables.');
        if (disables >= 0.8)
            return new Advice('Disables', 'info', 'You have a moderate amount of disables.');
        if (disables >= 0.4)
            return new Advice('Disables', 'warning', 'You are weak on disables.');
        return new Advice('Disables', 'danger', 'You have no disables!');
    }

    this.advice_initiation = function () {
        initiation = team.stat_avg('Initiator');
        if (initiation >= 1.2)
            return new Advice('Initiation', 'success', 'Holy jesus you have a lot of initation!');
        if (initiation >= 0.8)
            return new Advice('Initiation', 'success', 'You have some solid initiation.')
        if (initiation >= 0.4)
            return new Advice('Initiation', 'warning', 'Your initiation is a bit weak.')
        return new Advice('Initiation', 'danger', 'You have almost no initiation!')
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
        supports = team.stat_avg('Support');
        if (supports >= 0.6)
            return new Advice('Supports', 'success', 'You have a good amount of support.')
        if (supports >= 0.2)
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
