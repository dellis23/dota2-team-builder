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
            return new Advice('Disables', 'info', 'You have a moderate amount of disables."');
        if (disables >= 0.4)
            return new Advice('Disables', 'warning', 'You are weak on disables.');
        return new Advice('Carries', 'danger', 'You have no disables!');
    }

    this.advice_squishiness = function () {
        if (team.stat_avg('Escape') < 0.5 && team.stat_avg('Durable') < 0.3) {
            return new Advice('Squishiness',
                              'warning',
                              "Your team may be squishy!");
        }
        return new Advice('Squishiness',
                          'success',
                          "Your team seems durable.");
    }

    this.get_all = function () {
        pieces_of_advice = [];
        for (func in this) {
            if (func.indexOf("advice_") == 0) {
                pieces_of_advice.push(this[func]());
            }
        }
        return pieces_of_advice;
    }
}
