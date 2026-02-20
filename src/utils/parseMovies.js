const fs = require('fs');
const { Movie, Actor } = require('../models');

module.exports = async (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');

  const blocks = content
    .trim()
    .split(/\n\s*\n+/)
    .filter((block) => block.trim().length > 0);

  const created = [];

  for (let i = 0; i < blocks.length; i++) {
    try {
      const block = blocks[i].trim();
      const lines = block
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length < 4) {
        console.warn(`Block ${i + 1}: Skipped (only ${lines.length} lines)`);
        continue;
      }

      const title = lines[0].replace('Title:', '').trim();
      const releaseYear = parseInt(lines[1].replace('Release Year:', ''));
      const format = lines[2].replace('Format:', '').trim();
      const actorsString = lines[3].replace('actors:', '').trim();

      if (!title || !releaseYear || !format) {
        console.warn(`Block ${i + 1}: Missing required fields`);
        continue;
      }

      const movie = await Movie.create({
        title,
        releaseYear,
        format,
      });

      if (actorsString) {
        const actorNames = actorsString
          .split(',')
          .map((name) => name.trim())
          .filter((name) => name.length > 0);

        const actors = [];

        for (const name of actorNames) {
          const [actor] = await Actor.findOrCreate({
            where: { name },
          });

          actors.push(actor);
        }

        await movie.setActors(actors);
      }

      created.push(movie);
    } catch (error) {
      console.error(`Block ${i + 1} error:`, error.message);
    }
  }

  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error('Failed to delete temp file:', err.message);
  }

  return created;
};
