---
layout: update_template
title: Suggestions (v1.0)
---

We're Live!
-----------

I was planning on waiting a little longer for the public v1.0 release, but
after playing around with this new feature, I've realized that it's ready.
After much work from contributors, we now have fully fleshed out characters
stats and more refined advice generation.

A Bonus: Suggestions
--------------------

The tool will now make suggestions based on what characters you have in your
lineup.  I wasn't planning on getting this finished until later, since I
figured it would be a big time sink, but I actually managed to get it working
pretty well.

Basically, it calculates the advice for each possible new lineup and tries to
maximize good advice and minimize bad advice.  Long story short, it unfairly
avoids filling the Disables, since they are the highest category.  I ultimately
want to move to weighted advice and a quantitative system in general, but for
now this is what we have.
