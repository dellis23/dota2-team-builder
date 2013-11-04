#!/usr/bin/python
from simplejson import loads, dumps
import sys


def get_hero(data, name):
    for hero in data:
        if hero.get('Name') == name:
            return hero


def merge(oldfile, newfile):
    # Old data
    old = oldfile.read()
    json_start = old.index('[')
    json_end = old.index('];')
    old_data = loads(old[json_start:json_end + 1])

    # New data
    output = []
    new = newfile.read()
    new_data = loads(new)
    for hero in new_data:
        old_hero = get_hero(old_data, hero.get('Name'))
        for stat, value in hero.iteritems():
            # ... the CSV -> json converter assumes everything's text
            try:
                old_hero[stat] = int(value)
            except ValueError:
                old_hero[stat] = value
        output.append(old_hero)

    # Reform output
    output_json = dumps(output, indent='  ')
    return old[:json_start] + output_json + ";"


def main():
    if not sys.argv[0]:
        print "Usage: ./merge_json.py file_to_merge.json"
        return
    with open(sys.argv[1], 'rb') as newfile:
        with open('../heroes.js', 'rb') as oldfile:
            print merge(oldfile, newfile)


if __name__ == '__main__':
    main()
