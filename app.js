//import { createRequire } from 'module'
//const require = createRequire(import.meta.url);

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { FivePaisaClient } from '5paisajs';
import { TOTP } from "totp-generator"

import GetTradingSymbol from '../5paisa/tool/tool.js';

const app = express();
const port = 5999;

var SymbolData = "";

app.use(bodyParser.json());

const conf = {
  appSource: "7684",
  appName: "5P56685593",
  userId: "YQ6y3WhMykk",
  password: "LUce2JoPriR",
  userKey: "LVZpSiwHCezU4JR6SOmY8sDYDUeiPRQ1",
  encryptionKey: "v3nqheNlBondN8jOBtau2TN2WvGK8VWA"
};
var exchange = "N";

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
	var OrderType;
	console.log(req.body);
	const {name, tradingsymbol, quantity, transactionType } = req.body;
	SymbolData = GetTradingSymbol(tradingsymbol);
	console.log(SymbolData);
	if (transactionType == "B")
		OrderType = "BUY";
	else
		OrderType = "SELL";
	if (0) {
	client.placeOrder(OrderType, quantity, exchange, options)
	.then((positions) => {
		response = positions;
	})
	.catch((err) => {
		response = err;
	});
	}
	res.send(JSON.stringify(response));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
