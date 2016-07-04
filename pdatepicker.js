/**
 * In the name of Allah(God)
 * 
 * @author mohammad hosain <mohammad.hosain@chmail.ir>
 * @version 0.4
 * @license LGPL
 */

/**
 * Replaces English numeric characters with Persian numeric characters.
 * @param {int|string} num
 * @returns {string}
 */
pDatepicker.num2fa = function (num) {
    num = num.toString();
    fa = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    en = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
    for (i = 0; i < 10; i++) {
        num = num.replace(en[i], fa[i]);
    }
    return num;
};
/**
 * Replaces Persian numeric characters with English numeric characters.
 * @param {int|string} num
 * @returns {string}
 */
pDatepicker.num2en = function (num) {
    num = num.toString();
    fa = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    en = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (i = 0; i < 10; i++) {
        num = num.replace(fa[i], en[i]);
    }
    return num;
};
/**
 * Checks that Persain year is leap or not.
 * @param {int|string} year Persain year
 * @returns {Boolean}
 */
pDatepicker.isLeapYear = function (year) {
    year = parseInt(year);
    return ((year + 2346) * 683) % 2820 < 683;
};
/**
 * Checks that Gregorian year is leap or not.
 * @param {int|string} year Gregorian year
 * @returns {Boolean}
 */
pDatepicker.isGregorianLeapYear = function (year) {
    year = parseInt(year);
    return ((year) % 4 === 0 && (year) % 100 !== 0) || (year) % 400 === 0;
};
/**
 * Gets name of Persain month.
 * @param {int} month Number of Persain month
 * @returns {string}
 */
pDatepicker.monthName = function (month) {
    return['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'][month - 1];
};
/**
 * Returns number of days in Persain monthes
 * @param {int|string} year Persian year
 * @returns {array}
 */
pDatepicker.pMonthes = function (year) {
    year = parseInt(year);
    return [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, pDatepicker.isLeapYear(year) ? 30 : 29];
};
/**
 * Returns number of days in Gregorian monthes
 * @param {int|string} year Gregorian year
 * @returns {array}
 */
pDatepicker.gMonthes = function (year) {
    year = parseInt(year);
    return [0, 31, pDatepicker.isGregorianLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};
/**
 * Gets day of week for Persain date.
 * @param {int|string} year Persain year
 * @param {int|string} month Persain month
 * @param {int|string} day Persain day
 * @returns {int}
 */
pDatepicker.dayOfWeek = function (year, month, day) {
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);
    gDate = pDatepicker.jalali2greorgorian(year, month, day);
    date = new Date(gDate[0], gDate[1] - 1, gDate[2]);
    return (date.getDay() + 1) % 7;
};
/**
 * Converts Persain date to Gregorian date.
 * @param {int|string} jy Persian year
 * @param {int|string} jm Persian month
 * @param {int|string} jd Persain day
 * @returns {array}
 */
pDatepicker.jalali2greorgorian = function (jy, jm, jd) {
    jy = parseInt(jy);
    jm = parseInt(jm);
    jd = parseInt(jd);
    gy = jy + 621;
    gy_1 = gy - 1;
    dg1 = (gy_1) * 365 + parseInt((gy_1) / 4) - parseInt((gy_1) / 100) + parseInt((gy_1) / 400);
    dg2 = 227180;
    dg = dg1 - dg2;
    dj = (jy - 1) * 365 + (jm - 1) * 30 + (jm < 7 ? jm - 1 : 6) + jd;
    dj += (parseInt((jy - 1 + 2346) * 683 / 2820)) - 568;
    dj = dj - 285;
    gd = dj - dg;
    while (gd > 366) {
        gd = gd - (pDatepicker.isGregorianLeapYear(gy) ? 366 : 365);
        gy++;
    }
    if (gd === 366 && !pDatepicker.isGregorianLeapYear(gy)) {
        gy++;
        gd = 1;
    }
    gmonthes = pDatepicker.gMonthes(gy);
    for (var gm = 0; gm < 12; gm++) {
        if (gd <= gmonthes[gm]) {
            break;
        }
        gd -= gmonthes[gm];
    }
    return [gy, gm, gd];
};
/**
 * Converts Gregorian date to Persain date.
 * @param {int|string} gy Gregorian year
 * @param {int|string} gm Gregorian month
 * @param {int|string} gd Gregorian day
 * @returns {Array}
 */
pDatepicker.greorgorian2jalali = function (gy, gm, gd) {
    gy = parseInt(gy);
    gm = parseInt(gm);
    gd = parseInt(gd);
    // invalid date
    if (gy < 622 || (gy === 622 && gm < 3) || (gy === 622 && gm === 3 && gy < 22)) {
        return [1, 1, 1];
    }
    jy = gy - 621;
    jy_1 = jy - 1;
    dj = 365 * jy_1 + parseInt((jy_1 + 2346) * 683 / 2820) - 568;
    gd += (gy - 1) * 365 + parseInt((gy - 1) / 4) - parseInt((gy - 1) / 100) + parseInt((gy - 1) / 400) - 227180;
    for (m = 1; m < gm; m++) {
        gd += pDatepicker.gMonthes(gy)[m];
    }
    gd += 285;
    jd = gd - dj;
    while (jd <= 0) {
        jy--;
        jd += (pDatepicker.isLeapYear(jy) ? 366 : 365);
    }
    while (jd > 366) {
        jd -= jd - (pDatepicker.isLeapYear(jy) ? 366 : 365);
        jy++;
    }
    if (jd === 366 && !pDatepicker.isLeapYear(jy)) {
        jy++;
        jd = 1;
    }
    pmonthes = new Array();
    pmonthes = pDatepicker.pMonthes(jy);
    for (var jm = 0; jm < 12; jm++) {
        if (jd <= pmonthes[jm]) {
            break;
        }
        jd -= pmonthes[jm];
    }
    return [jy, jm, jd];
};
/**
 * Creates date picker.
 * @param {string|null} txtboxId input id.
 * @param {json} configs array of configs. Read README.md file.
 * @returns {pDatepicker}
 */
function pDatepicker(txtboxId, configs) {
    this.id = function () {
        return 'pdatepicker_' + this.txtboxId;
    };
    this.picker = function () {
        return $('#' + this.id());
    };
    this.init = function (txtboxId, configs) {
        this.txtboxId = txtboxId;
        configs = typeof configs !== 'undefined' ? configs : {};
        this.configs = configs;
        this.inline = !configs.hasOwnProperty('inline') || configs.inline;
        this.readonly = configs.hasOwnProperty('readonly') && configs.readonly;
        if (configs.hasOwnProperty('selected') && configs.selected === false) {
            selected = null;
        }
        else if (configs.hasOwnProperty('selected') && (new RegExp('^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,2}$')).exec(configs.selected)) {
            selected = (pDatepicker.num2en(configs.selected)).split('/');
            y = parseInt(selected[0]);
            m = parseInt(selected[1]);
            d = parseInt(selected[2]);
            if (!(y >= 1 && m >= 1 && m <= 12 && d >= 1 && d <= 31 && (d < 31 || m < 7) && (d !== 30 || m !== 12 || pDatepicker.isLeapYear(y)))) {
                date = new Date();
                gy = date.getFullYear();
                gm = date.getMonth() + 1;
                gd = date.getDate();
                selected = pDatepicker.greorgorian2jalali(gy, gm, gd);
            }
        }
        else {
            date = new Date();
            gy = date.getFullYear();
            gm = date.getMonth() + 1;
            gd = date.getDate();
            selected = pDatepicker.greorgorian2jalali(gy, gm, gd);
        }
        date = new Date();
        gy = date.getFullYear();
        gm = date.getMonth() + 1;
        gd = date.getDate();
        this.today = pDatepicker.greorgorian2jalali(gy, gm, gd);
        if (configs.hasOwnProperty('cyear') && configs.hasOwnProperty('cmonth') && parseInt(pDatepicker.num2en(configs.cyear)) > 0 && parseInt(pDatepicker.num2en(configs.cyear)) < 275139 && parseInt(pDatepicker.num2en(configs.cmonth)) > 0 && parseInt(pDatepicker.num2en(configs.cmonth)) <= 12) {
            this.cyear = parseInt(pDatepicker.num2en(configs.cyear));
            this.cmonth = parseInt(pDatepicker.num2en(configs.cmonth));
        }
        else if (selected !== null) {
            this.cyear = parseInt(selected[0]);
            this.cmonth = parseInt(selected[1]);
        }
        else {
            this.cyear = this.today[0];
            this.cmonth = this.today[1];
        }
        if (selected !== null) {
            this.syear = parseInt(selected[0]);
            this.smonth = parseInt(selected[1]);
            this.sday = parseInt(selected[2]);
        }
        this.selected = selected;

    };
    this.draw = function () {
        if (this.picker().length) {
            this.picker().remove();
        }
        tbl = $('<table></table>');
        tbl.addClass('pdate-picker pdate-picker-' + parseInt((this.cmonth - 1) / 3));
        tbl.attr('id', this.id());
        $('#' + this.txtboxId).after(tbl);
        tr = $("<tr></tr>");
        tr.addClass('htr-' + parseInt((this.cmonth - 1) / 3));
        this.ymTd(tr);
        tbl.append(tr);
        this.lmTr(tbl);
        tr = $("<tr></tr>");
        for (n = 0; n < 7; n++) {
            this.nTd(tr, n);
        }
        tbl.append(tr);
        tr = $("<tr></tr>");
        var i = 0;
        stmonth = pDatepicker.dayOfWeek(this.cyear, this.cmonth, 1);
        for (; i < stmonth; i++) {
            this.hTd(tr);
        }
        for (; i < 7; i++) {
            if (this.selected !== null && i - stmonth + 1 === this.sday && this.cmonth === this.smonth && this.cyear === this.syear) {
                this.sTd(tr, i - stmonth + 1);
            }
            else if (i - stmonth + 1 === this.today[2] && this.cmonth === this.today[1] && this.cyear === this.today[0]) {
                this.tTd(tr, i - stmonth + 1);
            }
            else {
                this.mTd(tr, i - stmonth + 1);
            }
        }
        tbl.append(tr);
        endRow = false;
        for (; i - stmonth < pDatepicker.pMonthes(this.cyear)[this.cmonth]; i++) {
            if (i % 7 === 0) {
                tr = $("<tr></tr>");
                endRow = false;
            }
            if (this.selected !== null && i - stmonth + 1 === this.sday && this.cmonth === this.smonth && this.cyear === this.syear) {
                this.sTd(tr, i - stmonth + 1);
            }
            else if (i - stmonth + 1 === this.today[2] && this.cmonth === this.today[1] && this.cyear === this.today[0]) {
                this.tTd(tr, i - stmonth + 1);
            }
            else {
                this.mTd(tr, i - stmonth + 1);
            }
            if (i % 7 === 6) {
                tbl.append(tr);
                endRow = true;
            }
        }
        if (!endRow) {
            for (; i % 7 !== 0; i++) {
                this.hTd(tr);
            }
            tbl.append(tr);
        }
        if (this.inline) {
            $("#" + this.txtboxId).addClass('pdate-picker-hidden-txtbox');
            tbl.css('display', 'inline-block');
        }
        else {
            tbl.css('top', $('#' + this.txtboxId).position().bottom + 'px');
            tbl.css('left', $('#' + this.txtboxId).position().left + 'px');
            tbl.css('position', 'absolute');
            tbl.addClass("pdate-picker-hidden");
            var id = this.id();
            $("#" + this.txtboxId).click(function () {
                $("#" + id).removeClass("pdate-picker-hidden");
            });
        }
        if (this.selected !== null) {
            $("#" + this.txtboxId).val(this.syear + "/" + this.smonth + "/" + this.sday);
        }
        else{
            $("#" + this.txtboxId).val('');
        }
    };
    this.createMTd = function (day) {
        td = $("<td>" + pDatepicker.num2fa(day) + "</td>");
        td.addClass('month-day');
        var configs = $.extend(true, {}, this.configs);
        configs.selected = this.cyear + '/' + this.cmonth + '/' + day;
        var txtboxId = this.txtboxId;
        if (!this.readonly) {
            td.click(function () {
                pDatepicker(txtboxId, configs);
            }
            );
        }
        return td;
    };
    this.xTd = function (td) {
        span = $("<span>&times;</span>");
        span.addClass('clean');
        var configs = $.extend(true, {}, this.configs);
        configs.selected = false;
        var txtboxId = this.txtboxId;
        span.click(function () {
            pDatepicker(txtboxId, configs);
        });
        td.append(span);
    };
    this.nmTd = function (td) {
        span = $("<span>&#8594;</span>");
        span.addClass('nm-month');
        month = (this.cmonth + 1) % 12;
        year = this.cyear;
        if (month === 0) {
            month = 12;
        }
        if (month === 1) {
            year = year + 1;
        }
        var configs = $.extend(true, {}, this.configs);
        configs.cyear = year;
        configs.cmonth = month;
        var txtboxId = this.txtboxId;
        span.click(function () {
            pDatepicker(txtboxId, configs);
        });
        td.append(span);
    };
    this.bmTd = function (td) {
        span = $("<span>&#8592;</span>");
        span.addClass('bm-month');
        month = (this.cmonth - 1) % 12;
        year = this.cyear;
        if (month === 0) {
            month = 12;
            year = year - 1;
        }
        var configs = $.extend(true, {}, this.configs);
        configs.cyear = year;
        configs.cmonth = month;
        var txtboxId = this.txtboxId;
        span.click(function () {
            pDatepicker(txtboxId, configs);
        });
        td.append(span);
    };
    this.hTd = function (tr) {
        td = $("<td></td>");
        td.addClass('hidden-day');
        tr.append(td);
    };
    this.sTd = function (tr, day) {
        td = this.createMTd(day);
        td.addClass('selected-day-' + parseInt((this.cmonth - 1) / 3));
        tr.append(td);
    };
    this.tTd = function (tr, day) {
        td = this.createMTd(day);
        td.addClass('today-' + parseInt((this.cmonth - 1) / 3));
        tr.append(td);
    };
    this.mTd = function (tr, day) {
        td = this.createMTd(day);
        tr.append(td);
    };
    this.nTd = function (tr, n) {
        td = $("<td></td>");
        td.addClass('day-name-' + parseInt((this.cmonth - 1) / 3));
        td.html(['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'][n]);
        tr.append(td);
    };
    this.lmTd = function (tr) {
        td = $("<td>" + pDatepicker.monthName(i) + "</td>");
        td.addClass('monthes hidden-monthes monthes-' + (parseInt((this.cmonth - 1) / 3)));
        td.attr('colspan', 2);
        month = i % 12;
        year = this.cyear;
        if (month === 0) {
            month = 12;
        }
        var configs = $.extend(true, {}, this.configs);
        configs.cyear = year;
        configs.cmonth = month;
        var txtboxId = this.txtboxId;
        td.click(function () {
            pDatepicker(txtboxId, configs);
        });
        tr.append(td);
    };
    this.lmTr = function (tbl) {
        for (i = 1; i <= 12; i++) {
            if (i % 3 === 1) {
                tr = $("<tr></tr>");
            }
            this.lmTd(tr);
            if (i % 3 === 0) {
                tbl.append(tr);
            }
        }
    };
    this.ymTd = function (tr) {
        td = $("<td></td>");
        td.attr('colspan', 7);
        td.addClass('cym');
        mspan = $("<span>" + pDatepicker.monthName(this.cmonth) + "</span>");
        var id = this.id();
        mspan.click(function () {
            $("#" + id + " .monthes").toggleClass("hidden-monthes");
        });
        yinput = $("<input>");
        yinput.attr('type', 'text');
        yinput.val(pDatepicker.num2fa(this.cyear));
        var configs = $.extend(true, {}, this.configs);
        configs.cmonth = this.cmonth;
        var txtboxId = this.txtboxId;
        yinput.on('keypress', function (e) {
            if (window.event)
                k = window.event.keyCode;
            else if (e)
                k = e.which;
            char = String.fromCharCode(k);
            if (k === 0 || k === 8 || (k === 13 && $(this).val() === '')) {
                return true;
            }
            if (k === 13) {
                configs.cyear = $(this).val();
                pDatepicker(txtboxId, configs);
            }
            else if (("0123456789۰۱۲۳۴۵۶۷۸۹").indexOf(char) > -1) {
                char = pDatepicker.num2fa(char);
                $(this).val($(this).val() + char);
            }
            return false;
        });
        yinput.on('focusout', function () {
            configs.cyear = $(this).val();
            pDatepicker(txtboxId, configs);
        });
        ybtn = $('<button>&#10004;</button>');
        ybtn.click(function () {
            configs.cyear = $('.cym input').val();
            pDatepicker(txtboxId, configs);
        });
        yinput.on('focus', function () {
            $(this).parent().children('button').addClass('ybtn');

        });
        yinput.on('mouseenter', function () {
            $(this).parent().children('button').addClass('ybtn');

        });
        yinput.on('focusout', function () {
            $(this).parent().children('button').removeClass('ybtn');

        });
        yinput.on('mouseleave', function () {
            if (!$(this).is(':focus')) {
                $(this).parent().children('button').removeClass('ybtn');
            }

        });
        this.xTd(td);
        this.nmTd(td);
        td.append(mspan);
        td.append(ybtn);
        td.append(yinput);
        this.bmTd(td);
        tr.append(td);
    };
    this.show = function () {
        this.picker().removeClass("pdate-picker-hidden");
    };
    this.hide = function () {
        this.picker().addClass("pdate-picker-hidden");
    };
    this.toggle = function () {
        this.picker().toggleClass("pdate-picker-hidden");
    };
    this.init(txtboxId, configs);
    this.draw();
    return this;
}
;