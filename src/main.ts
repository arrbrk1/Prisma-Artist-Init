import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const newArtist = await prisma.artist.create({
    data: {
      name: "The Beatles",
      email: "user@test2.com",
      songs: {
        create: {
          title: "Hey Jude",
          content: '"Hey Jude, don\'t make it bad"',
          released: true,
        },
      },
    },
  });
  console.log(`Created new artist: ${newArtist.name} (ID: ${newArtist.id})`);
  const allArtists = await prisma.artist.findMany({
    include: { songs: true },
  });

  console.log("All artists: ");
  console.dir(allArtists, { depth: null });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
