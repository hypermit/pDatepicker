in the name of Allah(God)

#pDatepicker

![alt tag](https://raw.githubusercontent.com/mohammadhosain/pDatepicker/master/screenshot.png)

To use pDatepicker :  

1.Include jquery.js, pdatepicker.js and pdatepicker.css

2.Define input tag :

	<input id='pdatetxt'>

3.Add js code to create pdatepicker :

	pdatepicker('pdatetxt',{inline:true,selected:'1393/11/26',cyear:1393,cmonth:10});

Second argument(configs) is optional.

Explanation of configs :

1.inline : if true textbox is not shown.

2.selected : date that is selected by default. if not sets via configs, 'today' is used for selected date.

3.cyear and cmonth : cyear(current year) and cmonth(current month) are used together and when calendar opens, show this month of year.
if cyear or(and) cmonth are not set via configs, 'selected' option is used for current year and month.


To show,hide and toggle picker use show,hide and toggle function :


	<script>pdp=new pdatePicker();</script><button onclick='pdp.show();'>show pdate picker</button>


###Email
mohammad.hosain@chmail.ir

###License
this project licensed under LGPL.
