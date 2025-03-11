// API endpoints
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper function for API calls with better error handling
async function apiRequest(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });

    console.log(`Response status: ${response.status}`);

    // For network errors or CORS issues
    if (!response.ok) {
      // Try to parse the error if possible
      try {
        const errorResponse = await response.json();
        console.log("Error response:", errorResponse);
        
        // Handle different error response formats
        if (errorResponse.message) {
          // Direct message in response
          throw new Error(errorResponse.message);
        } else if (errorResponse.error && errorResponse.error.message) {
          // Message nested in error object
          throw new Error(errorResponse.error.message);
        } else if (errorResponse.success === false && errorResponse.message) {
          // Success:false format with message
          throw new Error(errorResponse.message);
        } else {
          // Fallback to status text
          throw new Error(`API error: ${response.statusText} (${response.status})`);
        }
      } catch (parseError) {
        // If parsing fails, throw the response status
        console.error("Error parsing error response:", parseError);
        throw new Error(
          `API error: ${response.statusText} (${response.status})`
        );
      }
    }

    // Parse the successful response
    try {
      const data = await response.json();
      return data;
    } catch (parseError) {
      console.error("Error parsing response JSON:", parseError);
      throw new Error("Invalid response format from server");
    }
  } catch (error) {
    console.error(`API request failed:`, error);
    throw error;
  }
}

export interface Option {
  _id: string;
  text: string;
  votes?: number;
}

export interface Poll {
  pollId: string;
  title: string;
  options: Option[];
  expiresAt: string;
  hideResults: boolean;
  isPrivate: boolean;
  reactions?: {
    trending: number;
    likes: number;
  };
}

export interface PollCreationData {
  title: string;
  options: string[];
  expiresIn: "1hour" | "12hours" | "24hours";
  hideResults: boolean;
  isPrivate: boolean;
}

export interface VoteData {
  optionId: string;
}

export interface ReactionData {
  reactionType: "trending" | "like";
}

// Create a new poll
export async function createPoll(pollData: PollCreationData): Promise<Poll> {
  try {
    console.log("Creating poll with data:", pollData);
    const result = await apiRequest(`${API_URL}/polls`, {
      method: "POST",
      body: JSON.stringify(pollData),
    });

    console.log("Poll created successfully:", result);
    return result.data;
  } catch (error) {
    console.error("Error creating poll:", error);
    throw error;
  }
}

// Get poll by ID
export async function getPoll(pollId: string): Promise<Poll> {
  try {
    const result = await apiRequest(`${API_URL}/polls/${pollId}`);
    return result.data;
  } catch (error) {
    console.error("Error fetching poll:", error);
    throw error;
  }
}

// Vote on a poll
export async function voteOnPoll(
  pollId: string,
  voteData: VoteData
): Promise<Poll> {
  try {
    const result = await apiRequest(`${API_URL}/polls/${pollId}/vote`, {
      method: "POST",
      body: JSON.stringify(voteData),
    });
    return result.data;
  } catch (error) {
    console.error("Error voting on poll:", error);
    throw error;
  }
}

// Add a reaction to a poll
export async function addReaction(
  pollId: string,
  reactionData: ReactionData
): Promise<{ pollId: string; reactions: { trending: number; likes: number } }> {
  try {
    const result = await apiRequest(`${API_URL}/polls/${pollId}/reaction`, {
      method: "POST",
      body: JSON.stringify(reactionData),
    });
    return result.data;
  } catch (error) {
    console.error("Error adding reaction:", error);
    throw error;
  }
}

// Get poll results (even if hideResults is true)
export async function getPollResults(pollId: string): Promise<Poll> {
  try {
    const result = await apiRequest(`${API_URL}/polls/${pollId}/results`);
    return result.data;
  } catch (error) {
    console.error("Error fetching poll results:", error);
    throw error;
  }
}
