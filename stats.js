function sum(list) {
	total = 0;
	for (var i = 0; i < list.length; i++) {
		total += list[i];
	}
	return total;
}

function avg(list) {
	return sum(list) / list.length;
}

function max(list) {
	prev = false;
	for (var i = 0; i < list.length; i++) {
		if (list[i] > prev || !prev) {
			prev = list[i];
		}
	}
	return prev;
}

function Team(hero_list) {
	this.heroes = hero_list;

	this.get_hero_stats = function (hero_slug) {
		for (var i = 0; i < heroes.length; i++) {
			if (heroes[i].slug === hero_slug) {
				return heroes[i];
			}
		}
		return false;
	}

	this.stat_rankings = function (stat_name) {
		rankings = [];
		for (var i = 0; i < this.heroes.length; i++) {
			stats = this.get_hero_stats(this.heroes[i]);
			rankings.push(stats[stat_name]);
		}
		return rankings;
	}

	this.stat_avg = function (stat_name) {
		return avg(this.stat_rankings(stat_name));
	}
}
