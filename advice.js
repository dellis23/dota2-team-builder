function Advice(name, level, message) {
    this.levels = {
        'none': {
            color: '#cc0000',
            display: 'Non-existant'
        },
        'weak': {
            color: '#FF894A',
            display: 'Weak'
        },
        'medium': {
            color: '#FFFF4A',
            display: 'Medium'
        },
        'strong': {
            color: '#AEFF4A',
            display: 'Strong'
        },
        'amazing': {
            color: '#4AFF4A',
            display: 'Amazing'
        }
    };

    this.name = name;
    this.level = this.levels[level];
    this.message = message;
    this.display = function () {
       return "<li style='color: {0}'>{1} - <strong>{2}</strong>: <em>{3}</em>"
              .format(adv.level.color, adv.name,
                      adv.level.display, adv.message)
    }
}

function Advisor(team) {
    this.team = team;

    this.advice_squishiness = function () {
        if (team.stat_avg('Escape') < 0.5 && team.stat_avg('Durable') < 0.3) {
            return new Advice('Squishiness',
                              'medium',
                              "Your team may be squishy!");
        }
        return new Advice('Squishiness', 'strong', "Your team seems durable.");
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
