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
