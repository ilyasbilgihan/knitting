# Thread Knitting<br>
A simple algorithm which transforms images to knitted threads.

Note: You might need to change [the code line](https://github.com/ilyasbilgihan/knitting/blob/7065955f11fcd4975836b79253cd15ffbe4402ee/main.js#L65) with proper values for your source image if you not use square images.

## Settings Panel

We have 7 settings and 1 image source input boxes.

#### The Settings are:
- **Max Line Count** - How many vectors (straight lines) will be in our knitted thread. (Affects the result)
- **Pin Count** - How many pins does the circular path have. (Affects the result)
- **Min Distance(n)** - There are no vectors (straight lines) from [i-th] to [(i+1,2,3,...,n-1)-th]. (Affects the result)
- **Color Reduce Amount(Q)** - r, g or b values of the drawn line's pixels(according to 'Bresenham Line Algorithm') will be reduced by 'Q'. (Affects the result)
- **Line Opacity** - Opacity value of the line element. (Does not affect the result)
- **Colored Lines** - Do not check that box if you don't want to get colored strings. (Affects the result)
- **Reuse Line** - Do not check that box if you don't want to use line which has been used before. (Affects the result)

![Settings Panel](https://github.com/ilyasbilgihan/knitting/blob/master/example/main_screen.png?raw=true)

## Examples

##### Mustafa Kemal Atatürk
![Mustafa Kemal Atatürk](https://github.com/ilyasbilgihan/knitting/blob/master/example/mustafa_kemal_ataturk.png?raw=true)

##### Cillian Murphy as Thomas Shelby
![Cillian Murphy](https://github.com/ilyasbilgihan/knitting/blob/master/example/thomas_shelby.png?raw=true)
