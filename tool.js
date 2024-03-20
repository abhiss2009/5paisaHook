var SymbolData = "";
const getMonth = function (mnth) {
    if (mnth == "Jan")
        return "01";
    if (mnth == "Feb")
        return "02";
    if (mnth == "Mar")
        return "03";
    if (mnth == "Apr")
        return "04";
    if (mnth == "May")
        return "05";
    if (mnth == "Jun")
        return "06";
    if (mnth == "Jul")
        return "07";
    if (mnth == "Aug")
        return "08";
    if (mnth == "Sep")
        return "09";
    if (mnth == "Oct")
        return "10";
    if (mnth == "Nov")
        return "11";
    if (mnth == "DEC")
        return "12";
	else
		return "00";
};

export default function GetTradingSymbol(tradingsymbol) {
	var D = 0;
	var lsymbol, ldate, lmonth, lyear, ltype, lstrike, lmodstrike;
	D = tradingsymbol;
	if (D.length == 18){
		lsymbol = "NIFTY ";
		ldate = D.substr(5,2);
		lmonth = D.substr(7,1) + D.substr(8,2).toLowerCase();
		lyear = "20" + D.substr(10,2);
		ltype = D.at(12);
    if (ltype == "P") {
        ltype = "PE";
    } else {
        ltype = "CE";
    }
    lstrike = D.substr(13, 5) + ".00";
    lmodstrike = '_' + lyear + getMonth(lmonth) + ldate + '_' + ltype + '_' + D.substr(13, 5);
	SymbolData = lsymbol + ldate + ' ' + lmonth + ' ' + lyear  + ' ' + ltype + ' ' + lstrike + lmodstrike;
	} else if (D.length == 21) {
		lsymbol = "FINNIFTY ";
		ldate = D.substr(8,2);
		lmonth = D.substr(10,1) + D.substr(11,2).toLowerCase();
		lyear = "20" + D.substr(13,2);
		ltype = D.at(15);
		if (ltype == "P") {
			ltype = "PE";
		} else {
			ltype = "CE";
		}
		lstrike = D.substr(16, 5) + ".00";
		lmodstrike = '_' + lyear + getMonth(lmonth) + ldate + '_' + ltype + '_' + D.substr(16, 5);
		SymbolData = lsymbol + ldate + ' ' + lmonth + ' ' + lyear  + ' ' + ltype + ' ' + lstrike + lmodstrike;
	} else if (D.length ==22){
        lsymbol = "BANKNIFTY ";
		ldate = D.substr(9,2);
		lmonth = D.substr(11,1) + D.substr(12,2).toLowerCase();
		lyear = "20" + D.substr(14,2);
		ltype = D.at(16);
		if (ltype == "P") {
			ltype = "PE";
		} else {
			ltype = "CE";
		}
		lstrike = D.substr(17, 5) + ".00";
		lmodstrike = '_' + lyear + getMonth(lmonth) + ldate + '_' + ltype + '_' + D.substr(17, 5);
		SymbolData = lsymbol + ldate + ' ' + lmonth + ' ' + lyear  + ' ' + ltype + ' ' + lstrike + lmodstrike;
	} else {
		SymbolData = "NULL";
	}
	return SymbolData;
};
