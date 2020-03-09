import app from './bin/www/index.mjs';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`);
});
