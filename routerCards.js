

app.get('/', (req, res) => {
  Card
    .find()
    .exec()
    .then(cards => {
      res.status(200).json(cards);
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

app.post('/', (req, res) => {
	console.log(req);
	console.log(res);
	const requiredFields = ['question', 'answer', 'reference'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
    }
  }
	Card
    .create({
      question: req.body.question,
      answer: req.body.answer,
      reference: req.body.reference})
    .then(
      card => res.status(201).json(card))    
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

app.delete('/:id', (req, res) => {
  Card
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(card => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//End