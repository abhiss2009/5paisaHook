import { createRequire } from 'module'
const require = createRequire(import.meta.url);

const express = require('express')
const http = require('http');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { FivePaisaClient } = require("5paisajs");
import { TOTP } from "totp-generator"

app.use(bodyParser.json());

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
};

const conf = {
  appSource: "7684",
  appName: "5P56685593",
  userId: "YQ6y3WhMykk",
  password: "LUce2JoPriR",
  userKey: "LVZpSiwHCezU4JR6SOmY8sDYDUeiPRQ1",
  encryptionKey: "v3nqheNlBondN8jOBtau2TN2WvGK8VWA"
};
var exchange = "N";
var SymbolData = "";
 var options = {
			//scripCode: "46468",
			scripData : SymbolData,
            exchangeSegment: "D",
            atMarket: true,
            isStopLossOrder: false,
            stopLossPrice: 0,
            isVTD: false,
            isIOCOrder: false,
            isIntraday: false,
            ahPlaced: "N",
            IOCOrder: false,
            price: 0
        };
var client = new FivePaisaClient(conf);

app.get('/login', async (req, res) => {
	var data;
	const { otp, expires } = TOTP.generate("GU3DMOBVGU4TGXZVKBDUWRKZ")
	await client.get_TOTP_Session("56685593", otp, "123456")
	.then(response => {
	  data = "Logged In";
		})
	.catch(err => {
		// Oh no :/
		data = "Error";
	});
	res.send(JSON.stringify(data));
})
	
app.get('/getHoldings', async (req, res) => {
	var response;
	await client.getHoldings()
	.then((holdings) => {
		response = holdings;
	})
	.catch((err) => {
		response = err;
	});
	res.send(JSON.stringify(response));
})

app.get('/getPositions', async (req, res) => {
	var response;
	await client.getPositions()
	.then((positions) => {
		response = positions;
	})
	.catch((err) => {
		response = err;
	});
	res.send(JSON.stringify(response));
})

app.get('/placeOrder', async (req, res) => {
	var response;
	await client.placeOrder("BUY", "1", exchange, options)
	.then((positions) => {
		response = positions;
	})
	.catch((err) => {
		response = err;
	});
	console.log(response)
	res.send(JSON.stringify(response));
})

app.post('/TriggerInstantOrder', async (req, res) => {
	var response;
	var D, lsymbol, ldate, lmonth, lyear, ltype, lstrike, lmodstrike, OrderType;
	console.log(req.body);
	const {name, tradingsymbol, quantity, transactionType } = req.body;
	console.log(tradingsymbol)
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
console.log(SymbolData)
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
console.log(SymbolData)
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
console.log(SymbolData)
} else {
    SymbolData = "NULL";
    console.log(SymbolData)
}
	if (transactionType == "B")
		OrderType = "BUY";
	else
		OrderType = "SELL";
	
	client.placeOrder(OrderType, quantity, exchange, options)
	.then((positions) => {
		response = positions;
	})
	.catch((err) => {
		response = err;
	});
	res.send(JSON.stringify(response));
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
