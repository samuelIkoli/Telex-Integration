const http = require('https');

const options = {
	method: 'POST',
	hostname: 'openl-translate.p.rapidapi.com',
	port: null,
	path: '/translate',
	headers: {
		'x-rapidapi-key': 'c33b36b6dcmshf7d36d91be00cf4p19da21jsn4a933d53f38c',
		'x-rapidapi-host': 'openl-translate.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write(JSON.stringify({
  target_lang: 'fr',
  text: 'hello'
}));
req.end();