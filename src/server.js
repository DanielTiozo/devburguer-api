import app from './app';

const port = process.env.PORT || 3001;

app.listen(port, '0.0.0.0');

// app.listen(3001, () => console.log('server is runing in 3001 port'));
