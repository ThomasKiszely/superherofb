const songs = [
    { ZZTop: 'Just got paid' },
    { ZZTop: 'Jesus just left Chicago' },
    { ZZTop: 'La Grange' },
    { ZZTop: 'Mexican Blackbird' },
    { ZZTop: 'Cheap Sunglasses' },
    { ZZTop: 'Double Back' },
    { ZZTop: 'Brown Sugar' },
    { ZZTop: 'Tush' },
    { ZZTop: 'Sleeping Bag' },
    { ZZTop: 'Pincushion' },
]

function generateSong() {
    const song = songs[Math.floor(Math.random() * songs.length)];
    return song;
}

module.exports = generateSong;