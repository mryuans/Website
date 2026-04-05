---
title: CustomGrammer
displayTitle: 自定义语法
comment: false
timestamp: false
---

## I'd like to test sth

I want to try some custom grammer

### How about the *fold*

::fold{success title="*unexpand fold*"}
Let's Gooooo...
::

:: fold{warning expand always title="expand but always expand"}
:::quote
this is a quote for nobody.
:::
::

::grid{align=equal gapx=20px gapy=20px}
:sep{span=24}
:::fold{danger expand title="try 24 and waterfall"}
I used  `sep{span=24}` in this fold
:::
:sep{span=8}
:::fold{default expand title="another trial"}
I used  `sep{span=8}` in this fold
:::
:sep{span=16}
:::fold{default expand title="another trial"}
I used  `sep{span=16}` in this fold
:::

::

### Then is *tab*
::tab
# :flask:test_tab_1
:::fold{expand title="I'm in tab 1"}
empty...
:::
# :asterisk:test_tab_2
:::grid{align=equal gapy=20px}
:sep{span=24}
::::fold{expand title="fold 1"}
111
::::
:sep{span=24}
::::fold{expand title="fold 2"}
222
::::
:::
::

### Well, what about math and code block?
```python
import time
time.sleep(1)
while True:
    print(111)
```
$$
    E=mc^2
$$

::tab
# $\LaTeX$
:::fold{expand}
$$
    \begin{aligned}
        &\text{HHH}=H\times H^2
\\
        &\text{HH}=H\times H
    \end{aligned}
$$
:::


::

### well, How about let's try some icon
&nbsp;:chevron-right: :chevron-left: :graduation-cap: :flag: 














