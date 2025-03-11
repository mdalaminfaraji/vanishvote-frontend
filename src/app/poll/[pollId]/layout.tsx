import { Metadata } from "next";
import { getPoll } from "@/lib/api";

// This is a server component that can handle metadata
export async function generateMetadata({
  params,
}: {
  params: { pollId: string };
}): Promise<Metadata> {
  // Need to await params before accessing properties
  const resolvedParams = await params;
  const pollId = resolvedParams.pollId;
  
  // Try to fetch the poll data
  try {
    const pollData = await getPoll(pollId);

    // Check if poll has expired
    const hasExpired = new Date(pollData.expiresAt) < new Date();
    const expiryStatus = hasExpired ? "already expired" : "expires soon";

    return {
      title: `${pollData.title} | VanishVote Poll`,
      description: `Vote on this poll: "${pollData.title}". This poll ${expiryStatus}!`,
      openGraph: {
        title: `${pollData.title} | VanishVote Poll`,
        description: `Vote on this poll before it expires!`,
        type: "website",
        siteName: "VanishVote - Anonymous Polls",
      },
    };
  } catch {
    // Fallback metadata if poll can't be fetched
    return {
      title: "VanishVote Poll",
      description: "Vote on this anonymous poll before it expires!",
    };
  }
}

export default function PollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
