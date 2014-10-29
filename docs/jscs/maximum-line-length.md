# maximumLineLength

    "maximumLineLength": {
        "value": 80
    }

We should have a line limit for consistency. Long lines make code harder to
read and are usually indicative of poor quality code. Also, since 80-character
lines has been a common standard across many languages for so long, many
developers have optimized their development workflow to use 80-character code
editor windows and panes. It's incredibly useful for being able to view
multiple buffers side by side in either your editor or terminal. Writing code
within 80 characters is not hard. People have been doing it effectively for
decades. Furthermore, research also suggest that the optimum line length for
reading text is between 50 and 60 characters.


    "maximumLineLength": {
        "allowUrlComments": true
    }

Many URLs are longer than 80 characters long. Breaking them across multiple
lines doesn't make sense because they no longer can easily be copied and
pasted. Ideally 

If you have a URL that is longer than 80 characters, you can use a URL
shortener like http://t.uber.com/


    "maximumLineLength": {
        "allowUrlComments": false
    }

Like lines of code, comments are also harder to read and may extend beyond the
edges of a programmer's code editor windows/panes if they are too long. 


    "maximumLineLength": {
        "allowRegex": false
    }

If a regex is longer than 80 characters, it is too long to understand. No Regex
should ever be this long. If you have a long Regex that you got from somewhere,
it is recommended that you break it up over several lines with comments like
the one on this page for detecting UTF-8:
http://www.w3.org/International/questions/qa-forms-utf-8.en.php
