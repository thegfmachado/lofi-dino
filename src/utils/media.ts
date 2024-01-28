function extractVideoID(url: string): string | null {
  const regExp =
    /(?:\?v=|\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=|\/watch\?feature=player_embed&v=|\/videos\/|embed\/|watch\?v=|v=|\/embed\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regExp);

  return (match && match[1]) || null;
}

export { extractVideoID };
