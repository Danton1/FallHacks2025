const videos = [
    'https://www.youtube.com/embed/videoseries?si=ViNJDFLlNkdTYsiW&amp;list=PLxA687tYuMWj3yZZN7Yez6hKSL68XXYzB', // Random Pop Music
    'https://www.youtube.com/embed/videoseries?si=Oy0LxZCwhdOFE6VR&amp;list=PLkN0t-LiNuD5l4GkPRWc1vvhQA1CCq3Un', // Asian Style HipHop Instrumentals
    'https://www.youtube.com/embed/videoseries?si=sDnrOwbbzE1TrLRQ&amp;list=PLB6RNeZfcleoOe6yK7p-hoZ01HqHk50QL', // latin fiesta mix
    'https://www.youtube.com/embed/videoseries?si=oJSRWgEa3r_r8R56&amp;list=PLeYVXrtOtoSxpULutbhJXmxLZ3ssvspeO', // italian dinner jazz
    'https://www.youtube.com/embed/videoseries?si=-iH4M8wo8abcr0-W&amp;list=PL2h4Lx8Uls3NW5onRwzEZfpk2_azWWevO', // rock dinner playlist
    'https://www.youtube.com/embed/videoseries?si=kNtJ-hgMMz4ZJvDR&amp;list=PLfsLaIQ3I5yeFb0rDeBrv1hsZ4v9zIkTt', // rainy day jazz
    'https://www.youtube.com/embed/videoseries?si=12_rxCwi_Jumu-kH&amp;list=PLzKILxYC79RDspOFfHUselpBLOVEOJO_T', // bollywood chill
    'https://www.youtube.com/embed/videoseries?si=V6im6U9eZmzkCfk2&amp;list=PLKXPEt10UAjGnUVNeujkcu8vnA4y7i4bU', // traditional chinese music playlist
]

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function generatePlaylistUrl() {
    return videos[getRandomInt(0, videos.length)]
}