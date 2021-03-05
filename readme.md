# Thread Knitting<br>

## Introduction
A simple algorithm which transforms images to knitted threads.

- **Note 1:** You might need to change [the code line](https://github.com/ilyasbilgihan/knitting/blob/7065955f11fcd4975836b79253cd15ffbe4402ee/main.js#L65) with proper values for your source image if you not use square images.

- **Note 2:** When the process finished, you will get an array that shows which pin you must continue and another array that shows i<sup>th</sup> vector's color on the console screen. You can manage these data - export them into your computer or wathever you want.

<br>

## Usage

Just clone or [download](https://github.com/ilyasbilgihan/knitting/archive/master.zip) this repo and run `index.html`.

Or you can try [live version](https://ilyasbilgihan.github.io/knitting/) without changing/modifying the code.

<br>

## Settings Panel

We have 7 settings and 1 source image url input boxes.

#### The Settings are:
- **Max Line Count** - How many vectors (straight lines) will be in our knitted thread. (Affects the result)
- **Pin Count** - How many pins does the circular path have. (Affects the result)
- **Min Distance(n)** - There are no vectors (straight lines) from **i<sup>th</sup>** pin to **(i+1,2,3,...,n-1)<sup>th</sup>** pin. (Affects the result)
- **Color Reduce Amount(Q)** - r, g or b values of the drawn line's pixels(according to '[Bresenham Line Algorithm](https://stackoverflow.com/a/55666538)') will be reduced by 'Q'. (Affects the result)
- **Line Opacity** - Opacity value of the svg-line element. (Does not affect the result)
- **Colored Lines** - Do not check that box if you don't want to get colored strings. (Affects the result)
- **Reuse Line** - Do not check that box if you don't want to use the line which has been used before. (Affects the result)

![Settings Panel](https://github.com/ilyasbilgihan/knitting/blob/master/example/main_screen.png?raw=true)

## Examples

##### Mustafa Kemal Atatürk 1
![Mustafa Kemal Atatürk 1 - Colored](https://github.com/ilyasbilgihan/knitting/blob/master/example/mustafa_kemal_ataturk_1c.png?raw=true)

##### Cillian Murphy as Thomas Shelby
![Cillian Murphy - Colored](https://github.com/ilyasbilgihan/knitting/blob/master/example/thomas_shelby_1c.png?raw=true)

##### Mustafa Kemal Atatürk 2
![Mustafa Kemal Atatürk 2 - Black and White](https://github.com/ilyasbilgihan/knitting/blob/master/example/mustafa_kemal_ataturk_2bw.png?raw=true)

## Thanks to
- [Petros Vrellis's amazing work](http://artof01.com/vrellis/works/knit.html)
- [@christiansiegel's solution approach](https://github.com/christiansiegel/knitter)
- [@MaloDrougard's detailed report](https://github.com/MaloDrougard/knit)

<br>

## Reach me
**[twitter/@ilyasbilgihan](https://twitter.com/ilyasbilgihan)**

**[instagram/@ilyasbilgihan](https://instagram.com/ilyasbilgihan)**

**ilyasbilgihan@gmail.com**
