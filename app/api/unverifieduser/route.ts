// Import necessary modules and libraries
import prisma from '../../libs/prismadb';

// Function to delete unverified users
async function deleteUnverifiedUsers() {
  try {
    const now = new Date();

    // Find users whose email has not been verified and the token has expired
    const usersToDelete = await prisma.user.findMany({
      where: {
        emailVerified: false,
        emailTokenExpiry: {
          lt: now, 
        },
      },
    });

    // Delete the found users
    await prisma.user.deleteMany({
      where: {
        id: {
          in: usersToDelete.map((user) => user.id),
        },
      },
    });

    console.log(`Deleted ${usersToDelete.length} unverified users.`);
  } catch (error) {
    console.error('Error deleting unverified users:', error);
  }
}

// Schedule the function to run every hour
setInterval(deleteUnverifiedUsers, 60 * 60 * 1000);

// Run the function immediately on startup
deleteUnverifiedUsers();

// Exporting an empty function to satisfy Next.js API route requirements
export {};
export const fetchCache = 'force-no-store'
